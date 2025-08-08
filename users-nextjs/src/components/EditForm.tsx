'use client';
import { handleEdit } from '@/app/users/users.api';
import { User } from '@/app/interface';
import { Field, Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export const EditForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams()


    const userId = searchParams.get('id') || params.id;

    console.log('userId:', userId);

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [userData, setUserData] = useState<Omit<User, 'id'>>({
        username: '',
        email: '',
        age: 0
    });

    // Cargar datos del usuario cuando se monta el componente
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setError('No user ID provided');
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('access_token');
                console.log('Token for fetching user:', !!token);
                
                const config = token ? {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                } : {};
                
                const response = await axios.get(`http://localhost:8000/api/users/${userId}/`, config);
                const user = response.data;
                setUserData({
                    username: user.username,
                    email: user.email,
                    age: user.age
                });
                setLoading(false);
            } catch (error) {
                console.error('Error loading user:', error);
                setError('Failed to load user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSubmit = async (values: Omit<User, 'id'>) => {
        if (!userId) {
            setError('No user ID provided');
            return;
        }

        try {
            setError(null);
            setSuccess(null);
            
            // Debug: verificar el token
            const token = localStorage.getItem('access_token');
            console.log('Token available:', !!token);
            console.log('Token value:', token);
            
            await handleEdit(parseInt(userId.toString()), values);
            setSuccess('User updated successfully!');
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = '/users';
            }, 2000);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user');
        }
    };

    

    return (
        <div className="flex items-center justify-center h-150 bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Edit User</h2>
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <Formik
                        initialValues={userData}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            {/* Form fields go here */}
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="username">Username</label>
                                <Field
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    type="text"
                                    name="username"
                                    id="username"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="email">Email</label>
                                <Field
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="age">Age</label>
                                <Field
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    type="number"
                                    name="age"
                                    id="age"
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update User</button>
                        </Form>
                    </Formik>
                )}
                {success && <p className="text-green-500 mt-4">{success}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    )
}
