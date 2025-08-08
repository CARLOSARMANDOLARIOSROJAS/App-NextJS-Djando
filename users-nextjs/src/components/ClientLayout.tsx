'use client';

import { AuthInitializer } from '@/components/AuthInitializer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  );
};