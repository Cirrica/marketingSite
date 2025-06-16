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
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FoundersSection from '../components/FoundersSection';
import ContactModal from '../components/ContactModal';
import ContactButton from '../components/ContactButton';
import ShareButton from '../components/ShareButton';

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
      role: 'CTOO & Co-founder',
      linkedin: 'https://linkedin.com/in/anthonykercher/',
      email: 'anthony@cirrica.com',
    },
    {
      firstName: 'George',
      lastName: 'Paraskevopoulos',
      role: 'CPO & Co-founder',
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

  // Prevent multiple share calls
  const [isSharing, setIsSharing] = useState(false);
  const handleShare = async () => {
    if (isSharing) return;
    if (navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share({
          title: 'Cirrica',
          text: 'Check out Cirrica',
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled or error, do nothing
      } finally {
        setIsSharing(false);
      }
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

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
          access_key: '0371dc22-f1ca-4668-81a6-de987e1fe788',
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
    <div className='scroll-smooth font-[family-name:var(--font-geist-sans)] text-white'>
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
      <HeroSection
        logoRef={logoRef}
        scale={scale}
        opacity={opacity}
        logoY={logoY}
        handleArrowClick={handleArrowClick}
        handleArrowMove={handleArrowMove}
        resetArrowMagnet={resetArrowMagnet}
        arrowY={arrowY}
        arrowMagnet={arrowMagnet}
        shaftPath={shaftPath}
        leftWing={leftWing}
        rightWing={rightWing}
        className='pt-8 md:pt-16' // add more top padding
      />
      <AboutSection
        aboutRef={aboutRef}
        aboutInView={aboutInView}
        underlineScale={underlineScale}
      />
      <FoundersSection teamMembers={teamMembers} />
      <ContactButton onClick={() => setContactOpen(true)} />
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        contactForm={contactForm}
        contactLoading={contactLoading}
        handleContactChange={handleContactChange}
        handleContactSubmit={handleContactSubmit}
      />
      <ShareButton onClick={handleShare} isSharing={isSharing} />
    </div>
  );
}
