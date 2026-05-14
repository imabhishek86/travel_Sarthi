import React from 'react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking, onCancel }) => {
  const isUpcoming = booking.status === 'Upcoming';
  const isCompleted = booking.status === 'Completed';
  
  const statusColors = {
    'Upcoming': 'bg-blue-100 text-blue-700 border-blue-200',
    'Completed': 'bg-green-100 text-green-700 border-green-200',
    'Cancelled': 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="sm:w-64 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
        <img 
          src={booking.imageUrl} 
          alt={booking.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold border ${statusColors[booking.status]} dark:bg-opacity-20`}>
          {booking.status}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{booking.type} • ID: {booking.id}</span>
            <span className="font-extrabold text-xl text-primary">${booking.price}</span>
          </div>
          <h3 className="text-xl font-bold text-dark dark:text-white mb-1">{booking.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {booking.destination}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-dark dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            {isUpcoming && (
              <button 
                onClick={() => onCancel && onCancel(booking.id)}
                className="flex-1 sm:flex-none px-4 py-2 text-red-500 font-semibold text-sm hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                Cancel
              </button>
            )}
            {isCompleted && (
              <button className="flex-1 sm:flex-none px-4 py-2 text-primary font-semibold text-sm hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                Write Review
              </button>
            )}
            <Link 
              to={booking.type === 'Hotel' ? `/hotels/1` : `/packages/1`}
              className="flex-1 sm:flex-none px-6 py-2 bg-dark dark:bg-white text-white dark:text-dark font-semibold text-sm rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
