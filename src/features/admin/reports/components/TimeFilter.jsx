import { useState } from 'react';

function TimeFilter({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('Month');

  const filters = ['Day', 'Week', 'Month', 'Year'];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter.toLowerCase());
    }
  };

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TimeFilter;
