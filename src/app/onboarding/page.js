'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

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
          <h1 className='text-3xl font-bold mb-4'>Welcome to Cirrica Paper!</h1>
          <p className='text-lg mb-4'>
            No user data found. Please sign up or sign in.
          </p>
          <div className='space-x-4'>
            <Link 
              href='/signup'
              className='bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#18120a] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition'
            >
              Sign Up
            </Link>
            <Link 
              href='/signin'
              className='border border-[#daa56a] text-[#daa56a] font-bold px-6 py-3 rounded-lg hover:bg-[#daa56a] hover:text-[#18120a] transition'
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] text-white'>
      <div className='bg-[#0a0a0c]/80 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-[#daa56a]/20 text-center'>
        <h1 className='text-3xl md:text-4xl font-extrabold mb-4 text-[#daa56a] drop-shadow'>
          🎉 Welcome to Cirrica Paper!
        </h1>
        <p className='text-lg md:text-xl text-[#fadabd] mb-4'>
          Your account is ready to go.
        </p>
        <div className='w-16 h-1 rounded-full bg-gradient-to-r from-[#daa56a] via-[#fadabd] to-[#daa56a] opacity-80 mx-auto my-4'></div>
        <p className='text-base md:text-lg text-[#fadabd] mb-6'>
          You can now create private stock trading competitions and invite your friends, colleagues, or community members to participate.
        </p>
        <p className='text-[#daa56a] font-semibold mb-6'>
          Ready to organize your first tournament?
        </p>
        <div className='space-y-3'>
          <Link
            href='/how-it-works'
            className='block bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#18120a] font-bold py-3 px-6 rounded-lg hover:opacity-90 transition'
          >
            Learn How It Works
          </Link>
          <Link
            href='/'
            className='block border border-[#daa56a] text-[#daa56a] font-bold py-3 px-6 rounded-lg hover:bg-[#daa56a] hover:text-[#18120a] transition'
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
