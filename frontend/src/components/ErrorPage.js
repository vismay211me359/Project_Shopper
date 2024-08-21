import React from 'react';
import { Link } from "react-router-dom"

const ErrorPage = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-custom-gold">
          Oops! Something went wrong.
        </h1>
        <p className="text-white mt-4">
          We couldn't fetch the data. Please try again later.
        </p>
        <div className="mt-8 space-x-4">
          <Link to="/">
            <button
              className="bg-custom-gold text-black font-semibold py-2 px-6 rounded hover:bg-white transition-colors"
            >
              Go Home
            </button>
          </Link>
          <button
            className="bg-white text-black font-semibold py-2 px-6 rounded hover:bg-custom-gold transition-colors"
            onClick={reloadPage}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
