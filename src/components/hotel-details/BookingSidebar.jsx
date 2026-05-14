import React, { useState } from 'react';

const BookingSidebar = ({ pricePerNight }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Simple calculation logic
  const calculateDays = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const days = calculateDays();
  const basePrice = pricePerNight * days;
  const taxes = Math.round(basePrice * 0.1); // 10% tax
  const total = basePrice + taxes;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl sticky top-24">
      <div className="flex items-end gap-1 mb-6">
        <span className="text-3xl font-extrabold text-dark">${pricePerNight}</span>
        <span className="text-gray-500 font-medium pb-1">/ night</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Check-in</label>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Check-out</label>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Guests</label>
          <select 
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>${pricePerNight} x {days} nights</span>
          <span>${basePrice}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes & Fees (10%)</span>
          <span>${taxes}</span>
        </div>
        <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center font-bold text-lg text-dark">
          <span>Total</span>
          <span className="text-primary">${total}</span>
        </div>
      </div>

      <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(170,59,255,0.39)] hover:shadow-[0_6px_20px_rgba(170,59,255,0.23)] hover:bg-primary-hover transform hover:-translate-y-0.5 transition-all">
        Reserve Now
      </button>
      
      <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet</p>
    </div>
  );
};

export default BookingSidebar;
