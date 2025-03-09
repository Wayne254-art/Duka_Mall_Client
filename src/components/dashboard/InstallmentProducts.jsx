import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHandPointRight, FaShoppingCart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { clearMessage, get_customer_installment_products } from '../../store/reducers/installmentReducer';
import MakePayment from '../MakePayment';
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const InstallmentProducts = () => {
    const dispatch = useDispatch();
    const { installmentProducts, successMessage } = useSelector(state => state.installments);
    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(get_customer_installment_products(userInfo.id));
    }, [dispatch, userInfo.id]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearMessage());
            dispatch(get_customer_installment_products(userInfo.id));
        }
    }, [successMessage, dispatch, userInfo.id]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleButtonClick = (product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleButtonClose = () => {
        setIsFormOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div>
            <section className='bg-gray-100 py-10'>
                <div className='w-[85%] mx-auto'>
                    {Array.isArray(installmentProducts) && installmentProducts.length > 0 ? (
                        <div className='flex flex-wrap'>
                            <div className='w-full'>
                                <div className='bg-white p-4'>
                                    <h2 className='text-md text-green-500 font-semibold'>
                                        Your Installment Products ({installmentProducts.length})
                                    </h2>
                                </div>
                                {installmentProducts.map((product, i) => (
                                    <div key={i} className='flex bg-white p-4 flex-col gap-2 my-3'>
                                        <p>
                                            Installment Receipts sent to 
                                            <span className='text-black font-bold'> {userInfo.email}</span>
                                        </p>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-2 items-center'>
                                                <img className='w-[80px] h-[80px]' src={product?.productId?.images?.[0]} alt={product?.productId?.name} />
                                                <div>
                                                    <h2 className='text-md text-slate-600'>{product?.productId?.name}</h2>
                                                    <span className='text-sm'>Brand: {product?.productId?.brand}</span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3 items-end'>
                                                <div className='text-orange-500'>
                                                    Outstanding balance <span className='font-bold'>Ksh. {product?.totalPrice.toLocaleString()}</span>
                                                </div>
                                                <div className='font-bold text-pretty hover:cursor-pointer hover:underline flex flex-row gap-2 items-center'>
                                                    <FaHandPointRight size={18} />Track your Installments
                                                </div>
                                                <div>
                                                    <button onClick={() => handleButtonClick(product)} className='px-4 py-1 bg-green-500 text-white text-center rounded-md'>
                                                        Make Payment
                                                    </button>
                                                    <AnimatePresence>
                                                        {isFormOpen && selectedProduct && (
                                                            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[1000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                                <motion.div className="relative bg-black/30 rounded-2xl shadow-lg max-w-lg w-full md:w-[95%]" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                                                                    <button
                                                                        onClick={handleButtonClose}
                                                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <RxCross2 className='text-2xl font-bold text-orange-600' />
                                                                    </button>
                                                                    <MakePayment paymentProduct={selectedProduct} />
                                                                </motion.div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center gap-6'>
                            <FaShoppingCart className='text-gray-400 text-6xl' />
                            <p className='text-lg text-gray-600'>No installment products found</p>
                            <Link to='/products' className='px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600'>
                                Shop Now
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default InstallmentProducts;
