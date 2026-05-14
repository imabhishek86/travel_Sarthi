import React, { useState, useEffect } from 'react';
import HotelCard from '../../components/HotelCard';
import PackageCard from '../../components/packages/PackageCard';
import FadeUp from '../../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../../components/common/StaggerContainer';

// Reusing dummy data from existing files for demonstration
import hotelData from '../../data/hotels.json';
import packageData from '../../data/packages.json';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('Hotels');
  const [isLoading, setIsLoading] = useState(true);

  // Take the first 3 items as "favorites" for demonstration
  const favoriteHotels = hotelData.slice(0, 3);
  const favoritePackages = packageData.slice(0, 3);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [activeTab]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-dark dark:text-white">Saved Favorites</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Properties and packages you've saved for later.</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl flex items-center shadow-inner">
          <button
            onClick={() => setActiveTab('Hotels')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'Hotels' 
                ? 'bg-white dark:bg-gray-800 text-dark dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white'
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => setActiveTab('Packages')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'Packages' 
                ? 'bg-white dark:bg-gray-800 text-dark dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white'
            }`}
          >
            Packages
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>)}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'Hotels' && favoriteHotels.map(hotel => (
            <StaggerItem key={hotel.id} className="relative group">
               <HotelCard hotel={hotel} />
               <button className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md opacity-0 group-hover:opacity-100" title="Remove from favorites">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
               </button>
            </StaggerItem>
          ))}

          {activeTab === 'Packages' && favoritePackages.map(pkg => (
            <StaggerItem key={pkg.id} className="relative group">
               <PackageCard pkg={pkg} />
               <button className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md opacity-0 group-hover:opacity-100" title="Remove from favorites">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
               </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
};

export default Favorites;
