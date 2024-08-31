import React from 'react'
import { FaTimes } from "react-icons/fa";
import Loader from '../components/Loader';
import { useGetOrdersQuery } from '../slices/ordersApiSlice';
import ErrorPage from '../components/ErrorPage';
import { Link } from 'react-router-dom';

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (<Loader />) : error ? (<ErrorPage />) : (<div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold text-custom-gold mb-6">Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-5  text-custom-gold text-center">ID</th>
                <th className="py-3 px-5 text-center text-custom-gold">User</th>
                <th className="py-3 px-5 text-center text-custom-gold">Date</th>
                <th className="py-3 px-5 text-center text-custom-gold">Total</th>
                <th className="py-3 px-5 text-center text-custom-gold">Paid</th>
                <th className="py-3 px-5 text-center text-custom-gold">Delivered</th>
                <th className="py-3 px-5 text-center text-custom-gold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-700">
                  <td className="py-3 px-5 text-center">{order._id}</td>
                  <td className="py-3 px-5 text-center">{order.user.name}</td>
                  <td className="py-3 px-5 text-center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5 text-center">${order.totalPrice}</td>
                  <td className="py-3 px-5 text-center">
                    {order.isPaid ? (
                      <span>
                        Paid at {new Date(order.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500 text-lg" />
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    {order.isDelivered ? (
                      <span>
                        Delivered at{' '}
                        {new Date(order.deliveredAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <div className='flex items-center justify-center'><FaTimes className="text-red-500 text-lg"/></div>
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <Link to={`/order/${order._id}`}>
                    <button className="bg-custom-gold text-black px-4 py-2 rounded hover:bg-yellow-600 transition">
                      Details
                    </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)}
    </>
  )
}

export default OrderListScreen
