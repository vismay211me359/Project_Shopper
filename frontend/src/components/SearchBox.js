import React from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({theSize}) => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        }
        else {
            navigate('/');
        }
    }

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={submitHandler} className={`relative w-full max-w-${theSize}`}>
                <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-white bg-gray-800 border border-custom-gold rounded-full focus:outline-none focus:border-white"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute left-3 top-2 text-custom-gold focus:outline-none"
                >
                    <FaSearch className="h-6 w-6" />
                </button>
            </form>
        </div>
    )
}

export default SearchBox
