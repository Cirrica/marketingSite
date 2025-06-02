'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function FadeInSection({ children, id, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`min-h-screen flex flex-col justify-center items-center px-8 sm:px-20 py-16 gap-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}
