import React from 'react';

export default function ContactButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className='fixed bottom-8 right-18 z-[1000] bg-gradient-to-r from-[#daa56a] to-[#fadabd] text-black font-bold px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#daa56a] focus:ring-offset-2'
      style={{ boxShadow: '0 4px 24px #0006' }}
      aria-label='Open Contact Form'
    >
      Contact Us
    </button>
  );
}
