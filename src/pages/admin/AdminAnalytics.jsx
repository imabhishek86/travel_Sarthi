import React from 'react';
import FadeUp from '../../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../../components/common/StaggerContainer';
import adminData from '../../data/adminData.json';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#AA3BFF', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const AdminAnalytics = () => {
  const { analytics } = adminData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 font-semibold text-gray-900">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {entry.name.toLowerCase().includes('revenue') ? '$' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <FadeUp>
        <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Analytics Dashboard</h1>
        <p className="text-gray-500 text-sm font-medium">In-depth performance metrics and trends.</p>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend - Area Chart */}
        <FadeUp className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6 font-semibold">
            <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-2.5 py-1 outline-none text-gray-700 font-semibold focus:ring-2 focus:ring-[#FF385C]/20">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF385C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF385C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#FF385C" strokeWidth={3} fillOpacity={1} fill="url(#colorRevFull)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FadeUp>

        {/* User Growth - Line Chart */}
        <FadeUp className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">User Acquisition</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.userGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="users" name="New Users" stroke="#00C49F" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FadeUp>

        {/* Popular Destinations - Bar Chart */}
        <FadeUp className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top Destinations by Bookings</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.destinations} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 12, fontWeight: 'bold' }} width={80} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" name="Bookings" fill="#FF385C" radius={[0, 4, 4, 0]} barSize={30}>
                  {analytics.destinations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default AdminAnalytics;
