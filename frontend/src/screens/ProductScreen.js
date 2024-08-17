import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import Rating from "../components/Rating"
import { FaArrowLeft } from 'react-icons/fa';
import axios from "axios"

const ProductScreen = () => {
    const [product,setProduct]=useState({});

    const { id: productId } = useParams();
    useEffect(()=>{
        const fetchProduct=async()=>{
            const {data}=await axios.get(`/api/products/${productId}`);
            setProduct(data);
        }
        fetchProduct();
    },[productId]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
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

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <button className="bg-custom-gold text-black px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-custom-goldhover transition-all disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={product.countInStock <= 0}>
                                Add to Cart
                            </button>
                            <button className="border border-custom-gold text-custom-gold px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-custom-gold hover:text-black transition-all disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={product.countInStock <= 0}>
                                Buy Now
                            </button>
                            <Link to="/">
                            <button className="border bg-gray-400 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-gray-500 transition-all">
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
            </div>
        </div>
    );
}

export default ProductScreen
