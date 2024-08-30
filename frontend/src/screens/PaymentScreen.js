import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice.js'

import CheckoutSteps from "../components/CheckoutSteps.js"


const PaymentScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);


    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const steps = ['Sign In', 'Shipping', 'Payment', 'Ordered'];

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            {/* Checkout Steps */}
            <CheckoutSteps steps={steps} currentStep={2} />

            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-custom-gold mb-4 text-center">Select Payment Method</h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-custom-gold mb-2">Payment Method</label>
                        <div className="flex flex-col space-y-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="form-radio text-custom-gold"
                                />
                                <span className="ml-2">PayPal</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Stripe"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="form-radio text-custom-gold"
                                />
                                <span className="ml-2">Stripe</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Credit Card"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="form-radio text-custom-gold"
                                />
                                <span className="ml-2">Credit Card</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-custom-gold text-black font-bold rounded-lg hover:bg-opacity-90 transition duration-200"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PaymentScreen
