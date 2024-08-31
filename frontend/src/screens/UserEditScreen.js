import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import { useGetUserDetailsQuery, useUpdateUserMutation } from '../slices/usersApiSlice';

import ErrorPage from '../components/ErrorPage';
import Loader from '../components/Loader';
import { toast } from "react-toastify";

const UserEditScreen = () => {

    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('user updated successfully');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <button
                    onClick={() => navigate("/admin/userlist")}
                    className="text-white bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded mb-4 transition-all duration-300"
                >
                    Go Back
                </button>
                {isLoading ? (<Loader />) : error ? (<ErrorPage />) : (<form onSubmit={submitHandler} className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-custom-gold text-2xl font-semibold mb-4">Edit User</h2>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter User name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter email"
                        />
                    </div>


                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-custom-gold bg-gray-700 border-gray-600 rounded focus:ring-custom-gold"
                        />
                        <label
                            htmlFor="isAdmin"
                            className="ml-3 text-white text-sm"
                        >
                            Is Admin
                        </label>
                    </div>

                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-custom-gold hover:bg-custom-goldhover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500  disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed transition-all duration-300" disabled={loadingUpdate}
                        >
                            <strong>Update</strong>
                        </button>
                        {loadingUpdate && (
                            <span className="loader ml-2 border-2 border-t-2 border-t-white rounded-full w-4 h-4 animate-spin"></span>
                        )}
                    </div>
                </form>)}
            </div>
        </div>
    )
}

export default UserEditScreen;
