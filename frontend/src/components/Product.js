import React from 'react'
import {Link} from "react-router-dom"
import Rating from './Rating'


const Product = ({product}) => {
  return (
    <div className="max-w-sm mx-auto border border-white rounded-lg overflow-hidden bg-black">
      <Link to={`/products/${product._id}`}><img
        src={product.image}
        alt={product.name}
        className="w-full object-cover transform transition duration-300 ease-in-out hover:scale-110"
      /></Link>
      <div className="p-8 grid grid-rows-[1.2fr,1fr]">
        <div className='h-14 overflow-hidden'>
          <Link to={`/products/${product._id}`} className=' text-white hover:text-custom-gold'><h2 className="text-lg font-semibold mb-2">{product.name.length<=30 ? product.name : `${product.name.slice(0,30)}...`}</h2></Link>
        </div>
        <div>
          <p className="text-white text-lg font-bold pb-1">${product.price}</p>
          <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </div>
      </div>
    </div>
  )
}

export default Product
