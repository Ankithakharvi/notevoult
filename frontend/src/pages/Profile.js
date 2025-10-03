import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import API from '../api/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define a schema for profile updates (optional password field)
const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional().or(z.literal('')),
});

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const [updateError, setUpdateError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
    },
  });

  // Reset form with current user data on component load or user change
  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        password: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setUpdateLoading(true);
    setUpdateError(null);
    setSuccessMessage(null);
    
    // Only send non-empty fields to the API
    const payload = {};
    if (isDirty) { // Simple check, more detailed logic needed for specific fields
        payload.username = data.username;
        payload.email = data.email;
        if (data.password) {
            payload.password = data.password;
        }
    }

    try {
      const res = await API.put('/users/profile', payload);
      
      // Update AuthContext and localStorage with new data
      updateUser({ ...user, ...res.data });
      setSuccessMessage('Profile updated successfully!');
      
      // Reset form (clearing password field)
      reset({ ...res.data, password: '' }); 

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile.';
      setUpdateError(errorMsg);
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">User Profile</h1>

        {successMessage && (
            <div className="p-3 text-sm text-secondary bg-emerald-900/30 rounded-lg border border-secondary">
                {successMessage}
            </div>
        )}
        
        {updateError && (
          <div className="p-3 text-sm text-danger bg-red-900/30 rounded-lg border border-danger">
            {updateError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <Input
            label="Username"
            id="username"
            {...register('username')}
            error={errors.username?.message}
            disabled={updateLoading}
          />

          <Input
            label="Email"
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={updateLoading}
          />
          
          <Input
            label="New Password (optional)"
            id="password"
            type="password"
            placeholder="Leave blank to keep current password"
            {...register('password')}
            error={errors.password?.message}
            disabled={updateLoading}
          />

          <div className="flex justify-between items-center pt-2">
            <Button type="button" variant="danger" onClick={logout} size="md">
              Logout
            </Button>
            <Button type="submit" variant="primary" loading={updateLoading} disabled={!isDirty}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
