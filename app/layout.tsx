import { ProfileDialog } from '@/components/custom/profileDialog';
import Header from '@/components/header';
import { Toaster as ShadcnUiToaster } from "@/components/ui/toaster";
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Rubik } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const rubic = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airseed - Hub',
  description: 'Airseed Hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubic.className}>
        <SessionProvider>
          <Header />
          {children}
          <ProfileDialog />
        </SessionProvider>
        <Toaster />
        <ShadcnUiToaster />
      </body>
    </html>
  );
}
