
import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-4';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-primary hover:bg-indigo-200 text-white focus:ring-indigo-500/50',
    secondary: 'bg-secondary hover:bg-emerald-600 text-white focus:ring-emerald-500/50',
    danger: 'bg-danger hover:bg-red-600 text-white focus:ring-red-500/50',
    outline: 'bg-transparent border border-gray-500 text-gray-200 hover:bg-gray-700 focus:ring-gray-500/50',
  };

  return (
    <button
      className={`${baseStyle} ${sizeClasses[size]} ${variantClasses[variant]} ${loading || disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Spinner className="w-5 h-5 mr-2" /> : children}
    </button>
  );
};

export default Button;