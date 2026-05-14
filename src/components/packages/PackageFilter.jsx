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
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-dark dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filters
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={clearFilters} className="text-sm text-primary hover:text-primary-hover font-semibold underline decoration-2 underline-offset-4">
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
        <h3 className="font-bold text-dark dark:text-white mb-4 text-lg">Max Budget</h3>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="100"
          value={filters.budget} 
          onChange={handleBudgetChange}
          className="w-full accent-primary h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-3 font-medium">
          <span className="text-gray-500 dark:text-gray-400">$100</span>
          <span className="text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">Up to ${filters.budget}</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h3 className="font-bold text-dark dark:text-white mb-4 text-lg">Travel Style</h3>
        <div className="space-y-3">
          {['Adventure', 'Family', 'Honeymoon', 'Solo', 'Luxury'].map(category => (
            <label key={category} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="peer w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-primary focus:ring-primary cursor-pointer transition-all"
                />
              </div>
              <span className="ml-3 text-gray-600 dark:text-gray-400 group-hover:text-dark dark:group-hover:text-white font-medium transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-8">
        <h3 className="font-bold text-dark dark:text-white mb-4 text-lg">Duration</h3>
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
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-primary focus:ring-primary cursor-pointer transition-all"
              />
              <span className="ml-3 text-gray-600 dark:text-gray-400 group-hover:text-dark dark:group-hover:text-white font-medium transition-colors">{duration.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="w-full py-4 mt-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-hover shadow-lg lg:hidden"
        >
          View Results
        </button>
      )}
    </div>
  );
};

export default PackageFilter;
