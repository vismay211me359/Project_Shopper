import React from 'react';

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-custom-gold border-solid"></div>
    </div>
  );
};

export default CustomLoader;
