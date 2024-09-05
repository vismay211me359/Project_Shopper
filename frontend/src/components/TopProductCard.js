import React from 'react'
import { useNavigate } from 'react-router-dom';

const TopProductCard = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div
            className="relative group border border-custom-gold rounded-lg overflow-hidden shadow-lg bg-gray-800"
            style={{ height: '450px' }} // Adjust the height as needed
        >
            {/* Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                onClick={() => navigate(`/products/${product._id}`)}
            />

            {/* Product Details Overlay */}
            <div
                className="absolute top-0 right-0 bottom-0 bg-black bg-opacity-50 w-1/3 p-4 flex flex-col justify-center text-white"
            >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-sm md:text-base lg:text-lg mb-4">${product.price}</p>

                <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="mt-4 py-2 px-4 bg-custom-gold text-black font-bold rounded"
                >
                    View Product
                </button>
            </div>
        </div>
    )
}

export default TopProductCard
