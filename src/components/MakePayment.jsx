import React, { useState } from 'react';
import { GiReceiveMoney } from "react-icons/gi";

const MakePayment = ({ paymentProduct }) => {
    const [amount, setAmount] = useState("");

    const remainingBalance = paymentProduct?.totalPrice || 0;

    const isDisabled = !amount || parseFloat(amount) > remainingBalance;

    return (
        <div className='max-w-lg w-full md:w-[95%] p-4 rounded-2xl z-[1000]'>
            <h2 className='text-xl font-semibold text-green-500 mb-4 text-center'>
                Pay For - {paymentProduct?.productId?.name}
            </h2>
            <form className='space-y-4'>
                <p className="text-green-500">
                    Remaining Balance: <span className="font-bold">Ksh. {remainingBalance.toLocaleString()}</span>
                </p>
                <div className='relative'>
                    <GiReceiveMoney className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                    <input
                        type='number'
                        name='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={`Enter value not more than Ksh.${remainingBalance.toLocaleString()}`}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 shadow-sm"
                        required
                    />
                </div>
                <button
                    className={`w-full p-3 text-white font-semibold rounded-lg transition-all ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                    disabled={isDisabled}
                >
                    Pay Now
                </button>
                <button
                    className="w-full p-3 text-white font-semibold rounded-lg transition-all bg-orange-500 hover:bg-orange-600"
                >
                    Pay All
                </button>
            </form>
        </div>
    );
}

export default MakePayment