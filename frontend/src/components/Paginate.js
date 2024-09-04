import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Paginate = ({totalPages,isAdmin=false}) => {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const maxPagesToShow = 10;

  useEffect(() => {
    // Update the pagination bar numbers
    const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    const newPageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNumbers(newPageNumbers);
  }, [currentPage, totalPages]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if(isAdmin){
      navigate(`/admin/productlist/${page}`)
    }
    else{
      navigate(`/page/${page}`);
    }
  };

  const handleNext = () => {
    if (currentPage + maxPagesToShow <= totalPages) {
      setCurrentPage(currentPage + maxPagesToShow);
    }
  };

  const handleBack = () => {
    if (currentPage - maxPagesToShow > 0) {
      setCurrentPage(currentPage - maxPagesToShow);
    }
  };

  return <div className="flex justify-center items-center mt-10 mb-10">
    <button
      className={`px-4 py-2 mx-1 border border-gray-600 rounded ${currentPage <= maxPagesToShow ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-700'}`}
      onClick={handleBack}
      disabled={currentPage <= maxPagesToShow}
    >
      &laquo; Back
    </button>
    {
      pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 mx-1 border border-gray-600 rounded ${currentPage === page ? 'bg-custom-gold text-black' : 'hover:bg-gray-700'}`}
        >
          {page}
        </button>
      ))
    }
    <button
      className={`px-4 py-2 mx-1 border border-gray-600 rounded ${currentPage + maxPagesToShow > totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-700'}`}
      onClick={handleNext}
      disabled={currentPage + maxPagesToShow > totalPages}
    >
      Next &raquo;
    </button>
  </div>;
};

export default Paginate;
