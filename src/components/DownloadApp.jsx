
import React from 'react';
import { FaApple } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { TfiAndroid } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import { FRONTEND_URL } from '../utils/config'

const DownloadAppSection = () => {
  return (
    <div className="flex lg:flex-row md:flex-col justify-center items-center gap-8 py-12 bg-gray-100">
      <div className="bg-purple-500 text-white rounded-lg p-8 flex flex-row md:flex-col justify-center items-center md:ml-0 ml-8 w-1/2 md:w-[90%] md:h-full h-[400px]">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2">Download our app</h2>
          <button className="bg-gray-800 text-purple-500 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 flex flex-row gap-2">
            <span className="text-white text-xl"><FaApple /></span>
            For iOS
          </button>
          <button className="bg-gray-800 text-purple-500 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 flex flex-row gap-2">
            <span className="text-green-500 text-xl"><TfiAndroid /></span>
            For Android
          </button>
        </div>
        <div className="md:mt-4 md:ml-0 ml-6">
          <img
            src={`${FRONTEND_URL}/images/app-coming-soon.png`}
            alt="App screenshot"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="bg-gray-800 text-white rounded-lg p-8 mr-8 md:mr-0 flex flex-col w-1/2 md:w-[90%] md:h-full h-[400px]">
        <h2 className="text-2xl md:text-xl font-bold mb-4">How to Sell in Duka Mall!</h2>
        <ul className="flex flex-col gap-3 text-lg">
          <li className="flex items-center gap-2">
            <span className="text-purple-500"><MdVerified /></span>
            <span>Register a seller account</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500"><MdVerified /></span>
            <span>Admin approves your account</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500"><MdVerified /></span>
            <span>List your products</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500"><MdVerified /></span>
            <span>Set competitive prices</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500"><MdVerified /></span>
            <span>Manage orders with ease</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500"><MdVerified /></span>
            <span>Reach more customers</span>
          </li>
        </ul>
        <Link to='mailto:support@dukamall.co.ke' className="mt-6 bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg max-w-fit shadow-md hover:bg-purple-600">
          Contact for more
        </Link>
      </div>
    </div>
  );
};

export default DownloadAppSection;
