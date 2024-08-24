import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex relative justify-center bg-black px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg absolute top-[40%] transform -translate-y-1/2">
                <h2 className="text-3xl font-bold text-custom-gold text-center">
                    Login
                </h2>
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="text-white text-sm font-medium mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-black rounded-t-md focus:outline-none focus:ring-custom-gold focus:border-custom-gold focus:z-10 sm:text-sm"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <label
                            htmlFor="password"
                            className="text-white text-sm font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-black rounded-b-md focus:outline-none focus:ring-custom-gold focus:border-custom-gold focus:z-10 sm:text-sm"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 text-white"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-custom-gold hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500  disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={isLoading}
                        >
                            Sign In
                        </button>
                        {isLoading && (
                            <span className="loader ml-2 border-2 border-t-2 border-t-white rounded-full w-4 h-4 animate-spin"></span>
                        )}
                    </div>
                </form>
                <div className="text-center text-sm text-gray-400 pb-2">
                    <p>
                        New user?{' '}
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : "/register"}
                            className="text-custom-gold hover:text-white font-medium"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
