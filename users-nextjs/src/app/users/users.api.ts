

import axios from 'axios';
import { User, UserLogin } from '../interface';
import Swal from 'sweetalert2';

export const fetchUsers = async (search: string = ""): Promise<User[]> => {
    try {
        const response = await axios.get('http://localhost:8000/api/users', {
            params: {
                search
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const loginAdmin = async (userLogin: UserLogin) => {
    try {
        const response = await axios.post('http://localhost:8000/api/users/login/', userLogin);

        if (response.status === 200 || response.status === 201) {
            // Assuming the response contains user data
            const accessToken = response.data.access_token;

            // Guardar en localStorage
            localStorage.setItem('access_token', accessToken);
            
            // También guardar en cookies para el middleware
            document.cookie = `access_token=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 días
            
            console.log('Login successful, access token stored:', accessToken);

            const { user } = response.data; // Destructure to avoid unused variable warning

            localStorage.setItem('user', JSON.stringify(user));
            document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 días
        }

        return response.data;

    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const handleDelete = async (id: number) => {
    const token = localStorage.getItem('access_token'); // Cambiado de 'token' a 'access_token'
    
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
            await axios.delete(`http://localhost:8000/api/users/${id}/`, config);
        }
    } catch (error) {
        console.log(`Error deleting user with id ${id}:`, error);
    }
}

export const handleEdit = async (id: number, values: Omit<User, 'id'>) => {
    const token = localStorage.getItem('access_token'); // Cambiado de 'token' a 'access_token'
    
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    console.log("Form submitted", values);
    
    try {
        const response = await axios.put(`http://localhost:8000/api/users/${id}/`, values, config);
        console.log('User updated successfully', response.data);
        return response.data;
    } catch (error) {
        console.log('error mandando los datos', error);
        throw error;
    }
};

export const handleSubmit = async (values: Omit<User, 'id'>) => {
    const token = localStorage.getItem('access_token'); // Cambiado de 'token' a 'access_token'
    
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.post('http://localhost:8000/api/users/', values, config);
        console.log('User created successfully', response.data);
        return response.data;
    } catch (error) {
        console.log('Error creating user:', error);
        throw error;
    }
}
