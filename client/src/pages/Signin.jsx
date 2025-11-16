import React from 'react';

const Signin = () => {
  return (
    <div className="p-8 max-w-md mx-auto mt-20 bg-white rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Admin Sign In</h2>
      <p className="text-center text-gray-600 mb-4">
        This is a placeholder for the authentication form.
      </p>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="admin@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="password" />
        </div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;