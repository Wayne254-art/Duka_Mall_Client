
import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { FRONTEND_URL, paystack_key } from '../utils/config'

const CheckoutForm = ({ orderId, price }) => {
    localStorage.setItem('orderId', orderId);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Replace with your actual Paystack public key
    const publicKey = paystack_key;
    const [email, setEmail] = useState('');
    const [reference, setReference] = useState('');

    const handlePaystackSuccess = (response) => {
        console.log('Payment successful:', response);
        // Optionally, redirect or update your backend after successful payment
        window.location.href = `${FRONTEND_URL}/order/confirm?`;
    };

    const handlePaystackClose = () => {
        console.log('Payment closed');
        setMessage('Payment process was canceled');
    };

    const componentProps = {
        email,
        amount: price * 100,
        publicKey,
        // currency: 'KES',
        text: 'Pay Now',
        onSuccess: handlePaystackSuccess,
        onClose: handlePaystackClose,
        reference,
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const generatedEmail = 'customer@example.com'; // Replace with logic to fetch user email
            const generatedReference = `ref-${Date.now()}`;

            setEmail(generatedEmail);
            setReference(generatedReference);

            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setMessage('An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleSubmit}
                className="px-10 py-[6px] mb-4 rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
                disabled={isLoading}
            >
                {isLoading ? <div>Loading...</div> : 'Generate Payment Details'}
            </button>
            {reference && email && (
                <PaystackButton {...componentProps} className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-green-500 text-white" />
            )}
            {message && <div>{message}</div>}
        </div>
    );
};

export default CheckoutForm;
