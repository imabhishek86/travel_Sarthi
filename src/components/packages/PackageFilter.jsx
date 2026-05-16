import React from 'react';

const PackageFilter = ({ filters, setFilters, onClose }) => {
  const handleBudgetChange = (e) => {
    setFilters(prev => ({ ...prev, budget: Number(e.target.value) }));
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handleDurationChange = (durationValue) => {
    setFilters(prev => {
      const durations = prev.durations.includes(durationValue)
        ? prev.durations.filter(d => d !== durationValue)
        : [...prev.durations, durationValue];
      return { ...prev, durations };
    });
  };

  const clearFilters = () => {
    setFilters({
      budget: 5000,
      categories: [],
      durations: []
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#FF385C]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filters
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={clearFilters} className="text-sm text-[#FF385C] hover:underline font-bold">
            Clear
          </button>
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Budget Range */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">Max Budget</h3>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="100"
          value={filters.budget} 
          onChange={handleBudgetChange}
          className="w-full accent-[#FF385C] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-3 font-medium">
          <span className="text-gray-500">$100</span>
          <span className="text-[#FF385C] bg-[#FF385C]/10 px-3 py-1 rounded-full font-bold">Up to ${filters.budget}</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">Travel Style</h3>
        <div className="space-y-3">
          {['Adventure', 'Family', 'Honeymoon', 'Solo', 'Luxury'].map(category => (
            <label key={category} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="peer w-5 h-5 rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C] cursor-pointer transition-all"
                />
              </div>
              <span className="ml-3 text-gray-700 group-hover:text-gray-900 font-medium transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">Duration</h3>
        <div className="space-y-3">
          {[
            { label: 'Short (1-3 Days)', value: 'short' },
            { label: 'Medium (4-7 Days)', value: 'medium' },
            { label: 'Long (8+ Days)', value: 'long' }
          ].map(duration => (
            <label key={duration.value} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.durations.includes(duration.value)}
                onChange={() => handleDurationChange(duration.value)}
                className="w-5 h-5 rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C] cursor-pointer transition-all"
              />
              <span className="ml-3 text-gray-700 group-hover:text-gray-900 font-medium transition-colors">{duration.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="w-full py-4 mt-4 bg-[#FF385C] text-white rounded-xl font-bold text-lg hover:bg-[#D70466] shadow-lg lg:hidden"
        >
          View Results
        </button>
      )}
    </div>
  );
};

export default PackageFilter;
