import React from 'react';

const ActivityTimeline = ({ activities }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Recent Activity</h3>
      
      <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
        {activities.map((activity, index) => {
          let badgeColor = "bg-gray-100 text-gray-500 border-gray-200";
          if (activity.type === 'booking') badgeColor = "bg-blue-100 text-blue-600 border-blue-200";
          if (activity.type === 'favorite') badgeColor = "bg-red-100 text-red-500 border-red-200";
          if (activity.type === 'search') badgeColor = "bg-[#FF385C]/10 text-[#FF385C] border-[#FF385C]/20";

          return (
            <div key={activity.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-sm shadow-sm ${badgeColor}`}>
                {activity.icon}
              </div>
              
              <div>
                <p className="font-bold text-gray-900 mb-1 text-base">{activity.title}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <span>{activity.date}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-8 py-3 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityTimeline;
