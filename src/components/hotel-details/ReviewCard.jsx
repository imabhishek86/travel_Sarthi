import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img 
            src={review.userImage} 
            alt={review.userName} 
            className="w-12 h-12 rounded-full object-cover border-2 border-[#FF385C]/20"
          />
          <div>
            <h4 className="font-bold text-gray-900">{review.userName}</h4>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
          <span className="text-yellow-400 mr-1">⭐</span>
          <span className="font-bold text-gray-900">{review.rating}.0</span>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed italic">"{review.text}"</p>
    </div>
  );
};

export default ReviewCard;
