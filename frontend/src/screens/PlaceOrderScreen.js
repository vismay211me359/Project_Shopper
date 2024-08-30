import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps.js"
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { clearCartItems } from '../slices/cartSlice.js';


const PlaceOrderScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    }
    else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress.address]);

  const steps = ['Sign In', 'Shipping', 'Payment', 'Ordered'];

  const placeOrderHandler = async (e) => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  const redirectToHome=(e)=>{
    navigate("/");
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-4 text-white mb-20">
      <CheckoutSteps steps={steps} currentStep={3} />
      <h1 className="text-custom-gold text-4xl mb-4 my-1">Place Order</h1>

      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <h2 className="text-custom-gold text-2xl mb-2">Shipping Address</h2>
          <p>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-custom-gold text-2xl mb-2">Payment Method</h2>
          <p>{cart.paymentMethod}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-custom-gold text-2xl mb-2">Order Items</h2>
          <div className="space-y-4">
            {cart.cartItems.length === 0 ? (<div className="bg-gray-800 p-8 rounded-lg text-center max-w-md mx-auto my-2">
              <h1 className="text-custom-gold text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-white mb-6">Looks like you haven't added anything to your cart yet.</p>
              <button
                onClick={redirectToHome}
                className="bg-custom-gold hover:bg-opacity-90 text-black py-2 px-6 rounded-lg"
              >
                Add Items
              </button>
            </div>) : (cart.cartItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name} (x{item.qty})</span>
                <span>${item.price * item.qty}</span>
              </div>
            )))}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-md text-custom-gold mb-6">
          <h2 className="text-2xl mb-2">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items:</span>
            <span>${cart.itemsPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>${cart.shippingPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>tax:</span>
            <span>${cart.taxPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${cart.totalPrice}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-black bg-custom-gold hover:bg-custom-goldhover transition ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500  disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={isLoading}

            onClick={placeOrderHandler}
          >
            <strong>Place Order</strong>
          </button>
          {isLoading && (
            <span className="loader ml-2 border-2 border-t-2 border-t-white rounded-full w-4 h-4 animate-spin"></span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen;
