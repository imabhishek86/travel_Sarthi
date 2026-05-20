import React, { useState, useEffect, useMemo } from 'react';
import HotelCard from '../components/HotelCard';
import HotelFilter from '../components/HotelFilter';
import SkeletonCard from '../components/SkeletonCard';
import { hotelService } from '../services/hotel.service';
import FadeUp from '../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer';
import { useTheme } from '../context/ThemeContext';

const Hotels = () => {
  const { isDarkMode } = useTheme();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended'); // recommended, priceLow, priceHigh, topRated
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    priceRange: 1000,
    types: [],
    ratings: []
  });

  // Fetch Hotels from API
  const fetchHotels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await hotelService.getAll();
      // Map backend fields to frontend expectations if necessary
      // For instance: price_per_night -> price
      const mappedHotels = response.data.map(hotel => ({
        ...hotel,
        price: hotel.price_per_night || hotel.price,
        id: hotel._id || hotel.id // Handle MongoDB ObjectId
      }));
      setHotels(mappedHotels);
    } catch (err) {
      console.error('Failed to fetch hotels:', err);
      setError('We encountered an error while fetching the hotels. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter and Sort Logic
  const filteredAndSortedHotels = useMemo(() => {
    let result = hotels;

    // 1. Search Query (Name, City, Location)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(hotel => 
        hotel.name.toLowerCase().includes(query) ||
        hotel.city.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query)
      );
    }

    // 2. Price Filter
    result = result.filter(hotel => hotel.price <= filters.priceRange);

    // 3. Type Filter
    if (filters.types.length > 0) {
      result = result.filter(hotel => filters.types.includes(hotel.type));
    }

    // 4. Rating Filter
    if (filters.ratings.length > 0) {
      // If user selected '4', it means 4 and up (4 to 4.9)
      const minSelectedRating = Math.min(...filters.ratings);
      result = result.filter(hotel => Math.floor(hotel.rating) >= minSelectedRating);
    }

    // 5. Sorting
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'topRated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recommended':
      default:
        // Default order from JSON
        break;
    }

    return result;
  }, [hotels, searchQuery, filters, sortBy]);

  return (
    <div className={`min-h-screen pb-20 pt-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Top Banner */}
      <div className={`py-12 px-4 border-b shadow-sm ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-100'}`}>
        <FadeUp className="max-w-7xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Find Your Perfect Stay</h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Discover luxury resorts, cozy villas, and boutique stays in top destinations around the world.
          </p>
          
          {/* Main Search Bar */}
          <div className={`max-w-3xl mx-auto relative group shadow-xl rounded-full border ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#FF385C]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by hotel name, city, or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-14 pr-6 py-4 rounded-full border-0 outline-none bg-transparent text-lg font-medium ${isDarkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
            />
          </div>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Toolbar: Mobile Filter Toggle & Sorting */}
        <div className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-2xl shadow-sm border mb-8 gap-4 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className={`lg:hidden flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filters
          </button>

          <div className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing <span className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{filteredAndSortedHotels.length}</span> properties
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className={`text-sm font-medium whitespace-nowrap ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full sm:w-auto border text-sm font-semibold rounded-xl focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] block p-2.5 outline-none cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
            >
              <option value="recommended">Recommended</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="topRated">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-1/4 flex-shrink-0">
            <div className="sticky top-28">
              <HotelFilter filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsMobileFilterOpen(false)}
              ></div>
              <div className={`relative w-4/5 max-w-sm h-full transform transition-transform ease-in-out duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}>
                <HotelFilter 
                  filters={filters} 
                  setFilters={setFilters} 
                  onClose={() => setIsMobileFilterOpen(false)} 
                />
              </div>
            </div>
          )}

          {/* Main Content: Grid */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : error ? (
              <FadeUp className="bg-red-50 rounded-2xl border border-red-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-800 mb-2">Something went wrong</h3>
                <p className="text-red-600 max-w-md mx-auto mb-6 font-medium">
                  {error}
                </p>
                <button 
                  onClick={fetchHotels}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                >
                  Try Again
                </button>
              </FadeUp>
            ) : filteredAndSortedHotels.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedHotels.map(hotel => (
                  <StaggerItem key={hotel.id}>
                    <HotelCard hotel={hotel} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              /* Empty State */
              <FadeUp className="bg-white rounded-2xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-sm">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6 font-medium">
                  We couldn't find any properties matching your current search and filter criteria. Try adjusting your filters or search query.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ priceRange: 1000, types: [], ratings: [] });
                  }}
                  className="px-6 py-3 bg-[#FF385C]/10 text-[#FF385C] font-bold rounded-xl hover:bg-[#FF385C]/20 transition-colors shadow-sm"
                >
                  Clear all filters
                </button>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
