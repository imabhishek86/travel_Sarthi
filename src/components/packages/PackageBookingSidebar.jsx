import React, { useState } from 'react';

const PackageBookingSidebar = ({ price }) => {
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalTravelers = adults + children;
  
  // Package calculation logic (e.g. children are 50% off)
  const adultPrice = price * adults;
  const childPrice = (price * 0.5) * children;
  const basePrice = adultPrice + childPrice;
  const taxes = Math.round(basePrice * 0.12); // 12% tax/fees
  const total = basePrice + taxes;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-24">
      <div className="flex items-end gap-1 mb-8 pb-6 border-b border-gray-100">
        <span className="text-4xl font-extrabold text-dark">${price}</span>
        <span className="text-gray-500 font-medium pb-1">/ person</span>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Select Travel Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Adults</label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
              <button 
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
                disabled={adults <= 1}
              >
                -
              </button>
              <span className="font-bold text-dark">{adults}</span>
              <button 
                onClick={() => setAdults(adults + 1)}
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Children</label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2">
              <button 
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
                disabled={children <= 0}
              >
                -
              </button>
              <span className="font-bold text-dark">{children}</span>
              <button 
                onClick={() => setChildren(children + 1)}
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-3">
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Adults x {adults}</span>
          <span>${adultPrice}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-gray-600 font-medium">
            <span>Children x {children}</span>
            <span>${childPrice}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Taxes & Fees (12%)</span>
          <span>${taxes}</span>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
          <span className="font-bold text-lg text-dark">Total</span>
          <span className="text-2xl font-extrabold text-primary">${total}</span>
        </div>
      </div>

      <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-primary-hover transform hover:-translate-y-1 transition-all">
        Book Package Now
      </button>
      
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
        <span>Best Price Guarantee</span>
      </div>
    </div>
  );
};

export default PackageBookingSidebar;
