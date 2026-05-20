import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HotelFilter = ({ filters, setFilters, onClose }) => {
  const { isDarkMode } = useTheme();

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, priceRange: Number(e.target.value) }));
  };

  const handleTypeChange = (type) => {
    setFilters(prev => {
      const types = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      return { ...prev, types };
    });
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => {
      const ratings = prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating];
      return { ...prev, ratings };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: 1000,
      types: [],
      ratings: []
    });
  };

  return (
    <div className={`p-6 rounded-3xl border shadow-sm h-full overflow-y-auto ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Filters</h2>
        <div className="flex items-center gap-2">
          <button onClick={clearFilters} className="text-sm text-[#FF385C] hover:underline font-bold">
            Clear All
          </button>
          {onClose && (
            <button onClick={onClose} className={`lg:hidden p-1 rounded-md ${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Price per night</h3>
        <input 
          type="range" 
          min="0" 
          max="1000" 
          step="50"
          value={filters.priceRange} 
          onChange={handlePriceChange}
          className="w-full accent-[#FF385C]"
        />
        <div className="flex justify-between text-sm font-medium mt-2">
          <span className="text-gray-500">$0</span>
          <span className="font-bold text-[#FF385C]">Up to ${filters.priceRange}</span>
        </div>
      </div>

      {/* Hotel Type */}
      <div className="mb-8">
        <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Property Type</h3>
        <div className="space-y-3">
          {['Luxury', 'Budget', 'Resort', 'Villa'].map(type => (
            <label key={type} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C] cursor-pointer"
              />
              <span className={`ml-3 font-semibold transition-colors ${isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-8">
        <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Star Rating</h3>
        <div className="space-y-3">
          {[5, 4, 3].map(rating => (
            <label key={rating} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.ratings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C] cursor-pointer"
              />
              <span className={`ml-3 flex items-center font-semibold transition-colors ${isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                {rating} <span className="text-yellow-400 ml-1">⭐</span> & Up
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="w-full py-3.5 bg-[#FF385C] text-white rounded-2xl font-bold hover:bg-[#D70466] shadow-md lg:hidden"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};

export default HotelFilter;
