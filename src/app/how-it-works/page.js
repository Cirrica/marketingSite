'use client';
import React from 'react';
import FadeInSection from '../../components/FadeInSection';
import {
  FaUsers,
  FaChartLine,
  FaTrophy,
  FaCog,
  FaHandshake,
  FaPlay,
} from 'react-icons/fa';

const journeySteps = [
  {
    key: 'create',
    title: 'Create',
    icon: <FaPlay className='text-[#daa56a] text-4xl' />,
    color: '#daa56a',
    description: (
      <p>
        Set up your private trading competition in minutes. Choose duration,
        virtual capital, and rules.
      </p>
    ),
  },
  {
    key: 'invite',
    title: 'Invite',
    icon: <FaUsers className='text-[#fadabd] text-3xl' />,
    color: '#fadabd',
    description: (
      <p>
        Send invitations to friends, colleagues, or community members. Private
        competitions for your specific group.
      </p>
    ),
  },
  {
    key: 'compete',
    title: 'Compete',
    icon: <FaChartLine className='text-[#daa56a] text-3xl' />,
    color: '#daa56a',
    description: (
      <p>
        Trade with real market data in a safe, simulated environment. No real
        money, just competition.
      </p>
    ),
  },
  {
    key: 'manage',
    title: 'Track',
    icon: <FaCog className='text-[#fadabd] text-3xl' />,
    color: '#fadabd',
    description: (
      <p>
        Monitor performance with real-time analytics and live leaderboards.
        Export results anytime.
      </p>
    ),
  },
  {
    key: 'results',
    title: 'Celebrate',
    icon: <FaTrophy className='text-[#daa56a] text-4xl' />,
    color: '#daa56a',
    description: (
      <p>
        Award winners with automated rankings and performance reports. You
        handle prizes, we handle the competition.
      </p>
    ),
  },
];

const leftJourneySteps = [journeySteps[1], journeySteps[3]]; // Invite & Manage
const rightJourneySteps = [
  journeySteps[0], // Create
  journeySteps[2], // Compete
  journeySteps[4], // Results
];

export default function HowItWorksPage() {
  return (
    <div className='relative min-h-screen w-full overflow-x-hidden font-[family-name:var(--font-geist-sans)] text-white bg-gradient-to-br from-[#050506] to-[#0a0a0c]'>
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
                    Simple. Private. Competitive.
                  </span>
                  <div className='w-16 h-1 rounded-full bg-gradient-to-r from-[#daa56a] via-[#fadabd] to-[#daa56a] opacity-80 my-3'></div>
                  <span className='text-base md:text-lg font-medium text-[#fadabd] max-w-2xl drop-shadow text-left'>
                    Organize stock trading competitions. Invite your community.
                    Trade with real data. No real money at risk.
                  </span>
                </div>
              </div>
            </div>
            {/* Left-side cards */}
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
            {/* CTA button */}
            <div className='w-full flex justify-start mt-2'>
              <button
                className='bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#18120a] font-extrabold px-10 py-5 rounded-md shadow-xl text-xl md:text-2xl hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#daa56a] transition-all duration-300 border-0 focus:outline-none focus:ring-4 focus:ring-[#daa56a]/40 mt-4 text-left cursor-pointer'
                onClick={() => (window.location.href = '/signup')}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Right: Timeline with remaining cards */}
          <div className='flex-1 flex flex-col items-center w-full'>
            <ExplorationMap steps={rightJourneySteps} />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}

// --- ExplorationMap component ---
function ExplorationMap({ steps }) {
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
            <div className='flex-col items-center mr-10 hidden md:flex'>
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
