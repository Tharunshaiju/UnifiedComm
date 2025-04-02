import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function SearchBar({ searchTerm, onSearchChange, onFilterClick }) {
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onFilterClick}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Filter messages"
        >
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}