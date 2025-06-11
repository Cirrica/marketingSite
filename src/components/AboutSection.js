import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import FadeInSection from './FadeInSection';

export default function AboutSection({
  aboutRef,
  aboutInView,
  underlineScale,
}) {
  return (
    <FadeInSection id='about' className='text-white py-20'>
      <div
        ref={aboutRef}
        className='relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center'
      >
        {/* Decorative gradient circle */}
        <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-[#fadabd] via-[#daa56a] to-transparent rounded-full blur-2xl opacity-40 pointer-events-none'></div>
        {/* Animated text reveal for About headline */}
        <AnimatePresence>
          {aboutInView && (
            <motion.h2
              className='text-4xl font-extrabold mb-6'
              style={{
                background:
                  'linear-gradient(to right, #daa56a 0%, #fadabd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              About Us
            </motion.h2>
          )}
        </AnimatePresence>
        {/* Hero statement with fade-in and hover grow */}
        <motion.p
          className='text-lg sm:text-xl font-semibold mb-8 text-[#fadabd]'
          initial={{ opacity: 0, y: 30 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          style={{ cursor: 'default' }}
        >
          <span className='font-extrabold text-[#b97a2a]'>Cirrica</span> is
          reimagining what it means to be an investor.
        </motion.p>
        {/* Visual block for mission - fade in up */}
        <motion.div
          className='w-full bg-[#1a1510]/60 rounded-2xl shadow-lg p-6 mb-8 flex flex-col items-center border border-[#daa56a]/20'
          initial={{ opacity: 0, y: 40 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          style={{ cursor: 'default' }}
        >
          <span className='inline-flex items-center gap-2 mb-3 text-[#daa56a] font-bold text-base uppercase tracking-wider'>
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
            drive to learn, the skill to grow, and the discipline to build, but
            not always the capital to get started..
          </p>
        </motion.div>
        {/* Platform features with icons - build as blocks */}
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full'
          initial='hidden'
          animate={aboutInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.6,
              },
            },
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`flex flex-col items-center bg-[#1a1510]/50 rounded-xl p-5 border border-[#fadabd]/10 ${
                i === 2 ? 'sm:col-span-2' : ''
              }`}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ cursor: 'default' }}
            >
              {i === 0 && (
                <>
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
                </>
              )}
              {i === 1 && (
                <>
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
                </>
              )}
              {i === 2 && (
                <>
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
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
        {/* Stylized quote block - fade in up */}
        <motion.div
          className='relative bg-gradient-to-r from-[#daa56a]/30 to-[#fadabd]/20 border-l-4 border-[#daa56a] rounded-xl px-6 py-4 mb-8 shadow-lg'
          initial={{ opacity: 0, y: 40 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
        >
          <span className='block text-2xl font-extrabold text-[#fadabd] mb-1'>
            No trust fund? No problem.
          </span>
          <span className='block text-[#fadabd]/90'>
            We’re creating a launchpad where knowledge and effort—not background
            or bankroll—unlock financial power.
          </span>
        </motion.div>
        {/* Closing statement - fade in up */}
        <motion.p
          className='text-base sm:text-lg text-[#fadabd] mb-2'
          initial={{ opacity: 0, y: 30 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.7, ease: 'easeOut' }}
        >
          Cirrica operates as an accessible proprietary trading firm: we test
          your ability, help you improve, and back your potential with real
          capital.
        </motion.p>
        <motion.p
          className='text-base sm:text-lg text-[#fadabd]'
          initial={{ opacity: 0, y: 30 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.7, ease: 'easeOut' }}
        >
          We’re building the future of investing into a space that is
          merit-based and radically accessible.
        </motion.p>
        {/* Decorative underline */}
        <motion.div
          className='mt-10 w-24 h-1 rounded-full bg-gradient-to-r from-[#daa56a] to-[#fadabd] opacity-70 mx-auto'
          style={{ scaleX: underlineScale, originX: 0 }}
        ></motion.div>
      </div>
    </FadeInSection>
  );
}
