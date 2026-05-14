import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Left Column - Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center transition-transform duration-[20s] hover:scale-110 opacity-90 dark:opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/10 dark:from-dark dark:via-dark/60"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <Link to="/" className="text-3xl font-bold text-white flex items-center gap-3 w-fit transform hover:scale-105 transition-transform">
            <span className="text-4xl">✈️</span> TravelSaarthi
          </Link>
          
          <div className="mb-12">
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Begin Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Great Adventure</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-md">
              Join thousands of travelers who use our smart platform to discover, plan, and book their dream vacations effortlessly.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-dark" 
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="User avatar" 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Join <span className="text-white font-semibold">10,000+</span> users
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile background overlay */}
        <div className="lg:hidden absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-3xl font-bold text-dark dark:text-white flex items-center justify-center gap-2">
              <span className="text-4xl">✈️</span> TravelSaarthi
            </Link>
          </div>
          
          {/* Outlet for Login/Register forms */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
