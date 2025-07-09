'use client';
import React from 'react';
import FadeInSection from '../../components/FadeInSection';
import {
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaBook,
  FaTrophy,
  FaLock,
  FaUserGraduate,
  FaCoins,
} from 'react-icons/fa';

const journeySteps = [
  {
    key: 'start',
    title: 'Welcome to Cirrica Capital',
    icon: <FaMapMarkerAlt className='text-[#daa56a] text-4xl' />, // desktop only.
    color: '#daa56a',
    description: (
      <>
        <p className='mb-2'>
          We bridge the gap between learning and successful investing. Our
          unique two-phase program is designed to help you build confidence and
          expertise, while providing an innovative way to access bonus capital
          and share in profits.
        </p>
        <p className='text-[#fadabd]'>
          Scroll or follow the path to see how your journey unfolds!
        </p>
      </>
    ),
  },
  {
    key: 'alpha',
    title: 'Phase 1: Alpha – Learn, Practice, and Compete',
    icon: <FaBook className='text-[#fadabd] text-3xl' />, // desktop only...
    color: '#fadabd',
    description: (
      <>
        <p className='mb-2'>
          In Alpha, our goal is simple: equip you with the skills and tools to
          confidently invest.
        </p>
        <ul className='list-disc ml-5 text-[#fadabd] text-base'>
          <li>
            <b>Virtual Paper Trading:</b> Begin risk-free with virtual funds and
            real market data. No financial stress, just pure learning.
          </li>
          <li>
            <b>Personalized Trading Limits:</b> Practice at your own pace. We
            track your returns, net profits, and success rates to build your
            confidence for the next level.
          </li>
          <li>
            <b>Interactive Learning Modules:</b> Video lessons and quizzes,
            seamlessly integrated. Skip ahead if you’re experienced and want
            bonus capital!
          </li>
          <li>
            <b>Investment Competitions:</b> Compete using virtual currency in
            regular competitions.
          </li>
          <li>
            <b>Personal Feedback & Growth:</b> Our team communicates directly
            with you. Exceptional performers are personally invited to Phase 2
            for real returns.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: 'beta',
    title: 'Phase 2: Beta – Real Investing, Shared Profits',
    icon: <FaUserGraduate className='text-[#daa56a] text-3xl' />, // desktop only
    color: '#daa56a',
    description: (
      <>
        <p className='mb-2'>
          Phase 2 transitions successful Alpha participants into a rewarding
          investing model that allows you to grow your capital alongside Cirrica
          Capital’s resources.
        </p>
        <ul className='list-disc ml-5 text-[#fadabd] text-base'>
          <li>
            <b>Earn Bonus Capital:</b> After demonstrating success, invest small
            amounts and we’ll match up to 50% based on your performance.{' '}
            <span className='text-[#daa56a]'>
              E.g. deposit $50, we match $25, total $75 invested.
            </span>
          </li>
          <li>
            <b>Your Money is Safe:</b> Your deposit stays in your own
            sub-account. Our match mirrors your trades—your money never leaves
            your control.
          </li>
          <li>
            <b>Profit-Sharing Model:</b> Keep 100% of your profits, plus a share
            of ours.{' '}
            <span className='text-[#daa56a]'>
              E.g. $50 makes 25% ($12.50), our $25 makes $6.25, you get a third
              ($2.08) = $14.58 total profit.
            </span>
          </li>
          <li>
            <b>Increased Matching:</b> Exceptional investors with strong credit
            can unlock up to 1:1 matching.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: 'security',
    title: 'Transparency & Security',
    icon: <FaLock className='text-[#fadabd] text-3xl' />, // desktop only
    color: '#fadabd',
    description: (
      <>
        <p className='mb-2'>
          Detailed records are maintained through comprehensive tracking and
          secure brokerage arrangements. Our clear and protective usage policy
          ensures your investments are safeguarded from unnecessary risk, and
          your rights are always clearly outlined.
        </p>
      </>
    ),
  },
  {
    key: 'empower',
    title: 'Investing Made Accessible',
    icon: <FaFlagCheckered className='text-[#daa56a] text-4xl' />, // desktop only
    color: '#daa56a',
    description: (
      <>
        <p className='mb-2'>
          At Cirrica Capital, our goal is to empower you as an investor,
          providing a structured pathway from learning to tangible profits.
          Begin your journey today, and let’s grow together.
        </p>
      </>
    ),
  },
];

// --- Move some cards to the left and update colors to match About Us section ---
const leftJourneySteps = [journeySteps[3]]; // Transparency & Security
const rightJourneySteps = [
  journeySteps[1], // Alpha
  journeySteps[2], // Beta
  journeySteps[4], // Empower
];

export default function HowItWorksPage() {
  return (
    <div className='relative min-h-screen w-full overflow-x-hidden font-[family-name:var(--font-geist-sans)] text-white bg-gradient-to-br from-[#050506] to-[#0a0a0c]'>
      {/* Remove all overlays and blur for performance */}
      <FadeInSection id='how-it-works' className='text-white py-20 md:py-32'>
        <div className='relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-start md:items-stretch'>
          {/* Left: Title, intro, and some cards */}
          <div className='flex-1 flex flex-col items-center text-center justify-start md:justify-start md:mt-0 gap-8'>
            <div className='mb-8 mt-0 md:mt-0 w-full'>
              <h2 className='text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-xl bg-gradient-to-r from-[#daa56a] to-[#fadabd] bg-clip-text text-transparent text-left'>
                How It Works
              </h2>
              <div className='w-full relative flex flex-row items-stretch'>
                {/* Unified glassy card for all intro text */}
                <div className='w-full max-w-xl bg-[#18120a] border border-[#daa56a]/30 rounded-2xl shadow-xl px-8 py-8 flex flex-col items-start justify-center text-left ml-0'>
                  <span className='text-2xl md:text-3xl font-extrabold text-[#daa56a] drop-shadow-lg mb-2 tracking-tight text-left'>
                    Welcome to Cirrica Capital
                  </span>
                  <span className='text-lg md:text-xl font-semibold text-[#fadabd] drop-shadow mb-2 text-left'>
                    We bridge the gap between learning and successful investing.
                  </span>
                  <div className='w-16 h-1 rounded-full bg-gradient-to-r from-[#daa56a] via-[#fadabd] to-[#daa56a] opacity-80 my-3'></div>
                  <span className='text-base md:text-lg font-medium text-[#fadabd] max-w-2xl drop-shadow text-left'>
                    Our unique two-phase program is designed to help new
                    investors build confidence and expertise while providing an
                    innovative way to access bonus capital and share in profits.
                  </span>
                </div>
              </div>
            </div>
            {/* Left-side cards (About Us style) */}
            <div className='flex flex-col gap-6 w-full items-center'>
              {leftJourneySteps.map((step) => (
                <div
                  key={step.key}
                  className='w-full relative flex flex-row items-stretch'
                >
                  <div className='w-full bg-[#120e08] rounded-2xl shadow-lg p-7 flex flex-col items-center border border-[#daa56a]/20 text-left ml-0'>
                    <span className='text-2xl md:text-3xl font-extrabold text-[#daa56a] drop-shadow-lg mb-2 tracking-tight text-left'>
                      {step.title}
                    </span>
                    <div className='text-base md:text-lg font-medium text-[#fadabd] max-w-2xl drop-shadow text-left'>
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Modern CTA button, visually separated */}
            <div className='w-full flex justify-start mt-2'>
              <button
                className='bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#18120a] font-extrabold px-10 py-5 rounded-md shadow-xl text-xl md:text-2xl hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#daa56a] transition-all duration-300 border-0 focus:outline-none focus:ring-4 focus:ring-[#daa56a]/40 mt-4 text-left cursor-pointer'
                onClick={() => (window.location.href = '/signup')}
              >
                Start Your Cirrica Journey
              </button>
            </div>
          </div>
          {/* Right: Timeline with remaining cards */}
          <div className='flex-1 flex flex-col items-center w-full'>
            <ExplorationMap steps={rightJourneySteps} noIcons />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}

// --- ExplorationMap component ---
function ExplorationMap({ steps }) {
  // Remove all animation and state for performance
  return (
    <div className='relative w-full flex flex-col items-center py-8'>
      <svg
        className='absolute left-1/2 top-0 -translate-x-1/2 w-3 h-full z-0 pointer-events-none hidden md:block'
        width='12'
        height='100%'
        style={{ minHeight: 900, maxHeight: 1400 }}
      >
        <defs>
          <linearGradient id='timeline' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#daa56a' stopOpacity='1' />
            <stop offset='100%' stopColor='#fadabd' stopOpacity='0.8' />
          </linearGradient>
        </defs>
        <rect
          x='5'
          y='0'
          width='2'
          height='100%'
          fill='url(#timeline)'
          rx='2'
        />
      </svg>
      <div className='relative flex flex-col items-center w-full max-w-2xl mx-auto z-10'>
        {steps.map((step) => (
          <div
            key={step.key}
            className='relative flex w-full items-center justify-center mb-12 last:mb-0'
          >
            {/* Icon for desktop only */}
            <div className='flex flex-col items-center mr-10 hidden md:flex'>
              <div
                className='relative rounded-full bg-gradient-to-br from-[#18120a] to-[#232228] border-4 flex items-center justify-center shadow-[0_4px_32px_0_rgba(218,165,106,0.18)] border-[#daa56a]'
                style={{
                  width: 80,
                  height: 80,
                  boxShadow: '0 4px 32px 0 #daa56a18',
                }}
              >
                <span className='relative z-10'>{step.icon}</span>
              </div>
            </div>
            {/* Card - always visible, centered on mobile */}
            <div
              className='flex-1 z-20 bg-[#1a1510] border border-[#daa56a]/20 rounded-2xl shadow-lg px-8 py-8 min-w-[260px] max-w-2xl text-center text-[#fadabd] group mx-auto'
              style={{
                borderColor: '#daa56a',
                borderRadius: 24,
                background: '#1a1510',
              }}
            >
              <div className='font-extrabold text-2xl md:text-3xl mb-3 tracking-tight drop-shadow text-[#daa56a]'>
                {step.title}
              </div>
              <div className='text-base md:text-lg text-[#fadabd] leading-relaxed'>
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
