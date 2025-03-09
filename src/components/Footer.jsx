/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addSubscription, resetSubscriptionState } from '../store/reducers/mailReducer'
import { AiFillShopping, AiFillHeart } from 'react-icons/ai'
import { FaXTwitter } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { FRONTEND_URL } from '../utils/config'

const Footer = () => {

    const { cart_product_count, wishlist_count } = useSelector(state => state.cart)
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const currentYear = new Date().getFullYear()

    const [email, setEmail] = useState('');
    const dispatch = useDispatch()
    const { loading, error, success, message } = useSelector((state) => state.subscription);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            dispatch(addSubscription(email));
        }
    };

    // Reset state after 3 seconds
    React.useEffect(() => {
        if (success) {
            toast.success(message || 'Subscribed successfully!');
            dispatch(resetSubscriptionState());
            setEmail('');
        }
        if (error) {
            toast.error(error || 'Subscription failed!');
            dispatch(resetSubscriptionState());
        }
    }, [success, error, message, dispatch]);


    return (
        <footer className='bg-[#F3F6Fa]'>
            <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6'>
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <div className='flex flex-col gap-3'>
                        <img className='w-[190px] h-[70x]' src={`${FRONTEND_URL}/images/logo.png`} alt="logo" />
                        <ul className='flex flex-col gap-2 text-slate-600'>
                            <li>Address : Kiambu , Ruiru</li>
                            <li>Phone : 0799703637</li>
                            <li>Email : support@dukamall.co.ke</li>
                        </ul>
                    </div>
                </div>
                <div className='w-5/12 lg:w-8/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                            <h2 className='font-bold text-lg mb-2'>Quick links</h2>
                            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                    <li>
                                        <Link to='/about'>About Us</Link>
                                    </li>
                                    <li>
                                        <Link to='/contact'>Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops'>Our Stocks</Link>
                                    </li>
                                    <li>
                                        <Link to='/blog'>Our Updates</Link>
                                    </li>
                                    <li>
                                        <Link to='/privacy-policy'>Privacy Policy</Link>
                                    </li>
                                </ul>
                                <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                    <li>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/my-wishlist'>My Wishlist</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/my-orders'>My Orders</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/chat'>Chat Seller</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/chage-password'>Change Password</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-4/12 lg:w-full lg:mt-6'>
                    <div className='w-full flex flex-col justify-start gap-5'>
                        <h2 className='font-bold text-lg mb-2'>Join Our Updates Channel</h2>
                        <span>Get Email updates about our latest and shop special offers</span>
                        <form onSubmit={handleSubmit} className='h-[50px] w-full bg-white border relative'>
                            <input type='email' placeholder='Enter your mail' value={email} className='h-full bg-transparent w-full px-3 outline-0' onChange={(e) => setEmail(e.target.value)} required />
                            <button type='submit' disabled={loading} className='h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm'>{loading ? 'subscribing...' : 'subscribe'}</button>
                        </form>
                        <ul className='flex justify-start items-center gap-3'>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaFacebookF /></a>
                            </li>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaInstagram /></a>
                            </li>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaXTwitter /></a>
                            </li>
                            <li>
                                <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaLinkedin /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center'>
                <span>Copyright ©{currentYear} All rights reserved | Website Developed by <a className='text-blue-500 underline' href="https://instagram.com/wayne_marwa.ke" target='_blank' rel='noopener noreferrer'>@Wayne_Marwa</a></span>
            </div>

            <div className='hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2 bg-white rounded-full p-2'>
                <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
                    <div onClick={() => navigate(userInfo ? '/cart' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                        <span className='text-xl text-orange-500'><AiFillShopping /></span>
                        {
                            cart_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                {
                                    cart_product_count
                                }
                            </div>
                        }
                    </div>
                    <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                        <span className='text-xl text-red-500'><AiFillHeart /></span>
                        {
                            wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                {wishlist_count}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer