import React from 'react';

const StatsCard = ({ title, value, icon, colorClass = "text-primary bg-primary/10" }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-dark dark:text-white">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
