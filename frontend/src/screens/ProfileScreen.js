import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice.js';
import { Link,useNavigate } from "react-router-dom";
import CustomError from '../components/ProfileError.js';
import CustomLoader from '../components/Profile_loader.js';


const ProfileScreen = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('password did not match');
        }
        else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully...');
            } catch (err) {
                toast.error(err?.data?.message || err?.error);
            }
        }
    }

    return (
        <div className="bg-black text-white min-h-screen p-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">

                    {/* Left Part - User Info */}
                    <div className="md:w-1/3 bg-gray-800 p-4 rounded-lg mb-6 md:mb-0">
                        {loadingUpdateProfile ? (<CustomLoader />) : (<div>
                            <h2 className="text-custom-gold text-xl font-bold mb-4">User Information</h2>
                            <form className="space-y-4" onSubmit={submitHandler}>
                                <div>
                                    <label className="block text-custom-gold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        className="w-full p-2 rounded bg-black text-white border border-custom-gold focus:outline-none"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-custom-gold mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        className="w-full p-2 rounded bg-black text-white border border-custom-gold focus:outline-none"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                                            placeholder="update your password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                                        >
                                            {showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="confirm-password">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={'password'}
                                        id="confirm-password"
                                        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                                        placeholder="Confirm your password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-custom-gold text-black p-2 rounded hover:bg-opacity-90"
                                >
                                    Edit
                                </button>
                            </form>
                        </div>)}
                    </div>

                    {/* Right Part - Order Details */}
                    <div className="md:w-2/3 bg-gray-800 p-4 rounded-lg md:ml-6">
                        {isLoading ? (<CustomLoader />) : error ? (<CustomError />) : (<div>
                            <h2 className="text-custom-gold text-xl font-bold mb-4">Order History</h2>
                            {(orders.length) > 0 ? (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className="p-2 border-b border-custom-gold">Order ID</th>
                                            <th className="p-2 border-b border-custom-gold">Date</th>
                                            <th className="p-2 border-b border-custom-gold">Total</th>
                                            <th className="p-2 border-b border-custom-gold">Paid</th>
                                            <th className="p-2 border-b border-custom-gold">Delivered</th>
                                            <th className="p-2 border-b border-custom-gold"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={index}>
                                                <td className="p-2 border-b border-custom-gold">{order._id}</td>
                                                <td className="p-2 border-b border-custom-gold">{order.createdAt.substring(0, 10)}</td>
                                                <td className="p-2 border-b border-custom-gold">$ {order.totalPrice}</td>
                                                <td className="p-2 border-b border-custom-gold">{order.isPaid ? 'Yes' : 'No'}</td>
                                                <td className="p-2 border-b border-custom-gold">{order.isDelivered ? 'Yes' : 'No'}</td>
                                                <td className="p-2 border-b border-custom-gold">
                                                    <button
                                                        onClick={() =>{navigate(`/order/${order._id}`)}}
                                                        className="ml-4 px-2 py-1 text-white bg-custom-gold rounded hover:bg-opacity-80 transition"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center">
                                    <p>No orders found.</p>
                                    <Link
                                        to="/"
                                        className="inline-block mt-4 bg-custom-gold text-black p-2 rounded hover:bg-opacity-90"
                                    >
                                        Go Shopping
                                    </Link>
                                </div>
                            )}
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
