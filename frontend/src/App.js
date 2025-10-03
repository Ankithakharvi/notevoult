// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import components and pages
// import Header from './components/layout/Header';
// import ProtectedRoute from './components/layout/ProtectedRoute';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
//     // 🔑 1. Global Wrapper: Apply Mocha & Sand background and text color here
//     <div className="min-h-screen bg-amber-50 text-neutral-800">
      
//       <Header />
      
//       {/* 🔑 2. Main Content Wrapper: Apply centering, spacing, shadow, and pure white background */}
//       <main className="max-w-6xl mx-auto py-6 sm:px-6 bg-white rounded-xl shadow-lg lg:px-8 mt-8">
//         {/* ENSURE there is NO <BrowserRouter> wrapping this */}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           {/* Protected routes wrapped in the Outlet component of ProtectedRoute */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//           </Route>
//         </Routes>
//       </main>
      
//       {/* 🔑 3. Set Toast theme to colored for modern look */}
//       <ToastContainer 
//         position="top-right" // Default position (can be top-center, bottom-left, etc.)
//         autoClose={3000}    // Close after 3 seconds
//         hideProgressBar={false} 
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored" // Changed to 'colored' for better notifications contrast
//       />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components and pages
import Header from './components/layout/Header';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    
  // Classes for the main content wrapper (the centered dark card)
  const mainContentClasses = `
    // 🔑 UPDATED: Reduced max-width to 4xl for a smaller container
    max-w-6xl mx-auto 
    
    // 🔑 UPDATED: Reduced vertical padding to py-4 to minimize height
    py-4 sm:px-6 
    
    // Dark background for the card
    bg-neutral-900 rounded-xl shadow-2xl lg:px-8 
    mt-8 mb-8 
    
    min-h-fit // Ensures height respects content size
    
    relative z-10 // Ensures content sits above the shine layer
  `;

  return (
    // 🔑 1. Global Wrapper: Changed to SOLID BLACK
    <div className="
        min-h-screen 
        bg-neutral-950 // NEW Solid Black background
        text-gray-100 
        relative // Important for positioning the shine layer
    ">
      
      {/* 🔑 2. Shine Overlay Layer: Retained for subtle texture on the solid black background */}
      <div className="
        absolute inset-0 
        w-full h-full 
        // Shine gradient
        bg-gradient-to-br from-white/10 to-black/10 
        // Custom class for mix-blend-mode: overlay (defined in index.css)
        shine-overlay 
        pointer-events-none 
        opacity-70 
        z-0
      " aria-hidden="true" />
      
      {/* Header component is outside the main content card */}
      <Header />
      
      {/* 🔑 3. Main Content Wrapper: The centered dark card */}
      <main className={mainContentClasses}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes wrapped in the Outlet component of ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      
      {/* 🔑 4. Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;