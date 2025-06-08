import React, { useRef, useEffect } from 'react';

// Move SVG icon definitions here to avoid circular import
export const DollarBill = () => (
  <svg
    width='20'
    height='12'
    viewBox='0 0 20 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      x='1'
      y='1'
      width='18'
      height='10'
      rx='2'
      fill='#fadabd'
      stroke='#daa56a'
      strokeWidth='1.5'
    />
    <circle cx='10' cy='6' r='2' fill='#daa56a' />
  </svg>
);
export const Coin = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      cx='7'
      cy='7'
      r='6'
      fill='#daa56a'
      stroke='#fadabd'
      strokeWidth='1.5'
    />
    <text
      x='7'
      y='10'
      textAnchor='middle'
      fontSize='7'
      fill='#0a0a0c'
      fontWeight='bold'
    >
      ¢
    </text>
  </svg>
);
const ICONS = [DollarBill, Coin];

/**
 * AnimatedMoneyParticles - Efficient, smooth, and less intensive SVG icon animation for Cirrica
 * - Uses requestAnimationFrame and refs for animation, not React state
 * - Accepts props for size, count, and style overrides
 */
export default function AnimatedMoneyParticles({
  count = 6,
  style = {},
  className = '',
  iconSize = 44,
  area = 300,
  zIndex = 2,
}) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  // Particle data: {x, y, dx, dy, Icon, size, color, ...}
  const particles = useRef([]);
  // Animation config
  const FPS = 60; // Lowered for efficiency
  const MIN_DIST = 60;
  const REPULSION = 0.012;
  const OUTWARD_EASE_STEP = 0.025;
  const OUTWARD_LERP = 0.22;
  const RANDOM_STEP = 0.0015;
  const MOVE_LIMIT = 0.045;
  const DAMPING = 0.98;
  const MARGIN = 12;

  // Init particles only once
  useEffect(() => {
    function mulberry32(seed) {
      return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(123456);
    particles.current = Array.from({ length: count }, (_, i) => {
      const Icon = ICONS[i % ICONS.length];
      return {
        id: i,
        Icon,
        x: 50,
        y: 50,
        dx: (rand() - 0.5) * 0.09,
        dy: (rand() - 0.5) * 0.09,
        size: iconSize + rand() * 11.5,
        color: i % 2 === 0 ? '#daa56a' : '#fadabd',
        targetX: rand() * (100 - 2 * MARGIN) + MARGIN,
        targetY: rand() * (100 - 2 * MARGIN) + MARGIN,
        progress: 0,
      };
    });
  }, [count, iconSize]);

  // Animation loop (no React state)
  useEffect(() => {
    let raf;
    let lastTime = performance.now();
    const interval = 1000 / FPS;
    function applyRepulsion(ps) {
      return ps.map((p, i) => {
        let dxTotal = 0,
          dyTotal = 0;
        ps.forEach((other, j) => {
          if (i === j) return;
          const dx = (p.x - other.x) * 2;
          const dy = (p.y - other.y) * 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MIN_DIST && dist > 0.01) {
            const force = (MIN_DIST - dist) * REPULSION;
            dxTotal += (dx / dist) * force;
            dyTotal += (dy / dist) * force;
          }
        });
        return { ...p, dx: p.dx + dxTotal, dy: p.dy + dyTotal };
      });
    }
    function animate(now) {
      if (now - lastTime >= interval) {
        let ps = particles.current;
        ps = applyRepulsion(ps);
        particles.current = ps.map((p) => {
          let { x, y, dx, dy, targetX, targetY, progress } = p;
          // Outward animation
          if (progress < 1) {
            const newProgress = Math.min(progress + OUTWARD_EASE_STEP, 1);
            const ease = 1 - Math.pow(1 - newProgress, 2);
            x = x + (50 + (targetX - 50) * ease - x) * OUTWARD_LERP;
            y = y + (50 + (targetY - 50) * ease - y) * OUTWARD_LERP;
            progress = newProgress;
          } else {
            if (x + dx > 100 - MARGIN || x + dx < MARGIN) dx = -dx * 0.7;
            if (y + dy > 100 - MARGIN || y + dy < MARGIN) dy = -dy * 0.7;
            dx += (Math.random() - 0.5) * RANDOM_STEP;
            dy += (Math.random() - 0.5) * RANDOM_STEP;
            dx = Math.max(-MOVE_LIMIT, Math.min(MOVE_LIMIT, dx));
            dy = Math.max(-MOVE_LIMIT, Math.min(MOVE_LIMIT, dy));
            x = x + dx * DAMPING;
            y = y + dy * DAMPING;
            x = Math.max(MARGIN, Math.min(100 - MARGIN, x));
            y = Math.max(MARGIN, Math.min(100 - MARGIN, y));
          }
          return { ...p, x, y, dx, dy, progress };
        });
        // Directly update DOM
        if (containerRef.current) {
          particles.current.forEach((p, i) => {
            const el = particlesRef.current[i];
            if (el) {
              el.style.left = `${p.x}%`;
              el.style.top = `${p.y}%`;
              el.style.width = `${p.size}px`;
              el.style.height = `${p.size}px`;
              el.style.filter = `drop-shadow(0 0 18px ${p.color}88) drop-shadow(0 0 36px ${p.color}44)`;
            }
          });
        }
        lastTime = now;
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex, ...style }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const p = particles.current[i] || {};
        const Icon = p.Icon || ICONS[i % ICONS.length];
        return (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            style={{
              position: 'absolute',
              left: `${p.x || 50}%`,
              top: `${p.y || 50}%`,
              width: `${p.size || iconSize}px`,
              height: `${p.size || iconSize}px`,
              filter: `drop-shadow(0 0 18px ${
                p.color || '#daa56a'
              }88) drop-shadow(0 0 36px ${p.color || '#daa56a'}44)`,
              transition: 'filter 0.2s',
              zIndex,
              pointerEvents: 'none',
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
}
