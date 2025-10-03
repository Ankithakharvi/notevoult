 

import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

// New Colors:
// Hero BG: Deep Indigo (indigo-800)
// Form BG: Dark Charcoal (neutral-900)
// Accent: Soft Sky Blue (sky-300)

const Login = () => {
  return (
    // CONTAINER: Full screen, using flex for the two columns
    <div className="flex min-h-screen">
      
      {/* 🔑 LEFT COLUMN: HERO SECTION (Deep Indigo Background) */}
      <div 
        // Deep Indigo background
        className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 text-white bg-indigo-300 relative overflow-hidden"
      >
        {/* Subtle image/overlay effect */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="relative z-10 max-w-lg text-center">
            {/* Headline */}
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                Welcome Back to NoteVault
            </h1>
            {/* Subtext */}
            <p className="text-lg mb-8 text-indigo-200/90">
                Access your secure notes anytime, anywhere. Your data is waiting.
            </p>
            
            {/* Hero Button: Contrasting Soft Sky Blue accent */}
            <Link 
                to="/register" 
                className="inline-block px-8 py-3 text-lg font-semibold rounded-lg text-indigo-900 bg-sky-300 hover:bg-sky-200 transition duration-300 shadow-xl"
            >
                Need an Account? Register Now
            </Link>
        </div>
      </div>

      {/* 🔑 RIGHT COLUMN: LOGIN FORM SECTION (Dark Charcoal Background) */}
      <div 
        className="w-full lg:w-2/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-neutral-900"
      >
        <div className="w-full max-w-md">
            <LoginForm /> 
        </div>
      </div>
    </div>
  );
};

export default Login;
 