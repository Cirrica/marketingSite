import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactButton({ onClick, isSharing }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      className='fixed bottom-8 right-4 z-[1000] bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-black font-bold shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#daa56a] focus:ring-offset-2 flex items-center justify-center overflow-hidden'
      aria-label='Share Cirrica'
      disabled={isSharing}
      style={{ minWidth: 48, minHeight: 48, borderRadius: 9999 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        width: hovered ? 160 : 48,
        height: 48,
        borderRadius: hovered ? 24 : 9999,
        boxShadow: hovered
          ? '0 8px 32px #daa56a55, 0 2px 8px #fadabd55'
          : '0 4px 24px #0006',
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      <Image src='/share.svg' alt='Share' width={24} height={24} />
      <AnimatePresence>
        {hovered && (
          <motion.span
            key='share-label'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 8 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className='ml-2 text-base font-bold text-black whitespace-nowrap select-none'
            style={{ letterSpacing: 1 }}
          >
            Share
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
