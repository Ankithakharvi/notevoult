 
// import React from 'react';
// import { Link } from 'react-router-dom'; // Need Link for the hero button
// import RegisterForm from '../components/forms/RegisterForm';

// // Define the colors based on the Mocha & Sand theme:
// // Hero BG: Mocha (amber-700)
// // Form BG: Dark Charcoal (neutral-900)
// // Accent: Light Sand (amber-50)

// const Register = () => {
//   return (
//     // 🔑 CONTAINER: Full screen, using flex for the two columns (container)
//     <div className="flex min-h-screen">
      
//       {/* 🔑 LEFT COLUMN: HERO SECTION (Mocha Background) */}
//       <div 
//         className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 text-white bg-amber-700 relative overflow-hidden"
//       >
//         {/* Placeholder for the laptop/subtle image effect */}
//         <div className="absolute inset-0 bg-black opacity-30"></div>
        
//         <div className="relative z-10 max-w-lg text-center">
//             {/* Headline */}
//             <h1 className="text-5xl font-extrabold mb-4 leading-tight">
//                 Start Organizing Today
//             </h1>
//             {/* Subtext */}
//             <p className="text-lg mb-8 text-amber-50/90">
//                 Join thousands of users simplifying their life with NoteVault. It's free!
//             </p>
            
//             {/* Hero Button: Use the contrasting Sand color for the button */}
//             <Link 
//                 to="/login" 
//                 className="inline-block px-8 py-3 text-lg font-semibold rounded-lg text-amber-900 bg-amber-50 hover:bg-white transition duration-300 shadow-xl"
//             >
//                 Already Registered? Sign In
//             </Link>
//         </div>
//       </div>

//       {/* 🔑 RIGHT COLUMN: REGISTER FORM SECTION (Dark Charcoal Background) */}
//       <div 
//         className="w-full lg:w-2/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-neutral-900"
//       >
//         {/* The RegisterForm itself must be updated to use white text/dark accents */}
//         <div className="w-full max-w-md">
//             {/* The Card component is removed since we are styling the section directly */}
//             <RegisterForm /> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
// src/pages/Register.js

import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
  return (
    <div className="flex min-h-screen">
      
      {/* 🔑 LEFT COLUMN: HERO SECTION (Deep Violet Background) */}
      <div 
        // Changed bg-indigo-800 to bg-violet-800
        className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 text-white bg-violet-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="relative z-10 max-w-lg text-center">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                Start Organizing Today
            </h1>
            {/* Changed text-indigo-200 to text-violet-200 */}
            <p className="text-lg mb-8 text-violet-200/90">
                Join thousands of users simplifying their life with NoteVault. It's free!
            </p>
            
            {/* Hero Button: We keep the contrasting Soft Sky Blue accent */}
            <Link 
                to="/login" 
                className="inline-block px-8 py-3 text-lg font-semibold rounded-lg text-violet-900 bg-sky-300 hover:bg-sky-200 transition duration-300 shadow-xl"
            >
                Already Registered? Sign In
            </Link>
        </div>
      </div>

      {/* RIGHT COLUMN: REGISTER FORM SECTION (Dark Charcoal Background) */}
      <div 
        className="w-full lg:w-2/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-neutral-900"
      >
        <div className="w-full max-w-md">
            <RegisterForm /> 
        </div>
      </div>
    </div>
  );
};

export default Register;