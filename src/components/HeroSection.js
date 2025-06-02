import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

export default function HeroSection({
  logoRef,
  scale,
  opacity,
  logoY,
  handleArrowClick,
  handleArrowMove,
  resetArrowMagnet,
  arrowY,
  arrowMagnet,
  shaftPath,
  leftWing,
  rightWing,
}) {
  return (
    <section
      ref={logoRef}
      className='min-h-screen flex flex-col justify-between items-center transition-colors duration-700'
    >
      <div className='flex-1 flex flex-col items-center justify-center'>
        <motion.div
          style={{ scale, opacity, y: logoY }}
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
      <div className='absolute left-0 right-0 bottom-8 flex justify-center pointer-events-none'>
        <a
          href='#about'
          aria-label='Scroll to About'
          className='pointer-events-auto'
          onClick={handleArrowClick}
          onMouseMove={handleArrowMove}
          onMouseLeave={resetArrowMagnet}
          style={{ display: 'inline-block' }}
        >
          <motion.svg
            className='w-12 h-12'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
            style={{
              y: arrowY + arrowMagnet.y,
              x: arrowMagnet.x,
              filter: 'drop-shadow(0 2px 8px #daa56a88)',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
          >
            <motion.path
              strokeLinecap='round'
              strokeLinejoin='round'
              d={shaftPath}
              stroke='#daa56a'
            />
            <motion.path
              strokeLinecap='round'
              strokeLinejoin='round'
              d={leftWing}
              stroke='#daa56a'
            />
            <motion.path
              strokeLinecap='round'
              strokeLinejoin='round'
              d={rightWing}
              stroke='#daa56a'
            />
          </motion.svg>
        </a>
      </div>
    </section>
  );
}
