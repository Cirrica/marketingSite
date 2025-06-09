'use client';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function OnboardingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to get JWT token from localStorage and decode
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cirricaToken')
        : null;
    if (token) {
      try {
        // Only decode if token is a valid JWT (3 parts separated by .)
        if (token.split('.').length === 3) {
          const userData = jwt_decode(token);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] text-white'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>Welcome to Cirrica!</h1>
          <p className='text-lg'>
            No user data found. Please sign up or sign in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] text-white'>
      <div className='bg-[#0a0a0c]/80 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-[#daa56a]/20'>
        <h1 className='text-3xl font-bold mb-4 text-[#daa56a]'>
          Welcome, {user.first_name || user.firstName}!
        </h1>
        <div className='space-y-2 text-lg'>
          <div>
            <b>First Name:</b> {user.first_name || user.firstName}
          </div>
          <div>
            <b>Last Name:</b> {user.last_name || user.lastName}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Signup Date:</b> {user.signup_date || user.signupDate}
          </div>
          <div>
            <b>Verified:</b> {user.is_verified ? 'Yes' : 'No'}
          </div>
          <div>
            <b>User ID:</b> {user.user_id || user.userId}
          </div>
        </div>
      </div>
    </div>
  );
}
