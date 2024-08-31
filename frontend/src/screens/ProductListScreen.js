import React from 'react'
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Loader from '../components/Loader';
import ErrorPage from '../components/ErrorPage';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productsApiSlice';
import { toast } from "react-toastify";



const ProductListScreen = () => {

    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you Sure ?")) {
            try {
                await deleteProduct(id);
                refetch();
                toast.success("Product deleted");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product ?')) {
            try {
                await createProduct();
                refetch();
                toast.success("Product created");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl text-custom-gold font-bold">Products</h1>
                <div className="flex items-center">
                    <button className="group relative w-full justify-center bg-custom-gold text-black px-4 py-2 rounded flex items-center hover:bg-custom-goldhover disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed transition-all duration-300" onClick={createProductHandler} disabled={loadingCreate}>
                        <FaPlus className="mr-2" />
                        Create New Product
                    </button>
                    {loadingCreate && (
                        <span className="loader ml-2 border-2 border-t-2 border-t-white rounded-full w-4 h-4 animate-spin"></span>
                    )}
                </div>
            </div>
            {isLoading ? (<Loader />) : error ? (<ErrorPage />) : (<div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-md">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 text-center text-custom-gold">ID</th>
                            <th className="p-4 text-center text-custom-gold">Name</th>
                            <th className="p-4 text-center text-custom-gold">Price</th>
                            <th className="p-4 text-center text-custom-gold">Category</th>
                            <th className="p-4 text-center text-custom-gold">Brand</th>
                            <th className="p-4"></th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr className="border-b border-gray-600" key={product._id}>
                                <td className="p-4 text-center">{product._id}</td>
                                <td className="p-4 text-center">{product.name}</td>
                                <td className="p-4 text-center">${product.price}</td>
                                <td className="p-4 text-center">{product.category}</td>
                                <td className="p-4 text-center">{product.brand}</td>
                                <td className="p-4 text-center">
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <button className="text-white hover:text-custom-gold transition-all duration-300">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-black hover:text-red-600 transition-all duration-300" onClick={() => deleteHandler(product._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)}
        </div>
    )
}

export default ProductListScreen;
