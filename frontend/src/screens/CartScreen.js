import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart,removeFromCart } from '../slices/cartSlice';


const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const redirectToHome = () => {
        navigate("/");
    }

    const addToCartHander=async(item,value)=>{
        const qty=Math.max(1,value);
        if(qty>item.countInStock){
            dispatch(addToCart({...item,qty:item.countInStock}))
        }
        else{
            dispatch(addToCart({...item,qty}));
        }
    }

    const removeFromCartHandler=async(id)=>{
        dispatch(removeFromCart(id));
    }

    const checkOutHandler=(e)=>{
        navigate('/login?redirect=/shipping');
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-8">
            <h1 className="text-custom-gold text-4xl font-bold text-center mb-8">Shopping Cart</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cartItems.length === 0 ? (
                        <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md mx-auto">
                            <h1 className="text-custom-gold text-3xl font-bold mb-4">Your Cart is Empty</h1>
                            <p className="text-white mb-6">Looks like you haven't added anything to your cart yet.</p>
                            <button
                                onClick={redirectToHome}
                                className="bg-custom-gold hover:bg-opacity-90 text-black py-2 px-6 rounded-lg"
                            >
                                Add Items
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-800 p-4 mb-4 rounded-lg">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg mr-4" />
                                    <div>
                                        <Link to={`/products/${item._id}`}><h2 className="text-custom-gold text-xl font-semibold">{item.name}</h2></Link>
                                        <p className="text-white">Price: ${item.price}</p>
                                        <div className="flex items-center space-x-2 py-2">
                                            <label htmlFor="quantity" className="text-white text-lg font-medium">
                                            Quantity:
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                value={item.qty}
                                                onChange={(e)=>{addToCartHander(item,Number(e.target.value))}}
                                                className="w-16 px-2 py-1 text-center text-black bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                                                min="1"
                                                max={item.countInStock}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <button className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded-lg mb-2 flex justify-center items-center" onClick={(e)=>{removeFromCartHandler(item._id)}}><FaTrash/><p>Remove</p></button>
                                    <button className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-4 rounded-lg" onClick={()=>{navigate(`/products/${item._id}`)}}>Edit</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-custom-gold text-2xl font-bold mb-4">Order Summary</h2>
                    <p className="text-white mb-4">Total Items: {cartItems.reduce((acc,item)=>(acc)+item.qty,0)}</p>
                    <p className="text-white mb-4">Total Price: ${cartItems.reduce((acc,item)=>acc+(item.qty*item.price),0).toFixed(2)}</p>
                    <button className="bg-custom-gold hover:bg-opacity-90 text-black py-2 px-4 rounded-lg w-full mb-4  disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={cartItems.length===0} onClick={checkOutHandler}>
                        Proceed to Checkout
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg w-full" onClick={()=>{navigate("/")}}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
