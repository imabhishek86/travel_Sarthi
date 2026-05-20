import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Navigation, ChevronRight, Search, Compass, Mountain, Waves, Landmark, TreePine, Plane, Bus, Car, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { destinationService } from '../services/destination.service';
import { paymentService } from '../services/payment.service';
import { useAuth } from '../context/AuthContext';
import RazorpayPayment from '../components/RazorpayPayment';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Beach', 'Mountain', 'Heritage', 'Nature', 'Adventure'];
const CAT_ICONS = { All: Compass, Beach: Waves, Mountain: Mountain, Heritage: Landmark, Nature: TreePine, Adventure: Navigation };

const TRANSPORT_OPTIONS = [
  { type: 'flight', icon: Plane, label: 'Flight', basePrice: 4500, desc: 'Fastest way to reach' },
  { type: 'bus', icon: Bus, label: 'Bus', basePrice: 800, desc: 'Budget-friendly option' },
  { type: 'taxi', icon: Car, label: 'Taxi', basePrice: 2500, desc: 'Door-to-door comfort' },
];

const ExploreDestinations = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Transport booking state
  const [bookingModal, setBookingModal] = useState(null); // { destination, transportType }
  const [travelDate, setTravelDate] = useState('');
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, [activeCategory, searchQuery]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeCategory !== 'All') params.category = activeCategory;
      if (searchQuery) params.search = searchQuery;
      const { data } = await destinationService.getAll(params);
      setLocations(data || []);
    } catch (err) {
      console.error('Failed to fetch destinations', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTransport = (destination, transport) => {
    if (!user) {
      toast.error('Please login to book transport');
      return;
    }
    setBookingModal({ destination, transport });
    setTravelDate('');
  };

  const handleProceedToPayment = () => {
    if (!travelDate) {
      toast.error('Please select a travel date');
      return;
    }
    const amount = bookingModal.transport.basePrice;
    setBookingData({
      destination_id: bookingModal.destination.id,
      booking_type: 'transport',
      transport_type: bookingModal.transport.type,
      transport_details: `${bookingModal.transport.label} to ${bookingModal.destination.name}`,
      start_date: travelDate,
      end_date: travelDate,
      total_amount: amount,
    });
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    setShowRazorpay(false);
    try {
      await paymentService.verifyPayment({
        ...bookingData,
        payment_id: paymentData.paymentId,
        order_id: paymentData.orderId || 'order_demo',
        payment_method: paymentData.method,
      });
      toast.success('Transport booked successfully!');
      setBookingModal(null);
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    }
  };

  const bg = isDarkMode ? 'bg-gray-950' : 'bg-gray-50';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100';
  const text = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const input = isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400';

  return (
    <div className={`min-h-screen ${bg} pb-20 pt-6`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className={`text-3xl sm:text-4xl font-extrabold ${text} mb-2`}>Explore Destinations</h1>
          <p className={`${textSub} max-w-lg mx-auto`}>Discover incredible places, nearby attractions, and book transport across India</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSub}`} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search destinations..."
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl ${input} border font-medium text-sm focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] outline-none transition`} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => {
              const Icon = CAT_ICONS[cat];
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#FF385C] text-white shadow-md' : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Icon className="w-4 h-4" /> {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#FF385C]"></span>
          </div>
        ) : (
          <>
            {/* Locations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {locations.map(loc => (
                <div key={loc.id} onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                  className={`${card} border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group ${selectedLocation?.id === loc.id ? 'ring-2 ring-[#FF385C] shadow-xl' : ''}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {loc.rating}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-white text-xl font-extrabold">{loc.name}</h3>
                      <p className="text-white/80 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {loc.state}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={`text-sm ${textSub} mb-3 line-clamp-2`}>{loc.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        <Clock className="inline w-3 h-3 mr-1" />{loc.best_time}
                      </span>
                      <span className="text-xs font-bold text-[#FF385C] flex items-center gap-1">
                        {(loc.attractions || []).length} Attractions <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {locations.length === 0 && (
              <div className={`text-center py-16 ${card} border rounded-2xl`}>
                <Compass className={`w-12 h-12 mx-auto mb-3 ${textSub}`} />
                <p className={`${text} font-bold text-lg`}>No destinations found</p>
                <p className={textSub}>Try changing your filters or search term</p>
              </div>
            )}

            {/* Selected Location: Attractions + Transport Booking */}
            {selectedLocation && (
              <div className="space-y-6 mb-10">
                {/* Attractions */}
                <div className={`${card} border rounded-2xl p-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className={`text-2xl font-extrabold ${text}`}>Nearby Attractions in {selectedLocation.name}</h2>
                      <p className={`${textSub} text-sm`}>Top places to visit</p>
                    </div>
                    <Link to="/trip-planner" className="hidden sm:flex items-center gap-1 text-sm font-bold text-[#FF385C] hover:underline">
                      Plan Trip <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(selectedLocation.attractions || []).map((attr, i) => (
                      <div key={i} className={`rounded-xl overflow-hidden border transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="h-32 overflow-hidden">
                          <img src={attr.img} alt={attr.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <h4 className={`font-bold text-sm ${text} mb-1`}>{attr.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${textSub} flex items-center gap-1`}><Navigation className="w-3 h-3" /> {attr.distance}</span>
                            <span className="text-xs font-bold flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-amber-500" /> {attr.rating}</span>
                          </div>
                          <span className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>{attr.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transport Booking */}
                <div className={`${card} border rounded-2xl p-6`}>
                  <h2 className={`text-xl font-extrabold ${text} mb-2`}>🚀 Book Transport to {selectedLocation.name}</h2>
                  <p className={`${textSub} text-sm mb-5`}>Choose your preferred mode of travel</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {TRANSPORT_OPTIONS.map(t => {
                      const Icon = t.icon;
                      return (
                        <div key={t.type} className={`rounded-xl border p-5 transition-all hover:shadow-lg cursor-pointer group ${isDarkMode ? 'bg-gray-800/50 border-gray-700 hover:border-[#FF385C]' : 'bg-gray-50 border-gray-200 hover:border-[#FF385C]'}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#FF385C]/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-[#FF385C]" />
                            </div>
                            <div>
                              <p className={`font-bold ${text}`}>{t.label}</p>
                              <p className={`text-xs ${textSub}`}>{t.desc}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-extrabold text-[#FF385C]">₹{t.basePrice.toLocaleString('en-IN')}</p>
                            <button onClick={(e) => { e.stopPropagation(); handleBookTransport(selectedLocation, t); }}
                              className="bg-[#FF385C] hover:bg-[#D70466] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">
                              Book Now
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Transport Booking Modal */}
      {bookingModal && !showRazorpay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center" onClick={() => setBookingModal(null)}>
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-bold ${text}`}>Book {bookingModal.transport.label}</h3>
              <button onClick={() => setBookingModal(null)} className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className={`rounded-xl p-4 mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-sm ${textSub}`}>Destination</p>
              <p className={`font-bold ${text}`}>{bookingModal.destination.name}, {bookingModal.destination.state}</p>
              <p className={`text-sm ${textSub} mt-2`}>Transport</p>
              <p className={`font-bold ${text}`}>{bookingModal.transport.label} — ₹{bookingModal.transport.basePrice.toLocaleString('en-IN')}</p>
            </div>
            <div className="mb-5">
              <label className={`block text-sm font-bold ${text} mb-1.5`}>Travel Date</label>
              <input type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-900'} border font-medium focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] outline-none transition`} />
            </div>
            <button onClick={handleProceedToPayment}
              className="w-full bg-[#FF385C] hover:bg-[#D70466] text-white font-bold py-3.5 rounded-xl transition shadow-lg text-base">
              💳 Pay ₹{bookingModal.transport.basePrice.toLocaleString('en-IN')} with Razorpay
            </button>
          </div>
        </div>
      )}

      {/* Razorpay Payment */}
      {showRazorpay && bookingData && (
        <RazorpayPayment
          amount={bookingData.total_amount}
          packageName={bookingData.transport_details}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowRazorpay(false)}
        />
      )}
    </div>
  );
};

export default ExploreDestinations;
