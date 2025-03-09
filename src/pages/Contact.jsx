
import React, { useState } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdContactSupport, MdOutgoingMail, MdOutlineKeyboardArrowRight, MdOutlineRequestQuote, MdOutlineWarningAmber } from 'react-icons/md';
import { FcMoneyTransfer } from "react-icons/fc";
import { RiRefund2Line } from "react-icons/ri";
import logo from '../assets/logo.png'
import { FaPhone } from 'react-icons/fa6';
import Map from '../components/Map';

const Contact = () => {
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Welcome to Duka Mall Help Center! How can I assist you today?',
        },
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        setInput(''); // Clear input field

        try {
            const response = await axios.post(`https://dukamall-backend.onrender.com/api/helpcenter/chat`, {
                message: input,
            });
            const botMessage = { sender: 'bot', text: response.data.reply || 'No response' };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error fetching bot reply:', error);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'Something went wrong. Please try again later.' },
            ]);
        }
    };

    return (
        <div>
            <Headers />
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
                                <span>Help Center</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-indigo-600">
                    <div className="mx-auto flex-grow px-4 py-8 w-[85%] md:w-full">
                        <div className="grid md:grid-cols-1 grid-cols-2 items-center justify-center">
                            {/* Live Chat Box */}
                            <div className="w-full bg-white shadow-md rounded-md p-6">
                                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Live Chat</h2>
                                <div className="border bg-gray-50 shadow-inner rounded-md p-4 max-h-full overflow-y-auto">
                                    {messages.map((message, index) => (
                                        <div
                                            key={`${message.sender}-${index}`}
                                            className={`mb-3 p-3 rounded-md ${message.sender === 'user'
                                                ? 'bg-blue-100 text-right'
                                                : 'bg-gray-200 text-left'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                                    <input
                                        type="text"
                                        className="w-full sm:flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Type your message..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    />
                                    <button
                                        className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                                        onClick={handleSend}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 items-center md:mt-6 md:mx-0 mx-4 w-full p-6'>
                                <div className='bg-white p-3 rounded-md shadow-md w-full'>
                                    <div className='flex items-center text-red-600 text-xl font-semibold mb-2'>
                                        <MdOutlineWarningAmber className='text-2xl mr-2' />
                                        <span className='capitalize'>Safety Tips</span>
                                    </div>
                                    <div className='grid grid-cols-2 md:grid-cols-1'>
                                        <ul className=' list-disc pl-5 text-gray-700'>
                                            <li className='my-2'>Do not share personal information with sellers.</li>
                                            <li className='my-2'>Do not pay any seller Directly to his account.</li>
                                        </ul>
                                        <ul className=' list-disc pl-5 text-gray-700'>
                                            <li className='my-2'>Avoid clicking on suspicious links shared.</li>
                                            <li className='my-2'>Report any fraudulent activities immediately.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='bg-white p-3 rounded-md shadow-md w-full'>
                                    <div className='flex items-center text-blue-600 text-xl font-semibold mb-2'>
                                        <MdContactSupport className='text-2xl mr-2' />
                                        <span className='capitalize'>contact help center</span>
                                    </div>
                                    <div className='lowercase flex items-center text-xl'>
                                        <Link to='tel:254799703637' className='flex flex-row items-center gap-2 hover:underline ml-5'><FaPhone className='text-2xl text-red-400' />+(254) 799-703-637</Link>
                                    </div>
                                </div>
                                <div className='bg-white p-3 rounded-md shadow-md w-full'>
                                    <div className='flex items-center text-blue-600 text-xl font-semibold mb-2'>
                                        <MdContactSupport className='text-2xl mr-2' />
                                        <span className='capitalize'>contact orders</span>
                                    </div>
                                    <div className='lowercase flex items-center text-xl'>
                                        <Link to='mailto:orders@dukamall.co.ke' className='flex flex-row items-center gap-2 hover:underline ml-5'><MdOutlineRequestQuote className='text-3xl text-purple-400' />orders@dukamall.co.ke</Link>
                                    </div>
                                </div>
                                <div className='bg-white p-3 rounded-md shadow-md w-full'>
                                    <div className='flex items-center text-blue-600 text-xl font-semibold mb-2'>
                                        <MdContactSupport className='text-2xl mr-2' />
                                        <span className='capitalize'>contact support</span>
                                    </div>
                                    <div className='lowercase flex items-center text-xl'>
                                        <Link to='mailto:support@dukamall.co.ke' className='flex flex-row items-center gap-2 hover:underline ml-5'><MdOutgoingMail className='text-3xl text-blue-400' />support@dukamall.co.ke</Link>
                                    </div>
                                </div>
                                <div className='bg-white p-3 rounded-md shadow-md w-full'>
                                    <div className='flex items-center text-blue-600 text-xl font-semibold mb-2'>
                                        <MdContactSupport className='text-2xl mr-2' />
                                        <span className='capitalize'>contact payments</span>
                                    </div>
                                    <div className='lowercase flex items-center text-xl'>
                                        <Link to='mailto:payments@dukamall.co.ke' className='flex flex-row items-center gap-2 hover:underline ml-5'><FcMoneyTransfer className='text-3xl' />payments@dukamall.co.ke</Link>
                                    </div>
                                </div>
                                <div className='bg-white p-3 rounded-md shadow-md w-full'>
                                    <div className='flex items-center text-blue-600 text-xl font-semibold mb-2'>
                                        <MdContactSupport className='text-2xl mr-2' />
                                        <span className='capitalize'>contact refunds</span>
                                    </div>
                                    <div className='lowercase flex items-center text-xl'>
                                        <Link to='mailto:refunds@dukamall.co.ke' className='flex flex-row items-center gap-2 hover:underline ml-5'><RiRefund2Line className='text-3xl text-green-500' />refunds@dukamall.co.ke</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-10'>
                        <Map />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;
