import React from 'react'

const CheckoutSteps = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-between items-center w-full px-4 py-6">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center w-full">
                    <div
                        className={`flex flex-col items-center text-center w-full ${index <= currentStep ? 'text-custom-gold' : 'text-white'
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index <= currentStep
                                    ? 'border-custom-gold bg-custom-gold'
                                    : 'border-white'
                                }`}
                        >
                            <span className="text-black font-bold">{index + 1}</span>
                        </div>
                        <span className="mt-2">{step}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`flex-grow h-1 ${index < currentStep ? 'bg-custom-gold' : 'bg-white'
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default CheckoutSteps
