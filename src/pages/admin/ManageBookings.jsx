import React, { useState } from 'react';
import FadeUp from '../../components/common/FadeUp';
import adminData from '../../data/adminData.json';

const ManageBookings = () => {
  const [bookings] = useState(adminData.recentBookings);

  return (
    <div className="space-y-6">
      <FadeUp>
        <h1 className="text-2xl font-bold text-dark dark:text-white mb-1">Manage Bookings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Track and manage all customer reservations.</p>
      </FadeUp>

      <FadeUp className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="py-4 px-6 font-medium">Booking ID</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Item</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium">Amount</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <td className="py-4 px-6 text-sm font-medium text-primary">{booking.id}</td>
                  <td className="py-4 px-6 text-sm text-dark dark:text-white font-medium">{booking.user}</td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-dark dark:text-white">{booking.item}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">{booking.type}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{booking.date}</td>
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
                  <td className="py-4 px-6 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      booking.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      booking.paymentStatus === 'Refunded' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeUp>
    </div>
  );
};

export default ManageBookings;
