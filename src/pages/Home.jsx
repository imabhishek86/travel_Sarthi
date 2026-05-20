import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FadeUp from '../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer';
import { Heart, Star } from 'lucide-react';
import { hotelService } from '../services/hotel.service';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Stays');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelService.getAll();
        setHotels(response.data || []);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const categories = [
    'All Stays',
    'Beachfront',
    'Amazing Pools',
    'Luxury Villas',
    'Historic Castles',
    'Cozy Cabins',
    'Countryside',
    'Trending'
  ];

  const filteredHotels = useMemo(() => {
    if (activeCategory === 'All Stays') return hotels;
    return hotels.filter(h => {
      const type = (h.type || '').toLowerCase();
      const cat = activeCategory.toLowerCase();
      if (cat.includes('pool') && (h.amenities || []).some(a => a.toLowerCase().includes('pool'))) return true;
      if (cat.includes('beach') && type.includes('resort')) return true;
      if (cat.includes('villa') && type.includes('villa')) return true;
      if (cat.includes('castle') && h.name.toLowerCase().includes('castle')) return true;
      return type.includes(cat) || (h.amenities || []).some(a => a.toLowerCase().includes(cat));
    });
  }, [hotels, activeCategory]);

  const displayHotels = filteredHotels.length > 0 ? filteredHotels : hotels;

  return (
    <div className={`w-full min-h-screen pb-20 pt-24 ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}>
      
      {/* Categories Header - Clean without icons */}
      <div className={`w-full border-b sticky top-20 z-30 pt-4 pb-4 shadow-sm ${isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all shadow-sm ${
                activeCategory === cat 
                  ? 'bg-[#FF385C] text-white ring-2 ring-[#FF385C]/30 shadow-md transform scale-105' 
                  : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <span className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#FF385C]"></span>
          </div>
        ) : hotels.length === 0 ? (
          <div className={`text-center py-32 rounded-3xl border mt-4 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>No properties found</h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>There are no destinations added by the admin yet.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {displayHotels.map((hotel) => (
              <StaggerItem 
                key={hotel.id || hotel._id} 
                onClick={() => navigate(`/hotels/${hotel.id || hotel._id}`)}
                className="group cursor-pointer flex flex-col"
              >
                <div className={`relative aspect-square w-full rounded-2xl overflow-hidden mb-3 border shadow-sm group-hover:shadow-xl transition-all duration-500 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-100'}`}>
                  <img 
                    src={hotel.image || hotel.imageUrl || 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success('Added to wishlists!');
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-md transition-transform active:scale-95 z-10"
                  >
                    <Heart className="w-5 h-5 text-gray-700 hover:text-[#FF385C] hover:fill-[#FF385C] transition-colors" />
                  </button>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md text-xs font-extrabold text-gray-900 flex items-center gap-1 z-10">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{hotel.rating || '4.9'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pt-1">
                  <div className="flex-1 pr-2">
                    <h3 className={`text-base font-bold leading-snug truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {hotel.city}, {hotel.location || hotel.country}
                    </h3>
                    <p className={`text-sm mt-0.5 truncate font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{hotel.name}</p>
                    <p className={`text-sm mt-0.5 font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Added recently</p>
                    
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-base font-extrabold text-[#FF385C]">${hotel.price || hotel.price_per_night}</span>
                      <span className="text-sm font-medium text-gray-600">night</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
        
        {!loading && hotels.length > 0 && (
          <div className="mt-20 mb-12 text-center">
            <p className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Continue exploring amazing stays</p>
            <button className={`px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg ${isDarkMode ? 'bg-gray-100 text-gray-900 hover:bg-white' : 'bg-gray-900 text-white hover:bg-black'}`}>
              Show more
            </button>
          </div>
        )}
      </main>

    </div>
  );
};

export default Home;
