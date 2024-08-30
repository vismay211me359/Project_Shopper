import React from 'react';

const CustomError = () => {

  const retry=()=>{
    window.location.reload();
  }

  return (
    <div className="flex flex-col justify-center items-center h-full text-white">
      <h1 className="text-4xl md:text-6xl font-bold text-custom-gold">
          Oops! Something went wrong.
      </h1>
      <p className="text-lg text-white m-4">We couldn't fetch the data. Please try again later.</p>
      <button
        className="bg-custom-gold text-black px-4 py-2 rounded hover:bg-opacity-90"
        onClick={retry}
      >
        Retry
      </button>
    </div>
  );
};

export default CustomError;
