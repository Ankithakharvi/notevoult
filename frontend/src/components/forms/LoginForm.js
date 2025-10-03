// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Link, useNavigate } from 'react-router-dom';
// import Input from '../common/Input';
// import Button from '../common/Button';
// import { useAuth } from '../../context/AuthContext';

// const loginSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// const LoginForm = () => {
//   const { login, loading, error } = useAuth();
//   const navigate = useNavigate();
  
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data) => {
//     const success = await login(data.email, data.password);
//     if (success) {
//       navigate('/', { replace: true });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <h2 className="text-3xl font-bold text-white text-center">Login</h2>
      
//       {error && (
//         <div className="p-3 text-sm text-danger bg-red-900/30 rounded-lg border border-danger">
//           {error}
//         </div>
//       )}

//       <Input
//         label="Email"
//         id="email"
//         type="email"
//         placeholder="Enter your email"
//         {...register('email')}
//         error={errors.email?.message}
//         disabled={loading}
//       />

//       <Input
//         label="Password"
//         id="password"
//         type="password"
//         placeholder="Enter your password"
//         {...register('password')}
//         error={errors.password?.message}
//         disabled={loading}
//       />

//      // In LoginForm.js (or RegisterForm.js)

// <Button 
//   type="submit" 
//   variant="primary" 
//   size="lg" 
//   loading={loading} 
//   // 🔑 Updated to Pink/Fuchsia accent
//   className="w-full bg-pink-500 hover:bg-pink-600" 
// >
//   Sign In
// </Button>
      
//       <p className="text-center text-gray-400">
//         Don't have an account?{' '}
//         <Link to="/register" className="text-primary hover:underline">
//           Register
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;
  import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react'; // 🔑 Added Icon Import
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// 🔑 Updated to accept the cardStyle prop
const LoginForm = ({ cardStyle = 'dark' }) => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/', { replace: true });
    }
  };
  
  // Dynamic classes based on the theme (light card vs. dark bg)
  const textClass = cardStyle === 'light' ? 'text-gray-800' : 'text-white';
  const linkClass = cardStyle === 'light' ? 'text-teal-600 hover:text-teal-700' : 'text-primary hover:underline';
  const errorTextClass = cardStyle === 'light' ? 'text-red-800' : 'text-red-300';
  const errorBgClass = cardStyle === 'light' ? 'bg-red-100/70 border-red-400' : 'bg-red-900/30 border-red-700';

  return (
    <div className="p-2"> 
      <h2 className={`text-4xl font-extrabold ${textClass} mb-2 text-left`}>
        Welcome Back
      </h2> 
      <p className={`text-lg ${cardStyle === 'light' ? 'text-gray-600' : 'text-neutral-400'} mb-8 text-left`}>
        Please sign in to continue.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Extraordinary Error Box */}
        {error && (
          <div className={`p-4 text-sm font-medium ${errorTextClass} ${errorBgClass} rounded-lg border transition-all duration-300 transform`}>
            <span className="font-semibold mr-2">Error:</span> {error}
          </div>
        )}

        {/* Inputs are passed the style prop */}
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
          disabled={loading}
          inputStyle={cardStyle} // 🔑 Passed the style context
        />

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
          disabled={loading}
          inputStyle={cardStyle} // 🔑 Passed the style context
        />

        {/* Submit Button: Sharp Teal Accent for light background (Glassy look) */}
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          loading={loading} 
          // Extraordinary Button Class: Teal for contrast
          className="
            w-full py-4 text-lg text-white 
            bg-teal-500 hover:bg-teal-600 
            shadow-lg shadow-teal-500/40 
            transition-all duration-300 transform hover:scale-[1.01]
          "
        >
          {loading ? 'Processing...' : (
            <>
              <LogIn className="w-5 h-5 mr-3" />
              Sign In
            </>
          )}
        </Button>
        
        {/* Link */}
        <p className={`text-center pt-2 text-sm ${cardStyle === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className={`font-semibold ${linkClass} transition-colors`} 
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;