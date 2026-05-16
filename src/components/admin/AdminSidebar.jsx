import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊', exact: true },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Hotels', path: '/admin/hotels', icon: '🏨' },
    { name: 'Packages', path: '/admin/packages', icon: '🗺️' },
    { name: 'Bookings', path: '/admin/bookings', icon: '📅' },
    { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm w-64 lg:w-72 transition-colors duration-300">
      {/* Brand */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
        <Link to="/" className="text-2xl font-black text-[#FF385C] flex items-center gap-2 tracking-tight">
          <span className="text-3xl">✈️</span> <span className="hidden sm:block">Admin Panel</span>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Admin Profile Mini */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#FF385C]/20 text-[#FF385C] flex items-center justify-center font-bold text-xl border-2 border-[#FF385C]/30 shadow-sm">
          A
        </div>
        <div>
          <h3 className="font-bold text-gray-900 truncate">Super Admin</h3>
          <p className="text-xs text-gray-500 font-medium truncate">admin@travelsaarthi.com</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 font-semibold">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#FF385C] text-white shadow-md font-bold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#FF385C]'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
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
      <div className="hidden lg:block h-full z-20">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          ></div>
          <div className="relative w-64 sm:w-72 h-full bg-white transform transition-transform ease-in-out duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
