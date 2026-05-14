import React, { useState, useEffect } from 'react';
import BookingCard from '../../components/dashboard/BookingCard';
import dashboardData from '../../data/dashboardData.json';
import FadeUp from '../../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../../components/common/StaggerContainer';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBookings(dashboardData.bookings);
      setIsLoading(false);
    }, 600);
  }, []);

  const handleCancel = (id) => {
    // Simulate canceling a booking
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: 'Cancelled' } : booking
      )
    );
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-dark dark:text-white">My Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your upcoming trips and past reservations.</p>
        </div>
        
        {/* Custom Tabs */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 flex overflow-x-auto max-w-full no-scrollbar shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                filter === tab 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>)}
        </div>
      ) : filteredBookings.length > 0 ? (
        <StaggerContainer className="space-y-6">
          {filteredBookings.map(booking => (
            <StaggerItem key={booking.id}>
              <BookingCard 
                booking={booking} 
                onCancel={handleCancel} 
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeUp className="bg-white dark:bg-gray-900 p-12 rounded-3xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            🧳
          </div>
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-2">No Bookings Found</h3>
          <p className="text-gray-500 dark:text-gray-400">You don't have any {filter.toLowerCase()} bookings at the moment.</p>
        </FadeUp>
      )}
    </div>
  );
};

export default MyBookings;
