import React from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaCheckCircle, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import { FRONTEND_URL } from '../utils/config';
import logo from '../assets/logo.png'

const About = () => {
    return (
        <div>
            <Headers />

            {/* Banner Section */}
            <section className='bg-[url("../public/images/banner/shop.gif")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <div className='h-[70px] flex justify-center items-center'>
                                <Link to='/' className='w-[180px] h-[50px]'>
                                    <img className='w-full h-full' src={logo} alt="" />
                                </Link>
                            </div>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                                <span>About</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Content Section */}
            <section className='py-10 px-6 md:px-5 lg:px-32 bg-gray-100'>
                <div className="max-w-7xl mx-auto flex flex-row md:flex-col gap-8 items-center">
                    <div className="flex-1 lg:w-1/2 md:w-full">
                        <h1 className="text-3xl font-bold mb-6">About Us</h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Welcome to <strong>Duka Mall</strong>, your one-stop solution for seamless online shopping. We connect
                            buyers and sellers, creating a thriving multivendor marketplace that empowers businesses and offers customers
                            an unparalleled shopping experience. Our platform is designed to bring together diverse vendors from around
                            the Country, offering a wide range of products and services at competitive prices.
                        </p>
                        <div>
                            <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
                            <p className='text-gray-600 leading-relaxed'>
                                Our mission is to revolutionize e-commerce by fostering collaboration among vendors and providing
                                shoppers with an intuitive, secure, and diverse online marketplace. We strive to promote sustainability,
                                inclusivity, and innovation in every aspect of our platform.
                            </p>
                            <div>
                                <h2 className='text-2xl font-semibold mb-4'>Our Vision</h2>
                                <p className='text-gray-600 leading-relaxed'>
                                    To become the Kenya's most trusted and preferred multivendor platform, where businesses of all sizes
                                    can thrive, and customers can find everything they need in one place. We aim to redefine online shopping
                                    by continuously evolving with the needs of our community.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 lg:w-1/2 md:w-full">
                        <img
                            src={`${FRONTEND_URL}/images/blog-1.jpg`}
                            alt="About Us"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className='py-10 bg-white'>
                <div className='max-w-7xl mx-auto px-6 md:px-5 lg:px-10'>
                    <h2 className='text-2xl font-semibold text-center mb-6'>Why Choose Us?</h2>
                    <div className='grid md:grid-cols-1 grid-cols-3 gap-8'>
                        <div className='text-center'>
                            <FaShieldAlt className='mx-auto mb-4 w-12 h-12 text-blue-500' />
                            <h3 className='text-xl font-semibold mb-2'>Trusted Marketplace</h3>
                            <p className='text-gray-600'>
                                We provide a secure and reliable platform where buyers and sellers can transact with confidence.
                            </p>
                        </div>

                        <div className='text-center'>
                            <FaHeadset className='mx-auto mb-4 w-12 h-12 text-green-500' />
                            <h3 className='text-xl font-semibold mb-2'>24/7 Support</h3>
                            <p className='text-gray-600'>
                                Our dedicated support team is available round-the-clock to assist you with any inquiries or issues.
                            </p>
                        </div>

                        <div className='text-center'>
                            <FaCheckCircle className='mx-auto mb-4 w-12 h-12 text-yellow-500' />
                            <h3 className='text-xl font-semibold mb-2'>Quality Assurance</h3>
                            <p className='text-gray-600'>
                                We ensure that all products and services meet the highest quality standards for our customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;
