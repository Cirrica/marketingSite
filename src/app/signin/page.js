'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Removed all unused animation variables related to legacy particle system

import AnimatedMoneyParticles from '@/components/AnimatedMoneyParticles';

// SVG icons for money and stocks (move outside SignIn to avoid re-creation)
export const DollarBill = () => (
  <svg
    width='20'
    height='12'
    viewBox='0 0 20 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      x='1'
      y='1'
      width='18'
      height='10'
      rx='2'
      fill='#fadabd'
      stroke='#daa56a'
      strokeWidth='1.5'
    />
    <circle cx='10' cy='6' r='2' fill='#daa56a' />
  </svg>
);
export const Coin = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      cx='7'
      cy='7'
      r='6'
      fill='#daa56a'
      stroke='#fadabd'
      strokeWidth='1.5'
    />
    <text
      x='7'
      y='10'
      textAnchor='middle'
      fontSize='7'
      fill='#0a0a0c'
      fontWeight='bold'
    >
      ¢
    </text>
  </svg>
);
export const ICONS = [DollarBill, Coin];

// Remove old RandomMoneyParticles definition and usage

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Call backend signin
    const response = await fetch(`${API_URL}/user/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok || !data.token) {
      setError(data.error || 'Invalid credentials');
      return;
    }
    // Save JWT token for onboarding (always overwrite)
    window.localStorage.setItem('cirricaToken', data.token);
    window.location.href = '/onboarding';
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] px-4'>
      <div className='w-full max-w-4xl bg-[#0a0a0c]/80 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#daa56a]/20 backdrop-blur-2xl relative'>
        {/* Outer glow for the whole card */}
        <div
          className='absolute inset-0 pointer-events-none z-0'
          style={{
            filter: 'blur(24px)', // reduce blur for more color visibility
            boxShadow: '0 0 40px 0 #daa56a22, 0 0 80px 0 #fadabd11', // soften the glow
            background: 'linear-gradient(120deg, #daa56a11 0%, #fadabd11 100%)', // lower opacity for more background color
            borderRadius: '1.5rem',
            opacity: 0.7, // allow more of the main box color to show through
          }}
        />
        {/* Left: Animated Modern Visual - "Secure Data Orbit" */}
        <div className='hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-[#daa56a]/10 to-[#fadabd]/10 relative'>
          <div
            className='absolute inset-0 z-0 pointer-events-none blur-xl'
            style={{ filter: 'blur(32px)' }}
          />
          {/* Animated Cirrica Logo */}
          <AnimatedMoneyParticles />
        </div>
        {/* Right: Form */}
        <div className='flex-1 p-8 md:p-12 flex flex-col justify-center items-center'>
          <h1 className='text-3xl md:text-4xl font-bold text-[#daa56a] mb-2 tracking-tight text-center'>
            Welcome back
          </h1>
          <p className='text-[#fadabd] mb-8 text-sm md:text-base text-center'>
            Please log into your account.
          </p>
          <form onSubmit={handleSubmit} className='space-y-6 w-full max-w-sm'>
            <div>
              <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                Email
              </label>
              <input
                type='email'
                className='w-full px-4 py-2 rounded text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition bg-transparent'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='email'
              />
            </div>
            <div>
              <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                Password
              </label>
              <input
                type='password'
                className='w-full px-4 py-2 rounded text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition bg-transparent'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='current-password'
              />
            </div>
            {error && (
              <div className='text-red-400 text-sm text-center'>{error}</div>
            )}
            <button
              type='submit'
              className='w-full py-2 rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#050506] font-semibold shadow hover:from-[#fadabd] hover:to-[#daa56a] transition cursor-pointer'
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className='mt-6 text-[#fadabd] text-sm text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-[#daa56a] hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
