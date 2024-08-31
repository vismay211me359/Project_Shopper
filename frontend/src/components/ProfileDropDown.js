import React, { useState } from "react";
import { FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"
import {useLogoutMutation} from "../slices/usersApiSlice.js";
import {logout} from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {userInfo}=useSelector((state)=>state.auth);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [logoutApiCall]=useLogoutMutation();


    const logoutHandler = async() => {
        closeDropdown();
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center text-custom-gold focus:outline-none"
            >
                <FiUser size={24} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={closeDropdown}
                ></div>
            )}

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-custom-gold rounded-lg z-20">
                    <div className="flex justify-between items-center p-4 border-b border-custom-gold">
                        <span className="text-custom-gold">Menu</span>
                        <button onClick={closeDropdown} className="text-white focus:outline-none">
                            <FiX size={20} />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col space-y-2">
                        <Link
                            to="/profile"
                            className="text-white hover:text-custom-gold"
                            onClick={closeDropdown}
                        >
                            Profile
                        </Link>
                        {(userInfo && userInfo.isAdmin) && <Link
                            to="/admin/orderlist"
                            className="text-white hover:text-custom-gold"
                            onClick={closeDropdown}
                        >
                            Orders
                        </Link>}
                        {(userInfo && userInfo.isAdmin) && <Link
                            to="/admin/productlist"
                            className="text-white hover:text-custom-gold"
                            onClick={closeDropdown}
                        >
                            Products
                        </Link>}
                        {(userInfo && userInfo.isAdmin) && <Link
                            to="/admin/userlist"
                            className="text-white hover:text-custom-gold"
                            onClick={closeDropdown}
                        >
                            Users
                        </Link>}
                        <button
                            onClick={logoutHandler}
                            className="text-white hover:text-custom-gold focus:outline-none self-start"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
