import React from 'react'
import Product from '../components/Product'
import { useGetProductsQuery } from "../slices/productsApiSlice"
import Loader from '../components/Loader'
import ErrorPage from '../components/ErrorPage'
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {

  const {pageNumber}=useParams();

  const { data, isLoading, isError } = useGetProductsQuery({pageNumber});

  return (
    <>
      {isLoading ? (<Loader />) : (isError ? (<ErrorPage/>) : (<>
        <div className='min-h-screen md:px-5 lg:px-20'>
          <h1 className='text-2xl md:text-4xl lg:text-4xl text-left my-5 text-white px-5'>Latest Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mb-20 mt-5">
            {
              data.products.map((product) => {
                return <Product product={product} key={product._id} />
              })
            }
          </div>
          <Paginate totalPages={data.pages} />
        </div>
      </>))}
    </>

  )
}

export default HomeScreen;
