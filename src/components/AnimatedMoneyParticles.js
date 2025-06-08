import React from 'react';

export default function AnimatedMoneyParticles({
  style = {},
  className = '',
  zIndex = 2,
}) {
  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center ${className}`}
      style={{ zIndex, ...style }}
    />
  );
}
