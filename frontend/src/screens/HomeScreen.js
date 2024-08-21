import React from 'react'
import Product from '../components/Product'
import { useGetProductsQuery } from "../slices/productsApiSlice"
import Loader from '../components/Loader'
import ErrorPage from '../components/ErrorPage'

const HomeScreen = () => {

  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (<Loader />) : (isError ? (<ErrorPage/>) : (<>
        <div className='md:px-5 lg:px-20'>
          <h1 className='text-2xl md:text-4xl lg:text-4xl text-left my-5 text-white px-5'>Latest Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mb-20 mt-5">
            {
              products.map((product) => {
                return <Product product={product} key={product._id} />
              })
            }
          </div>
        </div>
      </>))}
    </>

  )
}

export default HomeScreen
