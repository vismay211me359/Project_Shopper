import React from 'react'
import ErrorPage from '../components/ErrorPage';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../components/Loader';
import {useDeleteUserMutation,useGetUsersQuery } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success("User deleted..");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <>
            {isLoading ? (<Loader />) : error ? (<ErrorPage />) : (<div className="min-h-screen bg-black text-white p-6">
                <h1 className="text-3xl font-bold text-custom-gold mb-6">Users</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-3 px-5  text-custom-gold text-center">ID</th>
                                <th className="py-3 px-5 text-center text-custom-gold">Name</th>
                                <th className="py-3 px-5 text-center text-custom-gold">Email</th>
                                <th className="py-3 px-5 text-center text-custom-gold">Admin</th>
                                <th className="py-3 px-5 text-center text-custom-gold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-700">
                                    <td className="py-3 px-5 text-center">{user._id}</td>
                                    <td className="py-3 px-5 text-center">{user.name}</td>
                                    <td className="py-3 px-5 text-center">
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td className="py-3 px-5 text-center">{user.isAdmin ? (
                                        <div className='flex justify-center'><FaCheck style={{ color: 'green' }} /></div>
                                    ) : (
                                        <div className='flex justify-center'><FaTimes style={{ color: 'red' }} /></div>
                                    )}</td>
                                    <td className="py-3 px-5 text-center">
                                        {!user.isAdmin && (<Link to={`/admin/user/${user._id}/edit`}>
                                            <button className="text-white hover:text-custom-gold transition-all duration-300">
                                                <FaEdit />
                                            </button>
                                        </Link>)}
                                    </td>
                                    <td className="py-3 px-5 text-center">
                                        {!user.isAdmin && (<button className="text-black hover:text-red-600 transition-all duration-300" onClick={() => deleteHandler(user._id)}>
                                            <FaTrash />
                                        </button>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>)}
        </>
    )
}

export default UserListScreen
