
'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { User } from '@/components/User';
import { fetchUsers, handleDelete } from './users.api';
import { User as UserType } from '../interface';
import { Nav } from '@/components/Nav';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const UsersPage = () => {

    const [users, setUsers] = useState<UserType[]>([]);
    const [search, setSearch] = useState('');
    const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);


    useEffect(() => {
        const getAlllUsers = async () => {
            const response = await axios.get('http://localhost:8000/api/users/');
            setUsers(response.data);
        }
        getAlllUsers();
    }, []);

    const handleSearch = async () => {
        const filtrados = await fetchUsers(search);
        setUsers(filtrados);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    }

    useEffect(() => {
        if (search.trim() === '') {
            const getAllUsers = async () => {
                const response = await axios.get('http://localhost:8000/api/users/');
                setUsers(response.data);
            }
            getAllUsers();
        }
    }, [search])


    return (
        <ProtectedRoute>
            <div className="">
                {isAuthenticated && (
                    <Nav
                        search={search}
                        setSearch={setSearch}
                        handleKeyDown={handleKeyDown}
                    />
                )}
                <User users={users} handleDelete={handleDelete} />
            </div>
        </ProtectedRoute>
    )
}

export default UsersPage; 
