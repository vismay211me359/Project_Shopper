import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice.js";
import CheckoutSteps from "../components/CheckoutSteps.js"


const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState((shippingAddress?.address || ''));
    const [city, setCity] = useState((shippingAddress?.city || ''));
    const [postalCode, setPostalCode] = useState((shippingAddress?.postalCode || ''));
    const [country, setCountry] = useState((shippingAddress?.country || ''));

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    const steps = ['Sign In', 'Shipping', 'Payment', 'Ordered'];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-md">
                {/* Checkout Steps Component */}
                <CheckoutSteps steps={steps} currentStep={1} />

                {/* Shipping Form */}
                <h2 className="text-custom-gold text-2xl font-bold mb-6 text-center">Shipping Address</h2>
                <form className="space-y-4" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-white text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            placeholder="Enter your address"
                            className="w-full px-4 py-2 border border-custom-gold bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-medium mb-1">City</label>
                        <input
                            type="text"
                            placeholder="Enter your city"
                            className="w-full px-4 py-2 border border-custom-gold bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-medium mb-1">Postal Code</label>
                        <input
                            type="text"
                            placeholder="Enter your postal code"
                            className="w-full px-4 py-2 border border-custom-gold bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            value={postalCode}
                            onChange={(e)=>setPostalCode(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-medium mb-1">Country</label>
                        <input
                            type="text"
                            placeholder="Enter your country"
                            className="w-full px-4 py-2 border border-custom-gold bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-custom-gold text-black font-semibold py-2 rounded hover:bg-opacity-80 transition duration-200"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ShippingScreen;
