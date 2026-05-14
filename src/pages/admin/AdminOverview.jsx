import React from 'react';
import FadeUp from '../../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../../components/common/StaggerContainer';
import adminData from '../../data/adminData.json';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-dark dark:text-white">{value}</h3>
    </div>
  </div>
);

const AdminOverview = () => {
  const { stats, recentBookings, analytics } = adminData;

  return (
    <div className="space-y-6">
      <FadeUp>
        <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
      </FadeUp>

      {/* Stats Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <StatCard title="Total Users" value={stats.totalUsers} icon="👥" colorClass="bg-blue-500 text-blue-600 dark:text-blue-400" />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Total Bookings" value={stats.totalBookings} icon="📅" colorClass="bg-green-500 text-green-600 dark:text-green-400" />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Total Revenue" value={`$${(stats.revenue / 1000).toFixed(1)}k`} icon="💰" colorClass="bg-purple-500 text-purple-600 dark:text-purple-400" />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Active Listings" value={stats.totalHotels + stats.totalPackages} icon="🏨" colorClass="bg-orange-500 text-orange-600 dark:text-orange-400" />
        </StaggerItem>
      </StaggerContainer>

      {/* Mini Chart & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Mini Chart */}
        <FadeUp className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Revenue Trend</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.revenueData.slice(-6)}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#AA3BFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#AA3BFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#AA3BFF" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FadeUp>

        {/* Recent Bookings Table */}
        <FadeUp className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-dark dark:text-white">Recent Bookings</h3>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="py-3 px-6 font-medium">ID</th>
                  <th className="py-3 px-6 font-medium">User</th>
                  <th className="py-3 px-6 font-medium">Item</th>
                  <th className="py-3 px-6 font-medium">Amount</th>
                  <th className="py-3 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-dark dark:text-white">{booking.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{booking.user}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{booking.item}</td>
                    <td className="py-4 px-6 text-sm font-bold text-dark dark:text-white">${booking.amount}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        booking.status === 'Pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default AdminOverview;
