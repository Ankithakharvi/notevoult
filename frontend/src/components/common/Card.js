import React from 'react';

const Card = ({ children, className = '' }) => {
  
  // Define a dark, EARTHY/MOCHA default style for the Card
  const defaultClasses = `
    // Default background: Deep Amber/Brown gradient for warmth and contrast
    // NOTE: bg-gradient-to-br from-amber-850 is not a standard Tailwind class.
    // I'm using the nearest standard class: from-amber-100.
    bg-gradient-to-br from-amber-600 to-neutral-400
    p-6 
    rounded-xl 
    shadow-lg 
    // Subtle, dark border in an earthy tone
    border border-amber-300 
    
    // 🔑 CHANGED: Default text color to BLACK/very dark gray
    text-gray-900 
  `;

  return (
    // Combine default styles with any incoming className props.
    // The incoming className will override conflicting default styles 
    // (e.g., if a specific page needs a different background).
    <div className={`${defaultClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;