'use client';

// Configurable animation variables
const PARTICLE_COUNT = 6; // Number of animated icons
const PARTICLE_FPS = 120; // Animation frames per second
const PARTICLE_MIN_DIST = 60; // Minimum distance for repulsion
const PARTICLE_REPULSION_STRENGTH = 0.012; // Repulsion force
const PARTICLE_OUTWARD_EASE_STEP = 0.025; // Outward ease step
const PARTICLE_OUTWARD_LERP = 0.22; // Outward lerp factor
const PARTICLE_RANDOM_STEP = 0.0015; // Random movement increment
const PARTICLE_MOVE_LIMIT = 0.045; // Max movement per frame
const PARTICLE_DAMPING = 0.98 + 2; // Damping factor for velocity
const PARTICLE_MARGIN = 12; // Margin percent for bounds

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from 'framer-motion';
import { useRouter } from 'next/navigation';

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

// Random Money Particles Component (move outside SignIn for stability)
export function RandomMoneyParticles() {
  const containerRef = React.useRef(null);
  const NUM_PARTICLES = PARTICLE_COUNT;
  // Generate all random values once for SSR/CSR consistency
  const initialParticles = React.useMemo(() => {
    // Use a seeded PRNG for deterministic SSR/CSR
    function mulberry32(seed) {
      return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(123456); // fixed seed for hydration match
    return Array.from({ length: NUM_PARTICLES }, (_, i) => {
      const Icon = ICONS[i % ICONS.length];
      return {
        id: i,
        Icon,
        x: 50,
        y: 50,
        dx: (rand() - 0.5) * 0.09, // slightly faster
        dy: (rand() - 0.5) * 0.09, // slightly faster
        size: 43.7 + rand() * 11.5,
        color: i % 2 === 0 ? '#daa56a' : '#fadabd',
        targetX: rand() * (100 - 2 * 12) + 12,
        targetY: rand() * (100 - 2 * 12) + 12,
        progress: 0,
      };
    });
  }, []);
  const [particles, setParticles] = React.useState(initialParticles);

  // Helper to keep particles apart (simple repulsion)
  function applyRepulsion(ps) {
    const minDist = PARTICLE_MIN_DIST;
    const strength = PARTICLE_REPULSION_STRENGTH;
    return ps.map((p, i) => {
      let dxTotal = 0,
        dyTotal = 0;
      ps.forEach((other, j) => {
        if (i === j) return;
        const dx = (p.x - other.x) * 2;
        const dy = (p.y - other.y) * 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist && dist > 0.01) {
          const force = (minDist - dist) * strength;
          dxTotal += (dx / dist) * force;
          dyTotal += (dy / dist) * force;
        }
      });
      return { ...p, dx: p.dx + dxTotal, dy: p.dy + dyTotal };
    });
  }

  // Animate the particles
  React.useEffect(() => {
    let raf;
    let lastTime = performance.now();
    const interval = 1000 / PARTICLE_FPS;
    function animate(now) {
      if (now - lastTime >= interval) {
        setParticles((prev) => {
          let next = applyRepulsion(prev);
          return next.map((p) => {
            let { x, y, dx, dy, size, targetX, targetY, progress } = p;
            const marginPercent = PARTICLE_MARGIN;
            // Outward animation: ease out for first 1.2s
            if (progress < 1) {
              const newProgress = Math.min(
                progress + PARTICLE_OUTWARD_EASE_STEP,
                1
              ); // slower ease for smoother start
              const ease = 1 - Math.pow(1 - newProgress, 2); // easeOutQuad
              x = x + (50 + (targetX - 50) * ease - x) * PARTICLE_OUTWARD_LERP; // smaller increments
              y = y + (50 + (targetY - 50) * ease - y) * PARTICLE_OUTWARD_LERP;
              return { ...p, x, y, progress: newProgress };
            }
            if (x + dx > 100 - marginPercent || x + dx < marginPercent)
              dx = -dx * 0.7;
            if (y + dy > 100 - marginPercent || y + dy < marginPercent)
              dy = -dy * 0.7;
            dx += (Math.random() - 0.5) * PARTICLE_RANDOM_STEP; // smaller random increments
            dy += (Math.random() - 0.5) * PARTICLE_RANDOM_STEP;
            dx = Math.max(
              -PARTICLE_MOVE_LIMIT,
              Math.min(PARTICLE_MOVE_LIMIT, dx)
            );
            dy = Math.max(
              -PARTICLE_MOVE_LIMIT,
              Math.min(PARTICLE_MOVE_LIMIT, dy)
            );
            x = x + dx * PARTICLE_DAMPING;
            y = y + dy * PARTICLE_DAMPING;
            x = Math.max(marginPercent, Math.min(100 - marginPercent, x));
            y = Math.max(marginPercent, Math.min(100 - marginPercent, y));
            return { ...p, x, y, dx, dy, progress: 1 };
          });
        });
        lastTime = now;
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 w-full h-full pointer-events-none'
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: `drop-shadow(0 0 18px ${p.color}88) drop-shadow(0 0 36px ${p.color}44)`,
            transition: 'filter 0.2s',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <p.Icon />
        </div>
      ))}
    </div>
  );
}

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

  // Step 1: Info
  const handleNextInfo = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  // Step 2: Code verification
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
  const verifyCode = async () => {
    // Placeholder: always true after 1s
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
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
      setStep(3);
    } else {
      setError('Invalid code.');
    }
  };

  // Step 3: Password
  const handleSignup = async (e) => {
    e.preventDefault();
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
    // Placeholder signup logic
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/onboarding';
    }, 1200);
  };

  // Orbit config (must be above iconConfigs and iconTransforms)
  const orbitRadius = 126; // px, adjust for your layout (was 110, +15%)
  const iconSize = 36.8; // px, for centering (was 32, +15%)
  const center = 128.8; // px, half of w-64/h-64 (was 112, +15%)

  // Animate a shared time value for perpetual, non-repeating movement
  const time = useMotionValue(0);
  useAnimationFrame((t) => {
    time.set(t / 1000); // seconds
  });

  // Calculate icon positions directly in render (no hooks in loops)
  function getIconTransforms() {
    const t = time.get();
    const transforms = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseAngle = (2 * Math.PI * i) / PARTICLE_COUNT;
      const seed = i * 100; // deterministic for SSR/CSR
      const wanderAngle =
        baseAngle +
        0.9 * Math.sin(t * 0.11 + seed) +
        0.7 * Math.cos(t * 0.13 + seed * 1.3) +
        0.5 * Math.sin(t * 0.09 + seed * 2.1) +
        t * 0.07;
      const wanderRadius =
        orbitRadius +
        22 * Math.sin(t * 0.09 + seed * 0.7) +
        16 * Math.cos(t * 0.06 + seed * 1.9) +
        10 * Math.sin(t * 0.13 + seed * 2.7);
      const left = center + wanderRadius * Math.cos(wanderAngle) - iconSize / 2;
      const top = center + wanderRadius * Math.sin(wanderAngle) - iconSize / 2;
      transforms.push({ left, top });
    }
    return transforms;
  }

  // Step 2: Code verification (add keyboard navigation)
  const handleCodeKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (code[idx]) {
        // Clear current
        const newCode = [...code];
        newCode[idx] = '';
        setCode(newCode);
      } else if (idx > 0) {
        codeRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      codeRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < CODE_LENGTH - 1) {
      codeRefs.current[idx + 1]?.focus();
    } else if (e.key === 'Enter') {
      handleVerifyCode(e);
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
          <motion.div
            initial={{ scale: 1.035, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            transition={{ duration: 1 }}
            className='relative w-full h-full min-h-[36.8rem] flex items-center justify-center'
          >
            {/* Pulsing Halo */}
            <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[294px] h-[294px] rounded-full bg-gradient-to-br from-[#daa56a]/30 to-[#fadabd]/20 blur-2xl opacity-70 z-0'
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            />
            <RandomMoneyParticles />
            {/* Central logo with pulse and subtle ring */}
            <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[147px] h-[147px] rounded-full border-2 border-[#daa56a]/40 z-10'
              animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            <motion.img
              src='/clearCircleLogo.png'
              alt='Cirrica Logo'
              className='relative z-20 w-[147px] h-[147px] rounded-full aspect-square border-4 border-[#daa56a]/60 shadow-[0_0_32px_0px_rgba(218,165,106,0.18),0_0_64px_0px_rgba(250,218,189,0.12)] drop-shadow-lg'
              style={{
                objectFit: 'contain',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(2px)',
              }}
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 46px 12px #daa56a33',
                  '0 0 69px 23px #fadabd33',
                  '0 0 46px 12px #daa56a33',
                ],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
          </motion.div>
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
