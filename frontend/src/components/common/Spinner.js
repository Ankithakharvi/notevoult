
import React from 'react';

const Spinner = ({ className = 'w-6 h-6' }) => {
  return (
    <div className={`inline-block ${className} border-4 border-t-4 border-t-primary border-gray-600 rounded-full animate-spin`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;