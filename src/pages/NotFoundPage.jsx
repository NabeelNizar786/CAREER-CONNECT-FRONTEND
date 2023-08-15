import React from 'react'
import { Link } from 'react-router-dom'


function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">404</h1>
        <p className="text-gray-700">The page you're looking for was not found.</p>
        <Link to="/user/home" className="mt-4 text-blue-500 hover:underline">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
export default NotFoundPage