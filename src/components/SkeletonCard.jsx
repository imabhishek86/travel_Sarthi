import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-8"></div>
        </div>
        
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        
        {/* Amenities Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-14"></div>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
