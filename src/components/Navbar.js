'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Cirrica yellow: #daa56a (from ShareButton)

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  function NavLink({ href, children }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-4 py-2 rounded transition-all duration-200 hover:text-[#daa56a] text-[#fadabd] whitespace-nowrap`}
        onClick={() => setOpen(false)}
      >
        <span className='relative z-10'>{children}</span>
        {isActive && (
          <span className='absolute left-2 right-2 -bottom-1 h-[3px] rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] z-0 animate-fade-in' />
        )}
      </Link>
    );
  }
  return (
    <nav className='w-full flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#050506] to-[#0a0a0c] backdrop-blur-2xl shadow-2xl sticky top-0 z-30 border-b border-[#daa56a]/30'>
      <Link
        href='/'
        className='flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight text-[#daa56a] hover:text-[#fadabd] min-w-0'
      >
        <img
          src='/clearCircleLogo.png'
          alt='Cirrica Logo'
          className='rounded-full shadow-md max-h-9 md:max-h-12 w-auto transition-all duration-200'
        />
      </Link>
      {/* Hamburger for mobile */}
      <button
        className='md:hidden flex flex-col justify-center items-center ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#daa56a]'
        aria-label='Open navigation menu'
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block w-6 h-0.5 bg-[#daa56a] mb-1 transition-all duration-200 ${
            open ? 'rotate-45 translate-y-1.5' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#daa56a] mb-1 transition-all duration-200 ${
            open ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#daa56a] transition-all duration-200 ${
            open ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        ></span>
      </button>
      {/* Desktop links */}
      <div className='hidden md:flex gap-2 md:gap-6'>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/how-it-works'>How It Works</NavLink>
        <NavLink href='/signin'>Sign In</NavLink>
        <NavLink href='/signup'>Sign Up</NavLink>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className='absolute top-full left-0 w-full bg-gradient-to-r from-[#050506] to-[#0a0a0c] backdrop-blur-2xl shadow-2xl border-b border-[#daa56a]/30 flex flex-col items-center gap-2 py-2 z-40 md:hidden animate-fade-in'>
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/how-it-works'>How It Works</NavLink>
          <NavLink href='/signin'>Sign In</NavLink>
          <NavLink href='/signup'>Sign Up</NavLink>
        </div>
      )}
    </nav>
  );
}
