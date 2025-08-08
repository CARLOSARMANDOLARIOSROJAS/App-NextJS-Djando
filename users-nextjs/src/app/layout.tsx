// src/app/layout.tsx o src/app/layout.ts (no .js si usas TS)
import './globals.css';
import type { Metadata } from 'next';
import { ReduxProvider } from '@/redux/Provider';
import { ClientLayout } from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Users Management App',
  description: 'App con Redux',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
