// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Header = () => {
//   const { isAuthenticated, logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Navigate to /login is redundant if logout() already handles navigation (which is recommended)
//     // We keep it here just in case, but usually, AuthContext handles the redirect.
//     logout();
//     // navigate('/login'); 
//   };

//   // Helper function for defensive extraction and splitting
//   const getDisplayName = () => {
//     if (user && user.username) {
//       // Split the username by space and take the first part
//       return user.username.split(' ')[0];
//     }
//     return 'User';
//   };

//    return (
//     // 🔑 1. LIGHT Header Background: bg-white with a subtle shadow and border
//     <header className="bg-white shadow-md border-b border-gray-100">
//       {/* 🔑 2. Using max-w-6xl for the content block */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <Link 
//               to="/dashboard" 
//               // 🔑 3. Logo Color: Modern Teal accent
//               className="text-2xl font-bold text-teal-600 hover:text-teal-800 transition duration-150"
//             >
//               NoteVault
//             </Link>
//           </div>
          
//           <nav className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 {/* 🔑 4. Text Color: Dark gray for contrast on white background */}
//                 <span className="text-gray-700 font-medium hidden sm:inline">
//                   Welcome, {getDisplayName()}!
//                 </span>
                
//                 <Link
//                   to="/profile"
//                   // 🔑 5. Link Color: Standard gray with Teal hover
//                   className="text-gray-600 hover:text-teal-600 transition duration-150 font-medium"
//                 >
//                   Profile
//                 </Link>
                
//                 <button
//                   onClick={handleLogout}
//                   // Logout button remains red for clear intent
//                   className="px-3 py-1 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-150"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               // Links for public view (Login/Register)
//               <>
//                 <Link
//                   to="/login"
//                   // 🔑 Public Link Color: Standard gray with Teal hover
//                   className="text-gray-600 hover:text-teal-600 transition duration-150 font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   // 🔑 Register button uses the primary accent color (Teal)
//                   className="px-3 py-1 text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition duration-150"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
 import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Added icons for a more modern look
import { User, LogOut, LogIn, UserPlus, BookOpenText } from 'lucide-react'; 

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // Helper function for defensive extraction and splitting
  const getDisplayName = () => {
    if (user && user.username) {
      // Split the username by space and take the first part
      return user.username.split(' ')[0];
    }
    return 'User';
  };

  // Mocha Accent Color
  const accentColor = 'text-amber-500';
  const accentHoverColor = 'hover:text-amber-400';
  const buttonBgColor = 'bg-amber-700 hover:bg-amber-600';

  return (
    // 🔑 1. Header Background: Changed from white to Dark Charcoal (neutral-900) 
    // to match the app's dark theme and the main content card.
    <header className="bg-neutral-900 shadow-xl border-b border-neutral-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO SECTION */}
          <div className="flex-shrink-0">
            <Link 
              to={isAuthenticated ? "/" : "/login"} 
              className={`flex items-center text-3xl font-extrabold ${accentColor} transition duration-150`}
            >
              <BookOpenText className="w-7 h-7 mr-2" />
              NoteVault
            </Link>
          </div>
          
          {/* NAVIGATION SECTION */}
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* User Display: White text for dark background */}
                <span className="flex items-center text-gray-300 font-medium hidden sm:inline">
                  <User className="w-5 h-5 mr-2 text-gray-400" />
                  Welcome, {getDisplayName()}!
                </span>
                
                <Link
                  to="/profile"
                  // Link Color: Light gray with Mocha hover
                  className={`flex items-center text-gray-300 ${accentHoverColor} transition duration-150 font-medium p-2 rounded-lg`}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                
                <button
                  onClick={handleLogout}
                  // Logout button remains red for clear intent
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150 shadow-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              // Public View Links (Login/Register)
              <>
                <Link
                  to="/login"
                  // Link Color: Light gray with Mocha hover
                  className={`text-gray-300 ${accentHoverColor} transition duration-150 font-medium p-2 rounded-lg`}
                >
                  <LogIn className="w-5 h-5 inline mr-1" />
                  Login
                </Link>
                
                <Link
                  to="/register"
                  // Register Button: Mocha Accent
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white ${buttonBgColor} transition duration-150 shadow-md`}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;