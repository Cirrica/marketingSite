'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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
          const userData = jwtDecode(token);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.log(e);

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

  // Updated onboarding message for signed up/waitlist
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] text-white'>
      <div className='bg-[#0a0a0c]/80 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-[#daa56a]/20 text-center'>
        <h1 className='text-3xl md:text-4xl font-extrabold mb-4 text-[#daa56a] drop-shadow'>
          🎉 You’re In!
        </h1>
        <p className='text-lg md:text-xl text-[#fadabd] mb-4'>
          Thanks for signing up for Cirrica Capital.
        </p>
        <div className='w-16 h-1 rounded-full bg-gradient-to-r from-[#daa56a] via-[#fadabd] to-[#daa56a] opacity-80 mx-auto my-4'></div>
        <p className='text-base md:text-lg text-[#fadabd] mb-6'>
          You’re on the waitlist while we finish developing our Alpha program.<br />
          We’ll notify you as soon as you can start your investing journey.<br />
          <span className='text-[#daa56a] font-semibold'>Stay tuned for updates!</span>
        </p>
      </div>
    </div>
  );
}
