import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import Rating from "../components/Rating.js"
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader.js';
import ErrorPage from '../components/ErrorPage.js';
import { addToCart } from "../slices/cartSlice.js"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { FaStar } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import Meta from '../components/Meta.js'



const ProductScreen = () => {

    const { id: productId } = useParams();
    const { data: product, isLoading, isError, refetch } = useGetProductDetailsQuery(productId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [qty, setqty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        if (value > product.countInStock) {
            setqty(product.countInStock);
        }
        else {
            setqty(value);
        }
    }

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    }

    const submitReviewHandler = async(e) => {
        e.preventDefault();
        try{
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Thanks for the review");
            setRating(0);
            setComment("");
        }catch(err){
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>{isLoading ? (<Loader />) : isError ? (<ErrorPage />) : (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <Meta title={product.name} />
                <div className="max-w-5xl w-full p-6 md:p-12">
                    <div className="flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="flex-1 flex justify-center items-center p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-sm h-auto object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-center p-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-custom-gold mb-4">
                                {product.name}
                            </h1>
                            <p className="text-lg md:text-xl mb-4">{product.description}</p>
                            <p className="text-2xl md:text-3xl font-semibold mb-6">
                                ${product.price}
                            </p>

                            {product.countInStock > 0 && <div className="flex items-center space-x-2 py-4">
                                <label htmlFor="quantity" className="text-white text-lg font-medium">
                                    Qty:
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={qty}
                                    onChange={handleChange}
                                    className="w-16 px-2 py-1 text-center text-black bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-gold"
                                    min="1"
                                    max={product.countInStock}
                                />
                            </div>}

                            {/* Action Buttons */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <button className="border border-custom-gold text-custom-gold px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-custom-gold hover:text-black transition-all disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed duration-300" disabled={product.countInStock <= 0} onClick={addToCartHandler}>
                                    Add to Cart
                                </button>
                                <Link to="/">
                                    <button className="w-full border bg-gray-400 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-gray-500 transition-all duration-300">
                                        <div className='flex items-center gap-1 justify-center'><FaArrowLeft /><p>Home</p></div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-8">
                        <h2 className="text-3xl font-bold text-custom-gold mb-4">Product Details</h2>
                        <p className="text-lg mb-2">
                            <strong>Category:</strong> {product.category}
                        </p>
                        <div className="text-lg mb-2 flex gap-1">
                            <Rating value={product.rating} text={product.numReviews} />
                            <p>Reviews</p>
                        </div>
                        <p className="text-lg mb-2">
                            <strong>Stock:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                    </div>


                    <div className="mt-8">
                        <h2 className="text-3xl font-bold text-custom-gold mb-4">Reviews</h2>
                        {userInfo ? (<><div className="flex items-center space-x-2 mb-4">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    className={`cursor-pointer ${rating >= index + 1 ? 'text-custom-gold' : 'text-gray-400'
                                        }`}
                                    onClick={() => setRating(index + 1)}
                                />
                            ))}
                        </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded mb-4"
                                placeholder="Write your review..."
                                rows="4"
                            ></textarea>
                            <button
                                onClick={submitReviewHandler}
                                className="w-full border border-custom-gold text-custom-gold px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-custom-gold hover:text-black transition-all duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                                disabled={loadingProductReview}
                            >
                                Submit Review
                                {loadingProductReview && (
                                    <FaSpinner className="ml-2 animate-spin" />
                                )}
                            </button></>) : (<div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
                                <p className="text-white text-lg mb-4">
                                    Login to review the product.
                                </p>
                                <Link
                                    to="/login"
                                    className="text-custom-gold hover:text-white transition-colors duration-300"
                                >
                                    Go to Login
                                </Link>
                            </div>)}

                        {/* Display Previous Reviews */}
                        <div className="mt-8">
                            {product.reviews.length === 0 ? (
                                <p>No reviews found.</p>
                            ) : (
                                product.reviews.map((review) => (
                                    <div key={review._id} className="border-b border-gray-600 py-4">
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar
                                                        key={index}
                                                        className={`${review.rating >= index + 1
                                                            ? 'text-custom-gold'
                                                            : 'text-gray-400'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="ml-2 text-sm">
                                                {review.createdAt.substring(0, 10)}
                                            </p>
                                        </div>
                                        <p>{review.comment}</p>
                                        <p className="text-sm text-gray-400 mt-2">- {review.name}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        )}</>


    );
}

export default ProductScreen
