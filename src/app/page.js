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
      name: 'Simeon Maman',
      role: 'CEO & Founder',
      linkedin: 'https://www.linkedin.com/in/simeon-maman-8349b62a9/',
      email: 'simeon@cirrica.com',
    },
    {
      name: 'Anthony Kercher',
      role: 'CTO & Co-founder',
      linkedin: 'https://linkedin.com/in/anthonykercher/',
      email: 'anthony@cirrica.com',
    },
    {
      name: 'George Paraskuvopoulus',
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
        className='min-h-screen flex flex-col justify-center items-center gap-12 transition-colors duration-700'
      >
        <motion.div style={{ scale, opacity }}>
          <Image
            className='invert transition duration-700'
            src='/clearMainLogoCirrica.png'
            alt='Cirrica Logo'
            width={720}
            height={152}
            priority
          />
        </motion.div>
        <div className='animate-bounce mt-10'>
          <a href='#about' aria-label='Scroll to About'>
            <svg
              className='w-8 h-8'
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
      <FadeInSection id='about' className='bg-black text-white'>
        <h2 className='text-4xl font-semibold mb-4'>About Us</h2>
        <p>we are very cool guys</p>
      </FadeInSection>
      {/* Founders Section */}
      <FadeInSection id='founders' className='bg-black text-white'>
        <h2 className='text-4xl font-semibold mb-4'>Meet the Founders</h2>
        <ul className='flex flex-col sm:flex-row gap-8 justify-center items-stretch w-full max-w-4xl'>
          {teamMembers.map((member) => (
            <TeamMember key={member.email} {...member} />
          ))}
        </ul>
      </FadeInSection>
      Contact Section
      {/* <FadeInSection id='contact' className='bg-[#111] text-white'>
        <h2 className='text-4xl font-semibold'>Contact Us</h2>
        <p className='text-lg text-gray-300'>
          We're here to help. Reach out anytime.
        </p>
        <form className='flex flex-col gap-4 w-full max-w-md'>
          <input
            type='text'
            placeholder='Your Name'
            className='p-3 border border-gray-700 rounded-lg bg-black text-white placeholder-gray-400'
          />
          <input
            type='email'
            placeholder='Your Email'
            className='p-3 border border-gray-700 rounded-lg bg-black text-white placeholder-gray-400'
          />
          <textarea
            placeholder='Your Message'
            className='p-3 border border-gray-700 rounded-lg h-32 resize-none bg-black text-white placeholder-gray-400'
          ></textarea>
          <button
            type='submit'
            className='bg-white text-black px-4 py-3 rounded-lg hover:bg-gray-300 transition'
          >
            Send Message
          </button>
        </form>
      </FadeInSection> */}
    </div>
  );
}
