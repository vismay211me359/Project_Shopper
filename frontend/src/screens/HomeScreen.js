import React from 'react'
import { useEffect,useState } from 'react';
import Product from '../components/Product'
import axios from "axios"

const HomeScreen = () => {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    const fetchProducts=async()=>{
      const {data}=await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  },[]);

  return (
    <div className='md:px-5 lg:px-20'>
      <h1 className='text-2xl md:text-4xl lg:text-4xl text-left my-5 text-white px-5'>Latest Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mb-20 mt-5">
        {
            products.map((product)=>{
                return <Product product={product} key={product._id}/>
            })
        }
      </div>
    </div>
  )
}

export default HomeScreen
