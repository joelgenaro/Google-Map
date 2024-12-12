import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './database';
import { RetrieveUser } from './database/services';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await RetrieveUser(credentials.email as string);

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          randomKey: 'Hey cool',
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user as { role?: string };
      const isLoggedIn = !!auth?.user;
      const isAdmin = user?.role === 'admin';
      const paths = [
        '/profile',
        '/api/session',
        '/land-assessment',
        '/project-management',
        '/seeds-near-me',
        '/seeds-near-me/create',
        '/seeds-near-me/update',
        '/organization-setting',
        '/setting',
        '/subscription',
        '/upgrade-subscription',
        '/admin'
      ];
      const adminPaths = ['/admin'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      const isAdminPath = adminPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/login', nextUrl.origin);
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      if (isAdminPath && !isAdmin) {
        return Response.redirect(`${nextUrl.origin}/`);
      }

      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          role: u.role,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          role: params.token.role as string,
          id: params.token.id as string,
          randomKey: params.token.randomKey,
        },
      };
    },
  },
});
