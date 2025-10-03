
// import React, { useState } from 'react';
// import Input from '../common/Input';
// import Button from '../common/Button';

// const SearchBar = ({ onSearch, filters }) => {
//   const [searchTerm, setSearchTerm] = useState(filters.search || '');
//   const [tagTerm, setTagTerm] = useState(filters.tag || '');
//   const [completedFilter, setCompletedFilter] = useState(filters.completed || '');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch({ search: searchTerm, tag: tagTerm, completed: completedFilter });
//   };

//   const handleClear = () => {
//     setSearchTerm('');
//     setTagTerm('');
//     setCompletedFilter('');
//     onSearch({});
//   };

//   return (
//     <form onSubmit={handleSearch} className="bg-bg-card p-4 rounded-xl shadow-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//       <Input
//         id="search"
//         label="Search (Title/Content)"
//         placeholder="Enter keywords..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
      
//       <Input
//         id="tag"
//         label="Filter by Tag"
//         placeholder="e.g., react, bug"
//         value={tagTerm}
//         onChange={(e) => setTagTerm(e.target.value)}
//       />

//       <div className="flex flex-col space-y-1">
//         <label htmlFor="completed-filter" className="text-sm font-medium text-gray-300">Status</label>
//         <select
//           id="completed-filter"
//           value={completedFilter}
//           onChange={(e) => setCompletedFilter(e.target.value)}
//           className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:ring-primary focus:ring-1"
//         >
//           <option value="">All Notes</option>
//           <option value="false">Pending</option>
//           <option value="true">Completed</option>
//         </select>
//       </div>

//       <div className="flex space-x-2">
//         <Button type="submit" variant="primary" className="flex-grow">
//           Apply Filters
//         </Button>
//         <Button type="button" variant="outline" onClick={handleClear} className="flex-grow">
//           Clear
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;
  import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { Search, RotateCcw } from 'lucide-react'; // Added icons

const SearchBar = ({ onSearch, filters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [tagTerm, setTagTerm] = useState(filters.tag || '');
  const [completedFilter, setCompletedFilter] = useState(filters.completed || '');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, tag: tagTerm, completed: completedFilter });
  };

  const handleClear = () => {
    setSearchTerm('');
    setTagTerm('');
    setCompletedFilter('');
    onSearch({});
  };

  return (
    <form 
      onSubmit={handleSearch} 
      // 🔑 1. Container: Changed to WHITE background
      className="
         // New White Background
        p-6 // Increased padding for better look
        rounded-xl 
        shadow-2xl 
        mb-8 
        grid grid-cols-1 md:grid-cols-4 gap-4 items-end
        border border-amber-300 // Added subtle Mocha border
      "
    >
      <Input
        id="search"
        label="Search (Title/Content)"
        placeholder="Enter keywords..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // Pass 'light' style to input component
        inputStyle="light" 
      />
      
      <Input
        id="tag"
        label="Filter by Tag"
        placeholder="e.g., react, bug"
        value={tagTerm}
        onChange={(e) => setTagTerm(e.target.value)}
        inputStyle="light"
      />

      {/* 🔑 2. Select Box Styling: Updated for light background */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="completed-filter" className="text-sm font-medium text-gray-700">Status</label>
        <select
          id="completed-filter"
          value={completedFilter}
          onChange={(e) => setCompletedFilter(e.target.value)}
          className="
            w-full px-4 py-2 
            bg-white // Select background is white
            border border-gray-300 rounded-lg text-gray-900 // Dark text and light border
            focus:border-amber-600 focus:ring-amber-600 focus:ring-1 // Mocha accent on focus
            shadow-sm 
            transition duration-150
          "
        >
          <option value="">All Notes</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="flex space-x-2">
        {/* Apply Button (Primary/Mocha Accent) */}
        <Button 
          type="submit" 
          variant="primary" 
          className="flex-grow bg-amber-700 hover:bg-amber-600 shadow-md shadow-amber-700/50"
        >
          <Search className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
        {/* Clear Button (Outline/Neutral) */}
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleClear} 
          className="flex-grow border-gray-400 text-gray-700 hover:bg-gray-100"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;