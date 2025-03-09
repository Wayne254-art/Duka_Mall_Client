
import React, { useState } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { FRONTEND_URL, paystack_key } from '../utils/config';

const Paystack = ({ price, orderId }) => {
    const [email, setEmail] = useState('');
    const [reference, setReference] = useState('');
    const [message, setMessage] = useState('');

    const publicKey = paystack_key;

    const createPayment = async () => {
        if (!email) {
            setMessage('Please enter a valid email address.');
            return;
        }
        try {
            const response = await axios.post(
                'https://dukamall-backend.onrender.com/api/order/create-payment',
                { price, orderId, email },
                { withCredentials: true }
            );

            if (response?.data?.email && response?.data?.reference) {
                setEmail(response.data.email);
                setReference(response.data.reference);
                setMessage('Payment reference created successfully. Proceed to pay.');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error creating payment:', error?.response?.data || error.message || error);
            setMessage('Failed to create payment. Please try again.');
        }
    };

    const handleSuccess = (response) => {
        console.log('Payment Successful:', response);
        setMessage('Payment was successful!');
        // Redirect with payment details
        window.location.href = `${FRONTEND_URL}/order/confirm?reference=${response.reference}&status=success&transaction_id=${response.transaction}`;
    };

    const handleClose = () => {
        console.log('Payment closed');
        setMessage('Payment process was canceled.');
    };

    const componentProps = {
        email,
        amount: price * 100,
        publicKey,
        currency: 'KES',
        text: 'Pay Now',
        onSuccess: handleSuccess,
        onClose: handleClose,
        reference,
    };

    return (
        <div className="mt-4">
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-2/3"
                required
            />
            <br />
            {message && <p className="text-red-500 mb-4">{message}</p>}
            {reference ? (
                <PaystackButton
                    {...componentProps}
                    className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
                />
            ) : (
                <button
                    onClick={createPayment}
                    className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
                >
                    Start Payment
                </button>
            )}
        </div>
    );
};

export default Paystack;
