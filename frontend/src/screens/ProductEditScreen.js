import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../slices/productsApiSlice';

import ErrorPage from '../components/ErrorPage';
import Loader from '../components/Loader';
import { toast } from "react-toastify";



const ProductEditScreen = () => {

    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadProductImage] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }).unwrap();
            toast.success('Product updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <button
                    onClick={() => navigate("/admin/productlist")}
                    className="text-white bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded mb-4 transition-all duration-300"
                >
                    Go Back
                </button>
                {isLoading ? (<Loader />) : error ? (<ErrorPage />) : (<form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-custom-gold text-2xl font-semibold mb-4">Edit Product</h2>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter product price"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Image</label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 text-white rounded"
                        />
                        <input
                            type="file"
                            onChange={uploadFileHandler}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded cursor-pointer file:bg-gray-800 file:border-0 file:text-white file:mr-4 file:py-2 file:px-4 file:rounded"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-white mb-2">Brand Name</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter brand name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Category Name</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter category name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Count in Stock</label>
                        <input
                            type="number"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter stock count"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-custom-gold hover:bg-custom-goldhover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500  disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed transition-all duration-300" disabled={loadingUpdate}
                        >
                            <strong>Update</strong>
                        </button>
                        {loadingUpdate && (
                            <span className="loader ml-2 border-2 border-t-2 border-t-white rounded-full w-4 h-4 animate-spin"></span>
                        )}
                    </div>
                </form>)}
            </div>
        </div>
    )
}

export default ProductEditScreen;
