import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedMoneyParticles({
  style = {},
  className = '',
  zIndex = 2,
}) {
  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center ${className}`}
      style={{ zIndex, ...style }}
    >
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
    </div>
  );
}
