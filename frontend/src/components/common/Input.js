
// import React, { forwardRef } from 'react';

// const Input = forwardRef(({ label, id, type = 'text', error, className = '', ...props }, ref) => {
//   return (
//     <div className="flex flex-col space-y-1">
//       {label && (
//         <label htmlFor={id} className="text-sm font-medium text-gray-300">
//           {label}
//         </label>
//       )}
//       <input
//         id={id}
//         type={type}
//         ref={ref}
//         className={`w-full px-4 py-2 bg-gray-700 border ${
//           error ? 'border-danger focus:border-danger' : 'border-gray-600 focus:border-primary'
//         } rounded-lg text-white placeholder-gray-400 focus:ring-primary focus:ring-1 transition duration-150 ease-in-out ${className}`}
//         {...props}
//       />
//       {error && <p className="text-sm text-danger mt-1">{error}</p>}
//     </div>
//   );
// });

// export default Input;
import React, { forwardRef } from 'react';

// The Input component is wrapped in forwardRef to allow react-hook-form's 'ref' to be attached.
const Input = forwardRef(({ 
    label, 
    id, 
    type = 'text', 
    error, 
    disabled, 
    inputStyle = 'dark', // 🔑 NEW: The prop that controls the theme
    className = '', 
    ...props 
}, ref) => {
    
    // Base classes for consistent size, transition, and shape
    const baseClasses = "w-full px-4 py-3 rounded-xl transition duration-200 focus:outline-none";
    
    // 🔑 Light/Glassy Theme Classes (Teal Accent for contrast on light/blurry background)
    const lightClasses = `
        text-gray-800 bg-white/50 border border-gray-300 
        placeholder-gray-500 
        focus:border-teal-500 focus:ring-1 focus:ring-teal-500 
    `;
    
    // 🔑 Dark/Charcoal Theme Classes (Violet Accent for consistency with the original theme)
    const darkClasses = `
        text-white bg-neutral-800 border-2 border-neutral-700 
        placeholder-neutral-600 
        focus:border-violet-500 focus:ring-1 focus:ring-violet-500
    `;

    // Select the class set based on the inputStyle prop
    const themeClasses = inputStyle === 'light' ? lightClasses : darkClasses;

    // Apply specific classes for disabled and error states
    const statusClasses = `
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
    `;

    // Adjust the label color to match the theme context
    const labelColor = inputStyle === 'light' ? 'text-gray-700' : 'text-gray-300';


    return (
        <div className="flex flex-col space-y-1">
            {label && (
                <label htmlFor={id} className={`text-sm font-medium ${labelColor}`}>
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                ref={ref}
                disabled={disabled}
                // Combine all class types, with the user-provided className last to allow overrides
                className={`
                    ${baseClasses} 
                    ${themeClasses}
                    ${statusClasses}
                    ${className}
                `}
                {...props}
            />
            {/* Display error message using a consistent red-500 color */}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
});

export default Input;