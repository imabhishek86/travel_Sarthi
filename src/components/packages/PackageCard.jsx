import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
  const [isFavorite, setIsFavorite] = useState(pkg.isFavorite);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
      {/* Image Container */}
      <div className="h-64 overflow-hidden relative">
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm z-10 uppercase tracking-wide">
          {pkg.category}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2"
            className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        <Link to={`/packages/${pkg.id}`} className="block w-full h-full">
          <img 
            src={pkg.imageUrl} 
            alt={pkg.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          {/* Duration overlay */}
          <div className="absolute bottom-4 left-4 text-white flex items-center gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {pkg.duration}
          </div>
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {pkg.destination}
          </p>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-dark dark:text-white">
            <span className="text-yellow-400">⭐</span> {pkg.rating}
          </div>
        </div>
        
        <Link to={`/packages/${pkg.id}`} className="block">
          <h3 className="text-xl font-bold text-dark dark:text-white mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary transition-colors leading-tight">
            {pkg.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {pkg.shortDescription}
        </p>

        {/* Included features mini-icons */}
        <div className="flex items-center gap-3 mb-5 border-y border-gray-100 dark:border-gray-800 py-3">
          {pkg.includes.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
               ✓ {item.split(' ')[0]}
            </div>
          ))}
          {pkg.includes.length > 3 && (
            <span className="text-xs text-primary font-medium">+{pkg.includes.length - 3} more</span>
          )}
        </div>
        
        {/* Footer/Price */}
        <div className="mt-auto flex justify-between items-end">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5 uppercase tracking-wider font-semibold">Price per person</span>
            <div className="font-extrabold text-2xl text-dark dark:text-white">
              ${pkg.price}
            </div>
          </div>
          <Link to={`/packages/${pkg.id}`} className="bg-primary/10 text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transform hover:-translate-y-0.5 transition-all">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
