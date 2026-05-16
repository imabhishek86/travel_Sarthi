import React from 'react';

const Amenities = ({ amenities }) => {
  const getIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return '📶';
      case 'pool': return '🏊‍♂️';
      case 'parking': return '🅿️';
      case 'restaurant': return '🍽️';
      case 'gym': return '🏋️‍♀️';
      case 'spa': return '💆‍♀️';
      case 'ac rooms': return '❄️';
      case 'airport pickup': return '✈️';
      case 'beachfront': return '🏖️';
      case 'room service': return '🛎️';
      case 'bar': return '🍸';
      default: return '✨';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Popular Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl shadow-sm">
              {getIcon(amenity)}
            </div>
            <span className="text-gray-700 font-medium">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
