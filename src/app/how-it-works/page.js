'use client';
import React from 'react';
import FadeInSection from '../../components/FadeInSection';
import { motion } from 'framer-motion';
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
    icon: <FaMapMarkerAlt className='text-[#daa56a] text-4xl' />,
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
    icon: <FaBook className='text-[#fadabd] text-3xl' />,
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
            regular competitions. Top performers often exceed{' '}
            <span className='text-[#daa56a] font-bold'>15–30%</span> virtual
            profit margins.
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
    icon: <FaUserGraduate className='text-[#daa56a] text-3xl' />,
    color: '#daa56a',
    description: (
      <>
        <p className='mb-2'>
          Phase 2 transitions successful Alpha participants into a rewarding,
          low-risk investing model that allows you to grow your capital
          alongside Cirrica Capital’s resources.
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
              E.g. $50 makes 25% ($12.50), our $25 makes $6.25, you get half
              ($3.12) = $15.62 total profit.
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
    icon: <FaLock className='text-[#fadabd] text-3xl' />,
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
    icon: <FaFlagCheckered className='text-[#daa56a] text-4xl' />,
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
const leftJourneySteps = [
  journeySteps[3], // Transparency & Security
];
const rightJourneySteps = [
  journeySteps[1], // Alpha
  journeySteps[2], // Beta
  journeySteps[4], // Empower
];

export default function HowItWorksPage() {
  return (
    <div className='relative min-h-screen w-full overflow-x-hidden font-[family-name:var(--font-geist-sans)] text-white scroll-smooth bg-gradient-to-br from-[#050506] to-[#0a0a0c]'>
      {/* Animated background gradient with glass overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className='fixed inset-0 -z-20 bg-gradient-to-br from-[#050506] to-[#0a0a0c]'
        aria-hidden
      />
      {/* Floating gold orb for extra vibe */}
      <motion.div
        className='pointer-events-none fixed left-1/2 top-1/4 z-0 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#daa56a]/40 via-[#fadabd]/30 to-transparent blur-3xl opacity-40 shadow-2xl'
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ translateX: '-50%' }}
      />
      {/* Subtle glass overlay for depth */}
      <div
        className='fixed inset-0 -z-10 bg-black/80 backdrop-blur-3xl'
        aria-hidden
      />
      {/* Main content - two columns, cards split */}
      <FadeInSection id='how-it-works' className='text-white py-20 md:py-32'>
        <div className='relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-start md:items-stretch'>
          {/* Left: Title, intro, and some cards */}
          <div className='flex-1 flex flex-col items-start text-left justify-start md:justify-start md:mt-0 gap-8'>
            <div className='mb-8 mt-0 md:mt-0 w-full'>
              <motion.h2
                className='text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-xl bg-gradient-to-r from-[#daa56a] to-[#fadabd] bg-clip-text text-transparent text-left'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                How It Works
              </motion.h2>
              <div className='w-full relative flex flex-row items-stretch'>
                {/* Map icon further left, absolutely positioned */}
                <span className='absolute left-[-56px] top-1/2 -translate-y-1/2'>
                  <FaMapMarkerAlt className='text-[#daa56a] text-4xl drop-shadow-lg' />
                </span>
                {/* Unified glassy card for all intro text */}
                <motion.div
                  className='w-full max-w-xl bg-gradient-to-br from-[#18120a]/90 to-[#0a0a0c]/80 border border-[#daa56a]/30 rounded-2xl shadow-xl px-8 py-8 relative backdrop-blur-xl flex flex-col items-start justify-center text-left ml-0'
                  style={{ marginLeft: '0px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
                >
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
                </motion.div>
              </div>
            </div>
            {/* Left-side cards (About Us style) */}
            <div className='flex flex-col gap-6 w-full items-start'>
              {leftJourneySteps.map((step, i) => (
                <div
                  key={step.key}
                  className='w-full relative flex flex-row items-stretch'
                >
                  {/* Lock icon further left, absolutely positioned */}
                  <span className='absolute left-[-56px] top-1/2 -translate-y-1/2'>
                    <FaLock className='text-[#daa56a] text-3xl drop-shadow-lg' />
                  </span>
                  <motion.div
                    className='w-full bg-[#120e08]/95 rounded-2xl shadow-lg p-7 flex flex-col items-start border border-[#daa56a]/20 backdrop-blur-xl text-left ml-0'
                    style={{ marginLeft: '0px' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.7,
                      ease: 'easeOut',
                    }}
                  >
                    <span className='text-2xl md:text-3xl font-extrabold text-[#daa56a] drop-shadow-lg mb-2 tracking-tight text-left'>
                      {step.title}
                    </span>
                    <div className='text-base md:text-lg font-medium text-[#fadabd] max-w-2xl drop-shadow text-left'>
                      {step.description}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            {/* Modern CTA button, visually separated */}
            <div className='w-full flex justify-start mt-2'>
              <motion.button
                className='bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-[#18120a] font-extrabold px-10 py-5 rounded-md shadow-xl text-xl md:text-2xl hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#daa56a] transition-all duration-300 border-0 focus:outline-none focus:ring-4 focus:ring-[#daa56a]/40 backdrop-blur-xl mt-4 text-left cursor-pointer'
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => (window.location.href = '/signup')}
              >
                Start Your Cirrica Journey
              </motion.button>
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
  const [activeStep, setActiveStep] = React.useState(null);
  return (
    <div className='relative w-full flex flex-col items-center min-h-[900px] py-8'>
      {/* Animated vertical journey path (SVG) - much longer, stretches beyond cards */}
      <svg
        className='absolute left-1/2 top-0 -translate-x-1/2 w-3 h-full z-0 pointer-events-none'
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
      {/* Steps as vertical milestones, staggered animation */}
      <div className='relative flex flex-col items-center w-full max-w-2xl mx-auto z-10'>
        {steps.map((step, i) => (
          <motion.div
            key={step.key}
            className='relative flex w-full items-center mb-24 last:mb-0'
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
          >
            {/* Icon, centered on the timeline, with a gold ring and soft shadow */}
            <div className='flex flex-col items-center mr-10'>
              <motion.div
                className={`relative rounded-full bg-gradient-to-br from-[#18120a] to-[#232228] border-4 flex items-center justify-center transition-all duration-300 shadow-[0_4px_32px_0_rgba(218,165,106,0.18)] ${
                  activeStep === step.key
                    ? 'scale-125 border-[#daa56a] shadow-[0_0_48px_0_#daa56acc]'
                    : 'border-[#36302d]'
                }`}
                style={{
                  borderColor: '#daa56a',
                  width: 80,
                  height: 80,
                  boxShadow:
                    activeStep === step.key
                      ? `0 0 48px 0 #daa56acc, 0 4px 32px 0 #daa56a33`
                      : '0 4px 32px 0 #daa56a18',
                }}
                animate={{ scale: activeStep === step.key ? 1.18 : 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                onMouseEnter={() => setActiveStep(step.key)}
                onMouseLeave={() => setActiveStep(null)}
                tabIndex={0}
                onFocus={() => setActiveStep(step.key)}
                onBlur={() => setActiveStep(null)}
              >
                {/* Glowing pulse */}
                <motion.span
                  className='absolute inset-0 rounded-full pointer-events-none'
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: `radial-gradient(circle, #daa56a55 0%, transparent 70%)`,
                    zIndex: 0,
                  }}
                />
                <span className='relative z-10'>{step.icon}</span>
              </motion.div>
            </div>
            {/* Card - glassy, floating, with gold border, soft shadow, and smooth hover, About Us colors */}
            <motion.div
              className='flex-1 z-20 bg-[#1a1510]/60 border border-[#daa56a]/20 rounded-2xl shadow-lg px-10 py-8 min-w-[260px] max-w-2xl text-left text-[#fadabd] backdrop-blur-2xl transition-all duration-500 group'
              style={{
                borderColor: '#daa56a',
                borderRadius: 24,
                boxShadow:
                  activeStep === step.key
                    ? '0 0 56px 0 #daa56a55, 0 8px 48px 0 #daa56a22'
                    : '0 8px 48px 0 #daa56a12',
                background: 'rgba(26,21,16,0.60)',
              }}
              whileHover={{
                scale: 1.045,
                boxShadow: '0 0 56px 0 #daa56a33, 0 8px 48px 0 #daa56a22',
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setActiveStep(step.key)}
              onMouseLeave={() => setActiveStep(null)}
              tabIndex={0}
              onFocus={() => setActiveStep(step.key)}
              onBlur={() => setActiveStep(null)}
            >
              <motion.div
                className='font-extrabold text-2xl md:text-3xl mb-3 tracking-tight drop-shadow text-[#daa56a]'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
              >
                {step.title}
              </motion.div>
              <motion.div
                className='text-base md:text-lg text-[#fadabd] leading-relaxed'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.18 + i * 0.1,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
              >
                {step.description}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- ExplorationCard component ---
function ExplorationCard({
  title,
  color,
  details,
  open,
  onClick,
  big,
  wide,
  small,
  tiny,
  preview,
}) {
  // Card size classes
  let sizeClass = 'max-w-xs';
  if (big) sizeClass = 'max-w-3xl min-h-[180px] text-3xl';
  else if (wide) sizeClass = 'max-w-2xl';
  else if (small) sizeClass = 'max-w-sm text-lg';
  else if (tiny) sizeClass = 'max-w-xs text-base';

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-black/80 to-[#18181b]/90 border-2 rounded-3xl shadow-2xl px-6 py-6 w-full min-h-[90px] cursor-pointer transition-all duration-500 group flex flex-col items-center ${sizeClass} ${
        open
          ? 'scale-105 ring-4 ring-[' + color + ']/40 z-20'
          : 'hover:scale-102'
      }`}
      style={{
        borderColor: color,
        boxShadow: open ? `0 0 40px 0 ${color}44` : undefined,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: open ? 1.08 : 1,
        boxShadow: open ? `0 0 40px 0 ${color}44` : undefined,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      tabIndex={0}
      onClick={onClick}
      aria-expanded={open}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 0 40px 0 ${color}33`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className={`font-bold mb-2 tracking-wide drop-shadow ${
          big ? 'text-4xl' : small ? 'text-2xl' : tiny ? 'text-lg' : 'text-xl'
        }`}
        style={{ color }}
      >
        {title}
      </span>
      <motion.div
        className='mt-2 w-full text-base text-[#fadabd]/90'
        initial={false}
        animate={{
          opacity: open ? 1 : 1,
          maxHeight: open ? 400 : 40,
          filter: open ? 'blur(0px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        {open ? details : <div className='truncate'>{preview}</div>}
      </motion.div>
    </motion.div>
  );
}
