import React from 'react'
import { useParams } from "react-router-dom";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FaCreditCard } from 'react-icons/fa';

import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from "../slices/ordersApiSlice.js";
import Loader from '../components/Loader.js';
import ErrorPage from '../components/ErrorPage.js';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const OrderScreen = () => {

    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    let createDate = {};
    let updateDate = {};

    if (!isLoading) {
        createDate = new Date(order.createdAt);
        updateDate = new Date(order.updatedAt);
    }

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success("Payment successfull");
            } catch (err) {
                toast.error(err?.data?.message || err?.message);
            }
        });
    }

    async function onApproveTest() {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success("Payment successfull");
    }

    function onError(err) {
        toast.error(err?.message);
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }

    const handleClick = () => {
        const element = document.getElementById('target-div');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (isLoading ? (<Loader />) : (error ? <ErrorPage /> : (
        <div className="min-h-screen bg-black text-white p-4">
            <h1 className="text-3xl font-bold text-custom-gold mb-6">Order Details</h1>

            <div className="bg-gray-800 p-4 rounded-md shadow-md mb-4">
                <h2 className="text-xl font-semibold text-custom-gold">Customer Information</h2>
                <p><span className="font-bold">Order ID:</span> {order._id}</p>
                <p><span className="font-bold">Name:</span> {order.user.name}</p>
                <p><span className="font-bold">Email:</span> {order.user.email}</p>
                <p><span className="font-bold">Order Date:</span> {` ${createDate.getUTCDate()}-${createDate.getUTCMonth() + 1}-${createDate.getUTCFullYear()}, ${createDate.getUTCHours()}:${createDate.getUTCMinutes()}:${createDate.getUTCSeconds()}`}</p>
                <p><span className="font-bold">Address:</span> {` ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-md shadow-md mb-4">
                <h2 className="text-xl font-semibold text-custom-gold">Ordered Items</h2>
                <ul>
                    {order.orderItems.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{item.name} (x{item.qty})</span>
                            <span>${item.price * item.qty}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-md shadow-md mb-4">
                <h2 className="text-xl font-semibold text-custom-gold">Payment Status</h2>
                <div className='flex justify-between items-center'>
                    <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
                    {!order.isPaid && <button
                        onClick={handleClick}
                        className="flex items-center justify-center p-2 bg-custom-gold text-black hover:bg-yellow-500 transition duration-300 ease-in-out rounded-full"
                    >
                        <FaCreditCard className="mr-2" />
                        Pay
                    </button>}
                </div>
                {order.isPaid && <p><span className="font-bold">Payment Method:</span> {order.paymentMethod}</p>}
                {order.isPaid && <p><span className="font-bold">Delivery Date:</span> {order.paidAt}</p>}
            </div>

            <div className="bg-gray-800 p-4 rounded-md shadow-md mb-4">
                <h2 className="text-xl font-semibold text-custom-gold">Delivery Status</h2>
                <p>{order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                {order.isDelivered && <p><span className="font-bold">Delivery Date:</span> {` ${updateDate.getUTCDate()}-${updateDate.getUTCMonth() + 1}-${updateDate.getUTCFullYear()}, ${updateDate.getUTCHours()}:${updateDate.getUTCMinutes()}:${updateDate.getUTCSeconds()}`}</p>}
            </div>

            <div className="bg-gray-800 p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-custom-gold">Price Summary</h2>
                <p><span className="font-bold">Items Price:</span> ${order.itemsPrice}</p>
                <p><span className="font-bold">Shipping Price:</span> ${order.shippingPrice}</p>
                <p><span className="font-bold">Tax Price:</span> ${order.taxPrice}</p>
                <p><span className="font-bold">Total Price:</span> ${order.totalPrice}</p>
            </div>
            <div className="bg-black text-white my-4">
                {!order.isPaid && (
                    <div className="mb-4">
                        {(isPending || loadingPay) ? (
                            <Loader />
                        ) : (
                            //     {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}

                                // <button
                                //     className="mb-2 bg-custom-gold text-white py-2 px-4 rounded"
                                //     onClick={onApproveTest}
                                // >
                                //     Test Pay Order
                                // </button> 
                            <div className="flex justify-center items-center bg-gray-900 p-6 min-h-[60vh]" id='target-div'>
                                <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                                    <h2 className="text-center text-custom-gold mb-4">Complete Your Payment</h2>
                                    <div className="flex justify-center items-center">
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        />
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                )}

                {/* {loadingDeliver && <Loader />}

                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <div className="mt-4">
                        <button
                            type="button"
                            className="w-full bg-custom-gold text-white py-2 px-4 rounded"
                            onClick={deliverHandler}
                        >
                            Mark As Delivered
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    )));
}

export default OrderScreen
