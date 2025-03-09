
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <h1 className="text-9xl font-bold text-red-500 animate-bounce">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-400">The page you are looking for might have been removed or doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;