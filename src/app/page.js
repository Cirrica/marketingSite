'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  animate,
  AnimatePresence,
} from 'framer-motion';
import FadeInSection from '../components/FadeInSection';
import TeamMember from '../components/TeamMember';

export default function Home() {
  const logoRef = useRef(null);
  const { scrollY } = useScroll();

  // Arrow morphing: sag more as you scroll
  const sag = useTransform(scrollY, [0, 300], [0, 10]); // px sag, less extreme for clarity

  // Arrow path for a clear down arrow with a sagging shaft
  const shaftPath = useTransform(sag, (s) => `M12 9 Q12 ${9 + s}, 12 19`); // vertical shaft with sag
  const leftWing = 'M12 19 L7 14';
  const rightWing = 'M12 19 L17 14';

  // For auto-bounce (scroll suggestion)
  const [arrowY, setArrowY] = React.useState(0);
  React.useEffect(() => {
    let animation;
    let direction = 1;
    function bounce() {
      setArrowY((prev) => {
        let next = prev + direction * 0.3; // even slower
        if (next > 6) direction = -1;
        if (next < 0) direction = 1;
        return next;
      });
      animation = requestAnimationFrame(bounce);
    }
    bounce();
    return () => cancelAnimationFrame(animation);
  }, []);

  // Smooth scroll to #about
  const handleArrowClick = (e) => {
    e.preventDefault();
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Parallax for logo
  const logoY = useTransform(scrollY, [0, 400], [0, 80]);

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

  // Magnetic arrow effect
  const [arrowMagnet, setArrowMagnet] = useState({ x: 0, y: 0 });
  function handleArrowMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setArrowMagnet({
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2,
    });
  }
  function resetArrowMagnet() {
    setArrowMagnet({ x: 0, y: 0 });
  }

  // Animated gradient background for hero
  const bgGradient = useTransform(
    scrollY,
    [0, 400],
    [
      'linear-gradient(120deg, #050506 0%, #0a0a0c 100%)',
      'linear-gradient(120deg, #050506 0%, #0a0a0c 100%)',
    ]
  );

  // Animated underline for About section
  const underlineScale = useTransform(scrollY, [0, 600], [0, 1]);

  // Animated text reveal for About headline
  const [aboutInView, setAboutInView] = useState(false);
  const aboutRef = useRef(null);
  React.useEffect(() => {
    function onScroll() {
      if (!aboutRef.current) return;
      const rect = aboutRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) setAboutInView(true);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Contact form modal state
  const [contactOpen, setContactOpen] = useState(false);
  // Contact form data state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  // Loading state for form submission
  const [contactLoading, setContactLoading] = useState(false);

  // Handle contact form input changes
  function handleContactChange(e) {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle contact form submit (Web3Forms integration)
  async function handleContactSubmit(e) {
    e.preventDefault();
    setContactLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '582b130b-3231-4d3e-8960-cea416ee027b',
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          subject: 'New Submission from Cirrica',
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Thank you for your message!');
        setContactForm({ name: '', email: '', message: '' });
        setContactOpen(false);
      } else {
        alert('Something went wrong. Please try again later.');
        console.error(data);
      }
    } catch (err) {
      alert('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <div className='scroll-smooth font-[family-name:var(--font-geist-sans)]   text-white'>
      {/* Animated background gradient */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: bgGradient,
          transition: 'background 1s',
        }}
        aria-hidden
      />
      {/* Hero Section */}
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
              {/* Shaft with sag */}
              <motion.path
                strokeLinecap='round'
                strokeLinejoin='round'
                d={shaftPath}
                stroke='#daa56a'
              />
              {/* Left wing */}
              <motion.path
                strokeLinecap='round'
                strokeLinejoin='round'
                d={leftWing}
                stroke='#daa56a'
              />
              {/* Right wing */}
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
      {/* About me Section */}
      <FadeInSection id='about' className='  text-white py-20'>
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
              We’re creating a launchpad where knowledge and effort—not
              background or bankroll—unlock financial power.
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
      {/* Founders Section */}
      <FadeInSection id='founders' className='  text-white mt-0 pt-0'>
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
              tilt // pass tilt prop for 3D effect
            />
          ))}
        </ul>
      </FadeInSection>
      {/* Contact Me Button (fixed bottom right) */}
      <button
        onClick={() => setContactOpen(true)}
        className='fixed bottom-8 right-8 z-[1000] bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-black font-bold px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#daa56a] focus:ring-offset-2'
        style={{ boxShadow: '0 4px 24px #0006' }}
        aria-label='Open Contact Form'
      >
        Contact Me
      </button>
      {/* Page transition fade (for future navigation) */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            key='page-fade'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'auto',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10,10,12,0.92)',
            }}
          >
            {/* Simple Contact Me Form */}
            <form
              className='bg-[#18171b] border border-[#daa56a]/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 min-w-[320px] max-w-xs w-full relative'
              style={{ boxShadow: '0 8px 32px #0008' }}
              onSubmit={handleContactSubmit}
            >
              {/* Honeypot fields for spam prevention */}
              <input
                type='hidden'
                name='subject'
                value='New Submission from Cirrica'
              />
              <input
                type='text'
                name='botcheck'
                className='hidden'
                style={{ display: 'none' }}
                tabIndex='-1'
                autoComplete='off'
              />
              <button
                type='button'
                onClick={() => setContactOpen(false)}
                className='absolute top-3 right-3 text-[#daa56a] hover:text-[#fadabd] text-2xl font-bold bg-transparent border-none outline-none cursor-pointer'
                aria-label='Close Contact Form'
              >
                ×
              </button>
              <h3
                className='text-xl font-bold mb-2 text-center'
                style={{
                  background:
                    'linear-gradient(to right, #daa56a 0%, #fadabd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Contact Me
              </h3>
              <input
                type='text'
                name='name'
                placeholder='Your Name'
                className='rounded-md px-3 py-2 bg-[#232228] text-white border border-[#daa56a]/20 focus:border-[#daa56a] outline-none transition'
                required
                value={contactForm.name}
                onChange={handleContactChange}
                disabled={contactLoading}
              />
              <input
                type='email'
                name='email'
                placeholder='Your Email'
                className='rounded-md px-3 py-2 bg-[#232228] text-white border border-[#daa56a]/20 focus:border-[#daa56a] outline-none transition'
                required
                value={contactForm.email}
                onChange={handleContactChange}
                disabled={contactLoading}
              />
              <textarea
                name='message'
                placeholder='Your Message'
                rows={4}
                className='rounded-md px-3 py-2 bg-[#232228] text-white border border-[#daa56a]/20 focus:border-[#daa56a] outline-none transition resize-none'
                required
                value={contactForm.message}
                onChange={handleContactChange}
                disabled={contactLoading}
              />
              <button
                type='submit'
                className='mt-2 py-2 rounded-md font-bold bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-black hover:opacity-90 transition flex items-center justify-center'
                disabled={contactLoading}
              >
                {contactLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
