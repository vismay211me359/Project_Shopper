import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice.js";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const RegisterScreen = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register,{isLoading}]=useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        else{
            try{
                const res=await register({email,name,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
            }catch(err){
                toast.error(err?.data?.message || err?.error);
            }
        }
    }


    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg ">
                <h2 className="text-custom-gold text-3xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            placeholder="Enter your full name"
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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
                    <div className="mb-6">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirm-password"
                            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            placeholder="Confirm your password"
                            required
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-custom-gold hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500  disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={isLoading}
                        >
                            Sign Up
                        </button>
                        {isLoading && (
                            <span className="loader ml-2 border-2 border-t-2 border-t-white rounded-full w-4 h-4 animate-spin"></span>
                        )}
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-white">
                            Already have an account?{' '}
                            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-custom-gold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
