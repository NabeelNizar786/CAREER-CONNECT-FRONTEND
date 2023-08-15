import React from 'react';


function ErrorMessage({ error }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">SOMETHING WENT WRONG!!</h1>
        <p className="text-gray-700">{error.message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;

