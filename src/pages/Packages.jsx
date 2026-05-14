import React, { useState, useEffect, useMemo } from 'react';
import PackageCard from '../components/packages/PackageCard';
import PackageFilter from '../components/packages/PackageFilter';
import SkeletonCard from '../components/SkeletonCard';
import PackageService from '../services/package.service';
import FadeUp from '../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    budget: 5000,
    categories: [],
    durations: []
  });

  const fetchPackages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await PackageService.getPackages();
      const mappedPackages = response.data.map(pkg => ({
        ...pkg,
        days: pkg.duration_days || pkg.days,
        id: pkg._id || pkg.id
      }));
      setPackages(mappedPackages);
    } catch (err) {
      console.error('Failed to fetch packages:', err);
      setError('We encountered an error while fetching the packages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const filteredAndSortedPackages = useMemo(() => {
    let result = packages;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(query) ||
        pkg.destination.toLowerCase().includes(query)
      );
    }

    result = result.filter(pkg => pkg.price <= filters.budget);

    if (filters.categories.length > 0) {
      result = result.filter(pkg => filters.categories.includes(pkg.category));
    }

    if (filters.durations.length > 0) {
      result = result.filter(pkg => {
        if (filters.durations.includes('short') && pkg.days >= 1 && pkg.days <= 3) return true;
        if (filters.durations.includes('medium') && pkg.days >= 4 && pkg.days <= 7) return true;
        if (filters.durations.includes('long') && pkg.days >= 8) return true;
        return false;
      });
    }

    switch (sortBy) {
      case 'priceLow': result.sort((a, b) => a.price - b.price); break;
      case 'priceHigh': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.popularity - a.popularity); break;
      default: break;
    }

    return result;
  }, [packages, searchQuery, filters, sortBy]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative bg-dark text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90"></div>
        <FadeUp className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Unforgettable Journeys</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Explore Our Packages</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Curated travel experiences designed to give you the perfect blend of adventure, relaxation, and cultural immersion.
          </p>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-0 focus:ring-4 focus:ring-primary/30 outline-none text-dark dark:text-white dark:bg-gray-800 text-lg shadow-2xl transition-all font-medium"
            />
          </div>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 mb-10 gap-4">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-white rounded-xl font-bold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filters
          </button>

          <div className="text-gray-500 dark:text-gray-400 font-medium">
            Found <span className="text-primary font-bold">{filteredAndSortedPackages.length}</span> packages
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-gray-600 dark:text-gray-400 font-bold whitespace-nowrap">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-dark dark:text-white font-medium rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block p-3 outline-none cursor-pointer transition-all"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <PackageFilter filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsMobileFilterOpen(false)}
              ></div>
              <div className="relative w-4/5 max-w-md bg-white h-full transform transition-transform ease-in-out duration-300">
                <PackageFilter 
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : error ? (
              <FadeUp className="bg-red-50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-800 p-16 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-600 dark:text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-red-800 dark:text-red-400 mb-3">Something went wrong</h3>
                <p className="text-red-600 dark:text-red-300 max-w-md mx-auto mb-8 text-lg">
                  {error}
                </p>
                <button 
                  onClick={fetchPackages}
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg"
                >
                  Try Again
                </button>
              </FadeUp>
            ) : filteredAndSortedPackages.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredAndSortedPackages.map(pkg => (
                  <StaggerItem key={pkg.id}>
                    <PackageCard pkg={pkg} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeUp className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-16 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-dark dark:text-white mb-3">No Packages Found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
                  We couldn't find any travel packages matching your search or filters. Try adjusting your preferences.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ budget: 5000, categories: [], durations: [] });
                  }}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg"
                >
                  Clear All Filters
                </button>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
