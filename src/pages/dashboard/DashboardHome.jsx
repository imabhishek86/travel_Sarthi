import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import BookingCard from '../../components/dashboard/BookingCard';
import dashboardData from '../../data/dashboardData.json';
import FadeUp from '../../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../../components/common/StaggerContainer';

const DashboardHome = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setData(dashboardData);
    }, 500);
  }, []);

  if (!data) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
          <div className="w-full lg:w-1/3 h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  const { stats, activities, bookings } = data;
  const upcomingBooking = bookings.find(b => b.status === 'Upcoming');

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StaggerItem><StatsCard title="Total Bookings" value={stats.totalBookings} icon="🎫" colorClass="text-blue-500 bg-blue-50 dark:bg-blue-900/20" /></StaggerItem>
        <StaggerItem><StatsCard title="Upcoming Trips" value={stats.upcomingTrips} icon="✈️" colorClass="text-primary bg-primary/10 dark:bg-primary/20" /></StaggerItem>
        <StaggerItem><StatsCard title="Favorite Hotels" value={stats.favoriteHotels} icon="🏨" colorClass="text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" /></StaggerItem>
        <StaggerItem><StatsCard title="Saved Packages" value={stats.savedPackages} icon="❤️" colorClass="text-red-500 bg-red-50 dark:bg-red-900/20" /></StaggerItem>
      </StaggerContainer>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          {/* Next Trip Highlight */}
          <FadeUp className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Your Next Adventure</h3>
            {upcomingBooking ? (
              <BookingCard booking={upcomingBooking} />
            ) : (
              <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">No upcoming trips planned yet.</p>
              </div>
            )}
          </FadeUp>

          {/* Promotional Banner inside Dashboard */}
          <FadeUp delay={0.2} className="bg-gradient-to-r from-dark to-primary rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-md">
              <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block backdrop-blur-sm border border-white/30">SPECIAL OFFER</span>
              <h2 className="text-3xl font-extrabold mb-3">Get 20% off your next Luxury Hotel!</h2>
              <p className="text-white/80 mb-6">Exclusive deal for our registered members. Valid until the end of the month.</p>
              <button className="bg-white text-dark font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-md">
                Claim Offer
              </button>
            </div>
          </FadeUp>

        </div>

        {/* Right Column */}
        <FadeUp delay={0.3} className="w-full lg:w-1/3">
          <ActivityTimeline activities={activities} />
        </FadeUp>
      </div>
    </div>
  );
};

export default DashboardHome;
