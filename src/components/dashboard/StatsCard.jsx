import React from 'react';

const StatsCard = ({ title, value, icon, colorClass = "text-[#FF385C] bg-[#FF385C]/10" }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-1">{title}</p>
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
