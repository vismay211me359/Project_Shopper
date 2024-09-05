import React from 'react'
import Product from '../components/Product'
import { useGetProductsQuery, useGetTopProductsQuery } from "../slices/productsApiSlice"
import Loader from '../components/Loader'
import ErrorPage from '../components/ErrorPage'
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import TopProductCard from '../components/TopProductCard'

const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({ keyword, pageNumber });
  const { data: topProducts, isLoading: topProductsLoading } = useGetTopProductsQuery();
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {(isLoading || topProductsLoading) ? (<Loader />) : (isError ? (<ErrorPage />) : (<>
        <div className='min-h-screen md:px-5 lg:px-20'>
          {(!keyword  && !pageNumber) && <div>
            <h1 className="text-2xl md:text-4xl lg:text-4xl text-left my-5 text-white px-5">
              Top Products
            </h1>
            <div className="mb-10">
              <Slider {...carouselSettings}>
                {topProducts.map((product) => (
                  <div key={product._id} className="p-4">
                    <div className="border border-custom-gold rounded-lg shadow-lg p-6 bg-gray-800"
                      style={{ height: '500px', maxHeight: '500px' }}>
                      <TopProductCard product={product} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>}
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
