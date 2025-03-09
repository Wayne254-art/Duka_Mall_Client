
import React, { useState } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Paystack from '../components/Paystack';
import { useLocation } from 'react-router-dom';
import { FRONTEND_URL } from '../utils/config';

const Payment = () => {
    const { state: { price, items, orderId } } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('paystack');

    return (
        <div>
            <Headers />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                    <div className='flex flex-wrap md:flex-col-reverse'>
                        <div className='w-7/12 md:w-full'>
                            <div className='pr-2 md:pr-0'>
                                <div className='flex flex-wrap'>
                                    <div onClick={() => setPaymentMethod('paystack')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'paystack' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src={`${FRONTEND_URL}/images/payment/paystack.png`} alt="paystack" />
                                            <span className='text-slate-600'>Paystack</span>
                                        </div>
                                    </div>
                                    <div onClick={() => setPaymentMethod('airtel')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'airtel' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src={`${FRONTEND_URL}/images/payment/airtel.png`} alt="airtel" />
                                            <span className='text-slate-600'>Airtel</span>
                                        </div>
                                    </div>
                                    <div onClick={() => setPaymentMethod('mpesa')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'mpesa' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src={`${FRONTEND_URL}/images/payment/mpesa.png`} alt="mpesa" />
                                            <span className='text-slate-600'>M-pesa</span>
                                        </div>
                                    </div>
                                    <div onClick={() => setPaymentMethod('stripe')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src={`${FRONTEND_URL}/images/payment/stripe.png`} alt="stripe" />
                                            <span className='text-slate-600'>Stripe</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    paymentMethod === 'paystack' && <div>
                                        <Paystack orderId={orderId} price={price} />
                                    </div>
                                }
                                {
                                    paymentMethod === 'airtel' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>Coming Soon</button>
                                    </div>
                                }
                                {
                                    paymentMethod === 'mpesa' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>Coming Soon</button>
                                    </div>
                                }
                                {
                                    paymentMethod === 'stripe' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>Coming Soon</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='w-5/12 md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-0'>
                                <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                    <h2>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <span>{items} items and shipping fee included</span>
                                        <span>Ksh.{price}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Total Amount</span>
                                        <span className='text-lg text-orange-500'>Ksh.{price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Payment;
