// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; // <-- 1. Import toast
// import Input from '../common/Input';
// import Button from '../common/Button';
// import { useAuth } from '../../context/AuthContext';

// const registerSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string().min(6, 'Confirm password is required'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"], // set the error path
// });

// const RegisterForm = () => {
//   // NOTE: You must check the AuthContext.js file is fixed to return { success: boolean, message: string }
//   // AND the register function must be fixed to receive (username, email, password) and send 'name' to the API.
//   const { register: registerUser, loading, error } = useAuth();
//   const navigate = useNavigate();
  
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data) => {
//     // The registerUser function is expected to return { success: true } or { success: false, message: '...' }
//     const result = await registerUser(data.username, data.email, data.password);
    
//     if (result.success) {
      
//       // 2. Display success message
//       toast.success("Registration successful! Redirecting to home.", {
//           position: "top-center",
//           autoClose: 1500 // Show for 1.5 seconds
//       });
      
//       // 3. Navigate after the success message is shown
//       setTimeout(() => {
//           navigate('/', { replace: true });
//       }, 500); // Navigate after a short delay (e.g., 500ms)

//     } else {
//         // 4. Display API error message if registration fails
//         toast.error(result.message || "Registration failed. Please try again.", {
//             position: "top-center",
//             autoClose: 3000
//         });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <h2 className="text-3xl font-bold text-white text-center">Register</h2>
      
//       {/* We are now using toast for errors, but you can keep this existing inline error display if you prefer:
//         {error && (
//             <div className="p-3 text-sm text-danger bg-red-900/30 rounded-lg border border-danger">
//                 {error}
//             </div>
//         )} 
//       */}

//       <Input
//         label="Username"
//         id="username"
//         placeholder="Choose a username"
//         {...register('username')}
//         error={errors.username?.message}
//         disabled={loading}
//       />
      
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
//         placeholder="Create a password"
//         {...register('password')}
//         error={errors.password?.message}
//         disabled={loading}
//       />

//       <Input
//         label="Confirm Password"
//         id="confirmPassword"
//         type="password"
//         placeholder="Re-enter password"
//         {...register('confirmPassword')}
//         error={errors.confirmPassword?.message}
//         disabled={loading}
//       />

//       <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
//         Sign Up
//       </Button>
      
//       <p className="text-center text-gray-400">
//         Already have an account?{' '}
//         <Link to="/login" className="text-primary hover:underline">
//           Login
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default RegisterForm;
// src/components/forms/RegisterForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const RegisterForm = () => {
  const { register: registerUser, loading, error } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const result = await registerUser(data.username, data.email, data.password);
    
    if (result.success) {
      
      toast.success("Registration successful! Redirecting to home.", {
          position: "top-center",
          autoClose: 1500
      });
      
      setTimeout(() => {
          navigate('/', { replace: true });
      }, 500);

    } else {
        toast.error(result.message || "Registration failed. Please try again.", {
            position: "top-center",
            autoClose: 3000
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">Register</h2>
      
      <Input
        label="Username"
        id="username"
        placeholder="Choose a username"
        {...register('username')}
        error={errors.username?.message}
        disabled={loading}
      />
      
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        {...register('email')}
        error={errors.email?.message}
        disabled={loading}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="Create a password"
        {...register('password')}
        error={errors.password?.message}
        disabled={loading}
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Re-enter password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        disabled={loading}
      />

      {/* 🔑 Button: Changed to Violet Accent */}
 
<Button 
  type="submit" 
  variant="primary" 
  size="lg" 
  loading={loading} 
  // 🔑 Updated to Pink/Fuchsia accent
  className="w-full bg-blue-400 hover:bg--600" 
>
  Sign In
</Button>
      
      {/* Link: Changed to Violet Accent */}
      <p className="text-center text-gray-400">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="text-violet-400 hover:underline" // Violet Accent for dark BG
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;