import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import dashboardData from '../../data/dashboardData.json';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user } = dashboardData;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'My Bookings', path: '/dashboard/bookings', icon: 'M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z' },
    { name: 'Favorites', path: '/dashboard/favorites', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    { name: 'Profile', path: '/dashboard/profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm w-72 transition-colors duration-300">
      {/* Brand & Close button (mobile) */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
        <Link to="/" className="text-2xl font-extrabold text-[#FF385C] flex items-center gap-2 tracking-tight">
          <span className="text-3xl">✈️</span> <span className="hidden sm:block">TravelSaarthi</span>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* User Mini Profile */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#FF385C]/20 shadow-sm" />
        <div>
          <h3 className="font-bold text-gray-900 truncate w-40">{user.name}</h3>
          <p className="text-xs text-gray-500 font-medium truncate w-40">{user.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto font-semibold">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#FF385C] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#FF385C]'
              }`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 font-semibold">
        <Link 
          to="/login"
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40 w-72 h-screen">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          ></div>
          <div className="relative w-72 h-full bg-white transform transition-transform ease-in-out duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
