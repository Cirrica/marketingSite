'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeInSection from '../components/FadeInSection';
import TeamMember from '../components/TeamMember';

export default function Home() {
  const logoRef = useRef(null);
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const teamMembers = [
    {
      firstName: 'Simeon',
      lastName: 'Maman',
      role: 'CEO & Founder',
      linkedin: 'https://www.linkedin.com/in/simeon-maman-8349b62a9/',
      email: 'simeon@cirrica.com',
    },
    {
      firstName: 'Anthony',
      lastName: 'Kercher',
      role: 'CTO & Co-founder',
      linkedin: 'https://linkedin.com/in/anthonykercher/',
      email: 'anthony@cirrica.com',
    },
    {
      firstName: 'George',
      lastName: 'Paraskuvopoulus',
      role: 'COO & Co-founder',
      linkedin: 'https://www.linkedin.com/in/george-paraskevopoulos-00b233369/',
      email: 'george@cirrica.com',
    },
  ];

  return (
    <div className='scroll-smooth font-[family-name:var(--font-geist-sans)] bg-black text-white'>
      {/* Hero Section */}
      <section
        ref={logoRef}
        className='min-h-screen flex flex-col justify-between items-center transition-colors duration-700'
      >
        <div className='flex-1 flex flex-col items-center justify-center'>
          <motion.div
            style={{ scale, opacity }}
            className='flex flex-col items-center gap-6'
          >
            <Image
              className='invert transition duration-700'
              src='/clearMainLogoCirrica.png'
              alt='Cirrica Logo'
              width={1080}
              height={228}
              priority
            />
            {/* New gradient text under the logo */}
            <div
              className='text-2xl sm:text-4xl font-bold text-center'
              style={{
                background:
                  'linear-gradient(to right, #daa56a 0%,  #fadabd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Revolutionizing accessibility to investing.
            </div>
          </motion.div>
        </div>
        {/* Move arrow to absolute bottom of the first page */}
        <div className='absolute left-0 right-0 bottom-8 flex justify-center pointer-events-none'>
          <a
            href='#about'
            aria-label='Scroll to About'
            className='pointer-events-auto'
          >
            <svg
              className='w-8 h-8 animate-bounce'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </a>
        </div>
      </section>
      {/* About me Section */}
      <FadeInSection id='about' className='bg-black text-white py-20'>
        <div className='relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center'>
          {/* Decorative gradient circle */}
          <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-[#fadabd] via-[#daa56a] to-transparent rounded-full blur-2xl opacity-40 pointer-events-none'></div>
          <h2
            className='text-4xl font-extrabold mb-6'
            style={{
              background: 'linear-gradient(to right, #daa56a 0%, #fadabd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            About Us
          </h2>
          {/* Hero statement */}
          <p className='text-lg sm:text-xl font-semibold mb-8 text-[#fadabd]'>
            <span className='font-extrabold text-[#b97a2a]'>Cirrica</span> is
            reimagining what it means to be an investor.
          </p>
          {/* Visual block for mission */}
          <div className='w-full bg-[#1a1510]/60 rounded-2xl shadow-lg p-6 mb-8 flex flex-col items-center border border-[#daa56a]/20'>
            <span className='inline-flex items-center gap-2 mb-3 text-[#daa56a] font-bold text-base uppercase tracking-wider'>
              {/* Updated checkmark icon to match the other feature icons */}
              <svg width='32' height='32' fill='none' className='mb-0'>
                <rect
                  width='32'
                  height='32'
                  rx='16'
                  fill='#daa56a'
                  fillOpacity='0.12'
                />
                <path
                  d='M11 17l4 4 6-8'
                  stroke='#daa56a'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              Our Mission
            </span>
            <p className='text-base sm:text-lg text-[#fadabd]'>
              We believe investing shouldn’t be reserved for those who have
              already built significant wealth. At Cirrica, we’re building a
              platform that opens the doors of opportunity to ambitious
              individuals—especially students and early learners—who have the
              drive to learn, the skill to grow, and the discipline to build,
              but not always the capital to get started.
            </p>
          </div>
          {/* Platform features with icons */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full'>
            <div className='flex flex-col items-center bg-[#1a1510]/50 rounded-xl p-5 border border-[#fadabd]/10'>
              <svg width='32' height='32' fill='none' className='mb-2'>
                <rect
                  width='32'
                  height='32'
                  rx='16'
                  fill='#fadabd'
                  fillOpacity='0.12'
                />
                <path
                  d='M10 22v-2a4 4 0 014-4h4a4 4 0 014 4v2'
                  stroke='#fadabd'
                  strokeWidth='2'
                />
                <circle
                  cx='16'
                  cy='12'
                  r='4'
                  stroke='#fadabd'
                  strokeWidth='2'
                />
              </svg>
              <span className='font-bold text-[#fadabd] mb-1'>
                Expert-Led Education
              </span>
              <span className='text-[#fadabd]/90 text-sm'>
                Interactive lessons and real-world financial skills.
              </span>
            </div>
            <div className='flex flex-col items-center bg-[#1a1510]/50 rounded-xl p-5 border border-[#fadabd]/10'>
              {/* Performance-Based Challenges icon */}
              <svg width='32' height='32' fill='none' className='mb-2'>
                <rect
                  width='32'
                  height='32'
                  rx='16'
                  fill='#daa56a'
                  fillOpacity='0.12'
                />
                <path
                  d='M16 22V10m0 0l-5 5m5-5l5 5'
                  stroke='#daa56a'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span className='font-bold text-[#daa56a] mb-1'>
                Performance-Based Challenges
              </span>
              <span className='text-[#daa56a]/90 text-sm'>
                Simulations and competitions to test your ability.
              </span>
            </div>
            <div className='flex flex-col items-center bg-[#1a1510]/50 rounded-xl p-5 border border-[#fadabd]/10 sm:col-span-2'>
              {/* Real Funding for Top Performers icon: same style, arrow goes up */}
              <svg width='32' height='32' fill='none' className='mb-2'>
                <rect
                  width='32'
                  height='32'
                  rx='16'
                  fill='#fadabd'
                  fillOpacity='0.12'
                />
                <path
                  d='M16 10v12m0 0l-5-5m5 5l5-5'
                  stroke='#fadabd'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span className='font-bold text-[#fadabd] mb-1'>
                Real Funding for Top Performers
              </span>
              <span className='text-[#fadabd]/90 text-sm'>
                Earn more than badges—earn capital to invest.
              </span>
            </div>
          </div>
          {/* Stylized quote block */}
          <div className='relative bg-gradient-to-r from-[#daa56a]/30 to-[#fadabd]/20 border-l-4 border-[#daa56a] rounded-xl px-6 py-4 mb-8 shadow-lg'>
            <span className='block text-2xl font-extrabold text-[#fadabd] mb-1'>
              No trust fund? No problem.
            </span>
            <span className='block text-[#fadabd]/90'>
              We’re creating a launchpad where knowledge and effort—not
              background or bankroll—unlock financial power.
            </span>
          </div>
          {/* Closing statement */}
          <p className='text-base sm:text-lg text-[#fadabd] mb-2'>
            Cirrica operates as an accessible proprietary trading firm: we test
            your ability, help you improve, and back your potential with real
            capital.
          </p>
          <p className='text-base sm:text-lg text-[#fadabd]'>
            We’re building the future of investing into a space that is
            merit-based and radically accessible.
          </p>
          {/* Decorative underline */}
          <div className='mt-10 w-24 h-1 rounded-full bg-gradient-to-r from-[#daa56a] to-[#fadabd] opacity-70 mx-auto'></div>
        </div>
      </FadeInSection>
      {/* Founders Section */}
      <FadeInSection id='founders' className='bg-black text-white'>
        <h2
          className='text-4xl font-semibold mb-8 text-center'
          style={{
            background: 'linear-gradient(to right, #daa56a 0%, #fadabd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Meet the Founders
        </h2>
        <ul className='flex flex-col sm:flex-row gap-8 justify-center items-stretch w-full max-w-4xl mx-auto'>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.email}
              firstName={member.firstName}
              lastName={member.lastName}
              role={member.role}
              linkedin={member.linkedin}
              email={member.email}
            />
          ))}
        </ul>
      </FadeInSection>
    </div>
  );
}
