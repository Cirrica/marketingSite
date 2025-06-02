import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ContactModal({
  open,
  onClose,
  contactForm,
  contactLoading,
  handleContactChange,
  handleContactSubmit,
}) {
  return (
    <AnimatePresence>
      {open && (
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
          onClick={onClose}
        >
          <form
            className='bg-[#18171b] border border-[#daa56a]/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 min-w-[320px] max-w-xs w-full relative'
            style={{ boxShadow: '0 8px 32px #0008' }}
            onSubmit={handleContactSubmit}
            onClick={(e) => e.stopPropagation()}
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
              onClick={onClose}
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
              Contact Us
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
  );
}
