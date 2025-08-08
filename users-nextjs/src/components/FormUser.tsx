'use client';

import { User } from "@/app/interface";
import { handleSubmit } from "@/app/users/users.api";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

export const FormUser = () => {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    const initialValues: Omit<User, 'id'> = {
        username: '',
        email: '',
        age: 0
    }

    const handleFormSubmit = async (values: Omit<User, 'id'>) => {
        try {
            const response = await handleSubmit(values);
            setSuccess('User created successfully!');

            setTimeout(() => {
                setSuccess(null);
                window.location.href = '/users'; // Redirect to users page after success
            }, 2000); // Reset success message after 2 seconds

            setError(null);
            console.log('Response:', response);
        } catch (err) {
            setError('Failed to create user');
            setSuccess(null);
            console.error('Error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center h-160 bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Create a New User!</h2>
                <Formik initialValues={initialValues}
                    onSubmit={handleFormSubmit}
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
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create User</button>

                    </Form>
                </Formik>
                {success && <p className="text-green-500 mt-4">{success}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};
