'use client';
import { AuthProvider, Refine } from '@refinedev/core';
import dataProvider from '@refinedev/simple-rest';
import routerProvider from '@refinedev/nextjs-router';
import {
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
} from '@refinedev/antd';

import { App as AntdApp, ConfigProvider } from 'antd';

import '@refinedev/antd/dist/reset.css';
import { Suspense } from 'react';

const authProvider: AuthProvider = {
  check: async () => {
    return { authenticated: true };
    // let isAuthenticated: boolean;
    // const session = await auth();

    // if (!session || !session?.user || !session.user?.id) {
    //   isAuthenticated = false;
    // } else {
    //   isAuthenticated = true;
    // }

    // if (isAuthenticated) {
    //   return { authenticated: true };
    // }

    // return {
    //   authenticated: false,
    //   redirectTo: '/',
    //   error: {
    //     name: 'Authentication Failed.',
    //     message: 'User not found.',
    //   },
    // };
  },
  login: async () => {
    throw new Error('Method not implemented.');
  },
  logout: async () => {
    throw new Error('Method not implemented.');
  },
  onError: async () => {
    throw new Error('Method not implemented.');
  },
};

export default function RefineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-3 pt-28 lg:pt-32 2xl:mx-auto 2xl:max-w-screen-2xl">
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Suspense fallback={<div>Loading...</div>}>
            <Refine
              dataProvider={dataProvider('/api/admin')}
              routerProvider={routerProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: 'users',
                  list: '/admin/users',
                  show: '/admin/users/:id',
                  edit: '/admin/users/:id/edit',
                  create: '/admin/users/create',
                },
                {
                  name: 'platformUpdates',
                  list: '/admin/platformUpdates',
                  show: '/admin/platformUpdates/:id',
                  edit: '/admin/platformUpdates/:id/edit',
                  create: '/admin/platformUpdates/create',
                },
                {
                  name: 'landAssessments',
                  list: '/admin/landAssessments',
                  show: '/admin/landAssessments/:id',
                },
                {
                  name: 'projectManagements',
                  list: '/admin/projectManagements',
                  show: '/admin/projectManagements/:id',
                },
              ]}
              options={{ syncWithLocation: true }}
            >
              <ThemedLayoutV2
                Sider={() => (
                  <ThemedSiderV2
                    //   Title={({ collapsed }) => (
                    //     <ThemedTitleV2
                    //       // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                    //       collapsed={collapsed}
                    //       //   icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
                    //       text="Natur Admin"
                    //     />
                    //   )}
                    Title={({ collapsed }) => <></>}
                    render={({ items, logout, collapsed }) => {
                      return <>{items}</>;
                    }}
                  />
                )}
              >
                {children}
              </ThemedLayoutV2>
            </Refine>
          </Suspense>
        </AntdApp>
      </ConfigProvider>
    </div>
  );
}
