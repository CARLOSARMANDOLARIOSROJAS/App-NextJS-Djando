'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);

  useEffect(() => {
    // Verificar si hay token en localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token && !isAuthenticated) {
      // Si no hay token ni usuario autenticado, redirigir al login
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Si no está autenticado, mostrar loading o nada
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white">Verificando autenticación...</div>
      </div>
    );
  }

  return <>{children}</>;
};
