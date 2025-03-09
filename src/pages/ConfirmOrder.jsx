import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import axios from 'axios';
import error from '../assets/error.png';
import success from '../assets/success.png';

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log('ConfirmOrder component mounted.');

    const reference = new URLSearchParams(window.location.search).get('reference');
    console.log('Extracted reference:', reference);

    if (!reference) {
      console.warn('No reference found in URL.');
      setMessage('failed');
      return;
    }

    const verifyPayment = async () => {
      console.log('Verifying payment for reference:', reference);
      try {
        const { data } = await axios.get(`https://dukamall-backend.onrender.com/api/verify/${reference}`);
        console.log('Payment verification response:', data);

        if (data.status === 'success') {
          setMessage('succeeded');
          localStorage.setItem('orderId', data.orderId);
          console.log('OrderId stored in localStorage:', data.orderId);
        } else if (data.status === 'processing') {
          setMessage('processing');
        } else {
          setMessage('failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error.response?.data || error.message);
        setMessage('failed');
      }
    };

    verifyPayment();
  }, []);

  const update_payment = async (reference) => {
    console.log('update_payment called with reference:', reference);

    const orderId = localStorage.getItem('orderId');
    console.log('Retrieved orderId from localStorage:', orderId);

    if (orderId && reference) {
      try {
        console.log('Sending payment confirmation request...');
        await axios.post(`https://dukamall-backend.onrender.com/api/order/confirm/${orderId}`, { reference });
        console.log('Payment confirmed successfully.');

        localStorage.removeItem('orderId');
        setLoader(false);
      } catch (error) {
        console.error('Error updating payment:', error.response?.data || error.message);
      }
    } else {
      console.warn('Missing orderId or reference. Skipping payment update.');
    }
  };

  useEffect(() => {
    if (message === 'succeeded') {
      const reference = new URLSearchParams(window.location.search).get('reference');
      console.log('Payment succeeded, calling update_payment with reference:', reference);
      update_payment(reference);
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {console.log('Rendering component with message:', message)}
      {(message === 'failed' || message === 'processing') ? (
        <>
          <img src={error} alt="error logo" />
          <Link className="px-5 py-2 bg-green-500 rounded-sm text-white" to="/dashboard/my-orders">
            Back to Dashboard
          </Link>
        </>
      ) : message === 'succeeded' ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src={success} alt="success logo" />
            <Link className="px-5 py-2 bg-green-500 rounded-sm text-white" to="/dashboard/my-orders">
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
