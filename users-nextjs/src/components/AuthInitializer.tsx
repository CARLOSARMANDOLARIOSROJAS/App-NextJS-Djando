'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserName } from '@/actions/loginActions';

export const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage al cargar la app
    const savedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');

    if (savedUser && accessToken) {
      try {
        const user = JSON.parse(savedUser);
        // Dispatch del usuario al estado de Redux
        dispatch(setUserName(user));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        // Limpiar localStorage si hay error
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    }
  }, [dispatch]);

  return null; // Este componente no renderiza nada
};
