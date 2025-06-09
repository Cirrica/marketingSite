'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AnimatedMoneyParticles from '@/components/AnimatedMoneyParticles';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// Removed all unused animation variables related to legacy particle system

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: info, 2: code, 3: password

  // Code verification state
  const CODE_LENGTH = 6; // Change this to set number of boxes
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
  const codeRefs = useRef([]);

  // Resend code state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  // Step 1: Info
  const handleNextInfo = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setLoading(true);
    // Check if email exists
    const checkRes = await fetch(`${API_URL}/user/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const checkData = await checkRes.json();
    if (checkData.exists) {
      setLoading(false);
      setError(
        'Email already registered. Please sign in or use another email.'
      );
      return;
    }
    // Now send OTP
    const response = await fetch(`${API_URL}/email/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Failed to send OTP.');
      return;
    }
    setStep(2);
  };

  // Track OTP verification state and token
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpToken, setOtpToken] = useState('');

  // Step 2: Code verification
  const verifyCode = async () => {
    const response = await fetch(`${API_URL}/email/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: code.join('') }),
    });
    const data = await response.json();
    if (!response.ok || !data.otpToken) return false;
    setOtpToken(data.otpToken);
    return true;
  };
  const handleCodeChange = (idx, val) => {
    if (!/^[0-9a-zA-Z]?$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    if (val && idx < CODE_LENGTH - 1) {
      codeRefs.current[idx + 1]?.focus();
    }
  };
  const handleCodePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, CODE_LENGTH);
    if (!paste) return;
    const arr = paste.split('').slice(0, CODE_LENGTH);
    setCode((prev) => {
      const newCode = [...prev];
      arr.forEach((char, i) => {
        newCode[i] = char;
      });
      return newCode;
    });
    setTimeout(() => {
      codeRefs.current[Math.min(arr.length, CODE_LENGTH - 1)]?.focus();
    }, 0);
  };
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (code.some((c) => !c)) {
      setError('Please enter the full code.');
      return;
    }
    setLoading(true);
    setError('');
    const ok = await verifyCode();
    setLoading(false);
    if (ok) {
      setOtpVerified(true);
      setStep(3);
    } else {
      setError('Invalid code.');
    }
  };

  // Step 3: Password
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otpVerified || !otpToken) {
      setError('Please verify your email before signing up.');
      return;
    }
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }
    setLoading(true);
    setError('');
    // Call backend signup, send otpToken
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, otpToken }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok || !data.user) {
      setError(data.error || 'Signup failed.');
      return;
    }
    // Immediately sign in to get JWT
    const signinRes = await fetch(`${API_URL}/user/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const signinData = await signinRes.json();
    if (!signinRes.ok || !signinData.token) {
      setError(signinData.error || 'Signup succeeded but login failed.');
      return;
    }
    // Always overwrite JWT token after signup/signin
    window.localStorage.setItem('cirricaToken', signinData.token);
    window.location.href = '/onboarding';
  };

  // Handle keyboard navigation for code input
  const handleCodeKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (!code[idx] && idx > 0) {
        codeRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      codeRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < CODE_LENGTH - 1) {
      codeRefs.current[idx + 1]?.focus();
    } else if (e.key === 'Enter') {
      // Optionally submit the code if all fields are filled
      if (step === 2 && code.every((c) => c)) {
        handleVerifyCode(e);
      }
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setResendError('');
    try {
      const res = await fetch(`${API_URL}/email/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendSuccess(true);
      } else {
        setResendError(data.error || 'Failed to resend code');
      }
    } catch (err) {
      setResendError('Network error');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] px-4'>
      <div className='w-full max-w-4xl bg-[#0a0a0c]/80 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#daa56a]/20 backdrop-blur-md relative'>
        {/* Outer glow for the whole card (matches signin) */}
        <div
          className='absolute inset-0 pointer-events-none z-0'
          style={{
            filter: 'blur(32px)',
            boxShadow: '0 0 80px 0 #daa56a33, 0 0 160px 0 #fadabd22',
            background: 'linear-gradient(120deg, #daa56a22 0%, #fadabd22 100%)',
            borderRadius: '1.5rem',
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
        {/* Right: Signup Form */}
        <div className='flex-1 p-8 md:p-12 flex flex-col justify-center items-center relative'>
          {/* Sleek, Minimal Step Bar at the Very Top (refined colors, lower position, subtle bar, glowing dots) */}
          <div
            className='absolute left-0 top-0 w-full flex flex-col items-center z-20'
            style={{ height: '40px' }}
          >
            <div
              className='relative w-full max-w-sm flex items-center justify-center mt-4 mb-2'
              style={{ height: '24px' }}
            >
              {/* Subtle, Blended Track */}
              <div className='absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 rounded-full bg-gradient-to-r from-[#36302d]/80 via-[#daa56a]/10 to-[#fadabd]/10 shadow-[0_0_4px_0_#daa56a22]' />
              {/* Animated Thin Progress Fill */}
              <div
                className='absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-[#daa56a]/70 to-[#fadabd]/60 shadow-[0_0_8px_2px_#daa56a55] transition-all duration-500'
                style={{
                  width: `${((step - 1) / 2) * 100}%`,
                  zIndex: 2,
                }}
              />
              {/* Minimal Glowing Step Dots */}
              {[1, 2, 3].map((n, i) => (
                <div
                  key={n}
                  className='z-10'
                  style={{
                    left: `calc(${(i / 2) * 100}% - 0.375rem)`,
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '0.75rem',
                    height: '0.75rem',
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step === n
                        ? 'bg-gradient-to-br from-[#daa56a] to-[#fadabd] shadow-[0_0_8px_2px_#daa56a99] scale-110'
                        : 'bg-[#36302d] shadow-[0_0_4px_0_#daa56a44]'
                    } ${step > n ? 'ring-2 ring-[#daa56a]/60' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Always show heading/description above the stepper */}
          <h1 className='text-3xl md:text-4xl font-bold text-[#daa56a] mb-2 tracking-tight text-center'>
            Join the Journey
          </h1>
          <p className='text-[#fadabd] mb-8 text-sm md:text-base text-center'>
            Create your Cirrica account to get started.
          </p>
          <form
            onSubmit={
              step === 1
                ? handleNextInfo
                : step === 2
                ? handleVerifyCode
                : handleSignup
            }
            className='space-y-6 w-full max-w-sm'
          >
            {step === 1 && (
              <>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                      First Name
                    </label>
                    <input
                      type='text'
                      className='w-full px-4 py-2 rounded text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition bg-transparent'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete='given-name'
                    />
                  </div>
                  <div className='flex-1'>
                    <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      className='w-full px-4 py-2 rounded text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition bg-transparent'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autoComplete='family-name'
                    />
                  </div>
                </div>
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
                {error && (
                  <div className='text-red-400 text-sm text-center'>
                    {error}
                  </div>
                )}
                <button
                  type='submit'
                  className='w-full py-2 rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#050506] font-semibold shadow hover:from-[#fadabd] hover:to-[#daa56a] transition cursor-pointer'
                >
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                    Enter Verification Code
                  </label>
                  <div className='flex gap-2 justify-center mb-2'>
                    {Array(CODE_LENGTH)
                      .fill(0)
                      .map((_, i) => (
                        <input
                          key={i}
                          ref={(el) => (codeRefs.current[i] = el)}
                          type='text'
                          inputMode='text'
                          maxLength={1}
                          className='w-12 h-12 text-center text-2xl rounded text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition font-mono tracking-widest bg-transparent'
                          value={code[i]}
                          onChange={(e) => handleCodeChange(i, e.target.value)}
                          onKeyDown={(e) => handleCodeKeyDown(e, i)}
                          onPaste={i === 0 ? handleCodePaste : undefined}
                          autoFocus={i === 0}
                          aria-label={`Code digit ${i + 1}`}
                        />
                      ))}
                  </div>
                  <div className='text-[#fadabd] text-xs text-center mb-2'>
                    (You can paste the full code, use arrows/backspace, or press
                    Enter)
                  </div>
                </div>
                {error && (
                  <div className='text-red-400 text-sm text-center'>
                    {error}
                  </div>
                )}
                <button
                  type='submit'
                  className='w-full py-2 rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#050506] font-semibold shadow hover:from-[#fadabd] hover:to-[#daa56a] transition cursor-pointer'
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
                {/* Resend Code Section */}
                <div className='mt-4 text-center'>
                  <button
                    type='button'
                    onClick={handleResendCode}
                    disabled={resendLoading}
                    className='w-full py-2 rounded bg-gradient-to-r from-[#36302d] to-[#47403d] text-[#fadabd] font-semibold shadow hover:from-[#47403d] hover:to-[#36302d] transition cursor-pointer'
                  >
                    {resendLoading ? 'Resending...' : 'Resend Code'}
                  </button>
                  {resendSuccess && (
                    <div className='text-green-400 text-sm mt-2'>
                      Code sent! Please check your email.
                    </div>
                  )}
                  {resendError && (
                    <div className='text-red-400 text-sm mt-2'>
                      {resendError}
                    </div>
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='w-full px-4 py-2 rounded text-white border border-[#daa56a]/30 opacity-60 cursor-not-allowed bg-transparent'
                    value={email}
                    disabled
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
                    autoComplete='new-password'
                  />
                </div>
                <div>
                  <label className='block text-[#daa56a] mb-1 text-sm font-medium'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    className='w-full px-4 py-2 rounded text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition bg-transparent'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete='new-password'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='agreeTerms'
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className='accent-[#daa56a] w-4 h-4 rounded focus:ring-2 focus:ring-[#daa56a] border border-[#daa56a]/30 bg-transparent'
                    required
                  />
                  <label
                    htmlFor='agreeTerms'
                    className='text-[#fadabd] text-sm'
                  >
                    I agree to the{' '}
                    <a href='/terms' className='underline hover:text-[#daa56a]'>
                      Terms & Conditions
                    </a>
                  </label>
                </div>
                {error && (
                  <div className='text-red-400 text-sm text-center'>
                    {error}
                  </div>
                )}
                <button
                  type='submit'
                  className='w-full py-2 rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#050506] font-semibold shadow hover:from-[#fadabd] hover:to-[#daa56a] transition cursor-pointer'
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </>
            )}
          </form>
          <div className='mt-6 text-[#fadabd] text-sm text-center'>
            Already have an account?{' '}
            <Link href='/signin' className='text-[#daa56a] hover:underline'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
