import React from 'react'

const Loader = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-custom-gold animate-pulse">
                        Loading...
                    </h1>
                    <p className="text-white mt-4">Please wait while we load the content</p>
                    <div className="flex justify-center items-center mt-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-custom-gold"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader
