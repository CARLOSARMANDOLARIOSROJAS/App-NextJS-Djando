
import { User } from '@/app/interface';
import Link from 'next/link';
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { Button } from './Button';
import { adminActions } from '@/helpers/texts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
    user: User;
    handleDelete: (id: number) => void;
}

export const UserCard = ( props : Props) => {

    const { user, handleDelete } = props;
    
    const idUser = useSelector((state: RootState) => state.auth.user?.id);

    console.log(idUser)

  return (
    <div className="flex justify-center items-center">
            <div className="w-90 lg:w-100 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <FaUser className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3 m-auto" />

                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {user.username}
                </h5>

                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{user.email}</p>
                <div className="flex justify-between">
                    <p className="text-white">
                        <span className="font-semibold text-white">Age:</span> {user.age}
                    </p>
                    <div className="flex gap-2">
                        {idUser && (
                            <Link href={`users/edit/${user.id}`} className="bg-blue-500 border-radius cursor-pointer rounded px-2 py-1 text-white
                     hover:bg-blue-600 transition-colors">
                                {adminActions.editUser}
                            </Link >
                        )}
                        {idUser && (
                            <Button
                                label={adminActions.deleteUser}
                                onClick={() => handleDelete?.(user.id)}
                                class="bg-red-500 border-radius cursor-pointer rounded px-2 py-1 text-white
                                            hover:bg-red-700 transition-colors"
                            >
                            </Button>
                        )}
                    </div>
                </div>

            </div>
        </div>
  )
}
