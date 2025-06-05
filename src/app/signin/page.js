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

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate sign in
    setTimeout(() => {
      setLoading(false);
      setError('Invalid credentials (demo only)');
    }, 1200);
  };

  // SVG icons for money and stocks
  const DollarBill = () => (
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
  const Coin = () => (
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

  // --- Animated Dust Particle Money Icons ---
  // Orbit config (must be above iconConfigs and iconTransforms)
  const orbitRadius = 126; // px, adjust for your layout (was 110, +15%)
  const iconSize = 36.8; // px, for centering (was 32, +15%)
  const center = 128.8; // px, half of w-64/h-64 (was 112, +15%)

  // Increase to 10 particles, each with unique random params
  const NUM_PARTICLES = 10;
  const iconConfigs = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
    Icon: i % 2 === 0 ? DollarBill : Coin,
    baseAngle: (2 * Math.PI * i) / NUM_PARTICLES,
    // Each gets a unique random seed for movement
    seed: Math.random() * 1000 + i * 100,
  }));

  // Animate a shared time value for perpetual, non-repeating movement
  const time = useMotionValue(0);
  useAnimationFrame((t) => {
    time.set(t / 1000); // seconds
  });

  // Precompute transforms for each icon, with unique, slow, smooth, random wandering (no pulse)
  const iconTransforms = iconConfigs.map(({ baseAngle, seed }, i) => {
    // Use time for smooth, perpetual wandering
    // Layered sine/cosine for pseudo-random, non-repeating movement
    const wanderAngle = useTransform(
      time,
      (t) =>
        baseAngle +
        0.9 * Math.sin(t * 0.11 + seed) + // smoother, slower
        0.7 * Math.cos(t * 0.13 + seed * 1.3) +
        0.5 * Math.sin(t * 0.09 + seed * 2.1) +
        t * 0.07 // slower global spin
    );
    const wanderRadius = useTransform(
      time,
      (t) =>
        orbitRadius +
        22 * Math.sin(t * 0.09 + seed * 0.7) +
        16 * Math.cos(t * 0.06 + seed * 1.9) +
        10 * Math.sin(t * 0.13 + seed * 2.7)
      // No pulse sync
    );
    const left = useTransform(
      [wanderAngle, wanderRadius],
      ([ang, r]) => center + r * Math.cos(ang) - iconSize / 2
    );
    const top = useTransform(
      [wanderAngle, wanderRadius],
      ([ang, r]) => center + r * Math.sin(ang) - iconSize / 2
    );
    return { left, top };
  });

  // Random Money Particles Component
  function RandomMoneyParticles() {
    const containerRef = useRef(null);
    const NUM_PARTICLES = 6; // Reduced for performance
    const ICONS = [DollarBill, Coin];
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
      const minDist = PARTICLE_MIN_DIST; // Increased for less frequent repulsion
      const strength = PARTICLE_REPULSION_STRENGTH; // Lowered for smoother, less jittery effect
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
    useEffect(() => {
      let raf;
      let lastTime = performance.now();
      const interval = 1000 / PARTICLE_FPS; // 60fps target
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
                x =
                  x + (50 + (targetX - 50) * ease - x) * PARTICLE_OUTWARD_LERP; // smaller increments
                y =
                  y + (50 + (targetY - 50) * ease - y) * PARTICLE_OUTWARD_LERP;
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
              ); // move less each time
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

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#050506] to-[#0a0a0c] px-4'>
      <div className='w-full max-w-4xl bg-[#0a0a0c]/80 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#daa56a]/20 backdrop-blur-md relative'>
        {/* Outer glow for the whole card */}
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
            className='relative w-full h-full min-h-[36.8rem] flex items-center justify-center' // +15% min-h
          >
            {/* Pulsing Halo */}
            <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[294px] h-[294px] rounded-full bg-gradient-to-br from-[#daa56a]/30 to-[#fadabd]/20 blur-2xl opacity-70 z-0' // +15% w/h
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            />
            {/* Animated Money Icons with random movement, contained in the left box */}
            <RandomMoneyParticles />
            {/* Central logo with pulse and subtle ring */}
            <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[147px] h-[147px] rounded-full border-2 border-[#daa56a]/40 z-10' // +15% w/h
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
                className='w-full px-4 py-2 rounded bg-[#18181b] text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition'
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
                className='w-full px-4 py-2 rounded bg-[#18181b] text-white border border-[#daa56a]/30 focus:outline-none focus:ring-2 focus:ring-[#daa56a] transition'
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
              className='w-full py-2 rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#050506] font-semibold shadow hover:from-[#fadabd] hover:to-[#daa56a] transition'
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
