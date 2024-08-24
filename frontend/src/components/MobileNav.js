import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
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
                className="text-custom-gold top-4 right-4 z-50"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-40 flex justify-center items-center"
                    onClick={closeDropdown}
                >
                    <div
                        className="bg-black text-white text-center p-6 rounded-lg w-3/4 max-w-sm mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="space-y-4 ">
                            {!userInfo && (<li>
                                <Link
                                    to="/login"
                                    className="text-custom-gold hover:text-white"
                                    onClick={closeDropdown}
                                >
                                    <span className='flex justify-center items-center gap-1'><FaUser/><p>Sign in</p></span>
                                </Link>
                            </li>)}
                            {userInfo && (<li>
                                <Link
                                    to="/profile"
                                    className="text-custom-gold hover:text-white"
                                    onClick={closeDropdown}
                                >
                                    <span className='flex justify-center items-center gap-1'><FaUser/><p>Profile</p></span>
                                </Link>
                            </li>)}
                            <li>
                                <Link
                                    to="/cart"
                                    className="text-custom-gold hover:text-white"
                                    onClick={closeDropdown}
                                >
                                    <span className='flex justify-center items-center gap-1'><FaShoppingCart/><p>cart{cartItems.length>0 && <sup className='text-custom-gold'>{cartItems.reduce((acc,element)=>acc+element.qty,0)}</sup>}</p></span>
                                </Link>
                            </li>
                            {userInfo && (<li>
                                <button
                                    className="text-custom-gold hover:text-white"
                                    onClick={logoutHandler}
                                >
                                    <span className='flex justify-center items-center gap-1'><FaSignOutAlt/><p>LogOut</p></span>
                                </button>
                            </li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileNav;
