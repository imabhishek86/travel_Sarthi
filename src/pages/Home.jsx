import React from 'react';
import { Link } from 'react-router-dom';
import FadeUp from '../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer';
import hotelsData from '../data/hotels.json';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Placeholder for background image */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-900/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed opacity-60"></div>
        
        <FadeUp className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            Discover the World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">TravelSaarthi</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md">
            Your personalized smart tourism platform. Experience breathtaking destinations, luxury stays, and unforgettable adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(170,59,255,0.4)] hover:shadow-[0_0_30px_rgba(170,59,255,0.6)] transform hover:-translate-y-1">
              Explore Packages
            </Link>
            <Link to="/destinations" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg transition-all transform hover:-translate-y-1">
              Popular Destinations
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Search/Filter Bar - Floating */}
      <section className="max-w-6xl mx-auto -mt-16 relative z-30 px-4">
        <FadeUp className="glass-effect dark:bg-gray-900/80 dark:border-gray-700 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination</label>
            <input type="text" placeholder="Where do you want to go?" className="w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-3 bg-white dark:bg-gray-800 dark:text-white" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check In</label>
            <input type="date" className="w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-3 bg-white dark:bg-gray-800 dark:text-white" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check Out</label>
            <input type="date" className="w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-3 bg-white dark:bg-gray-800 dark:text-white" />
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors h-[50px]">
            Search
          </button>
        </FadeUp>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">Popular Destinations</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Explore our curated list of the most sought-after travel destinations around the globe.</p>
          </FadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Destination Card 1 */}
            <StaggerItem className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-96 relative">
              <img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rome" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Rome, Italy</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Experience ancient history and stunning architecture.</p>
              </div>
            </StaggerItem>

            {/* Destination Card 2 */}
            <StaggerItem className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-96 relative">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dubai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Dubai, UAE</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Modern luxury meets traditional desert culture.</p>
              </div>
            </StaggerItem>

            {/* Destination Card 3 */}
            <StaggerItem className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-96 relative">
              <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tokyo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Tokyo, Japan</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">A vibrant mix of traditional temples and neon-lit streets.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">Featured Hotels</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">Discover handpicked luxury accommodations for your perfect stay.</p>
            </div>
            <Link to="/hotels" className="hidden md:flex items-center text-primary font-medium hover:text-primary-hover">
              View All Hotels <span className="ml-2">→</span>
            </Link>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {hotelsData.slice(0, 4).map((hotel) => (
              <StaggerItem key={hotel.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1 z-10 text-dark dark:text-white">
                    ⭐ {hotel.rating}
                  </div>
                  <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-semibold">{hotel.type}</div>
                  <h3 className="text-lg font-bold text-dark dark:text-white mb-2 line-clamp-1" title={hotel.name}>{hotel.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">📍 {hotel.city}, {hotel.location}</p>
                  <div className="mt-auto flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="font-bold text-lg text-dark dark:text-white">${hotel.price}<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/night</span></div>
                    <button className="text-primary font-medium text-sm hover:underline">Book Now</button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/hotels" className="inline-flex items-center text-primary font-medium px-6 py-3 border border-primary/20 rounded-full hover:bg-primary/5">
              View All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0"></div>
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white to-transparent mix-blend-overlay"></div>
        
        <FadeUp className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready for your next adventure?</h2>
          <p className="text-xl text-white/80 mb-10">Join thousands of travelers who use TravelSaarthi to discover and book their dream vacations.</p>
          <Link to="/register" className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            Start Planning Now
          </Link>
        </FadeUp>
      </section>
    </div>
  );
};

export default Home;
