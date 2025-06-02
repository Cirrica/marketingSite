'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Cirrica yellow: #daa56a (from ShareButton)

export default function Navbar() {
  const pathname = usePathname();
  function NavLink({ href, children }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-4 py-2 rounded transition-all duration-200 hover:text-[#daa56a] text-[#fadabd]`}
      >
        <span className='relative z-10'>{children}</span>
        {isActive && (
          <span className='absolute left-2 right-2 -bottom-1 h-[3px] rounded bg-gradient-to-r from-[#daa56a] to-[#fadabd] z-0 animate-fade-in' />
        )}
      </Link>
    );
  }
  return (
    <nav className='w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#050506]/95 to-[#0a0a0c]/95 backdrop-blur-xl shadow-2xl sticky top-0 z-30 border-b border-[#daa56a]/30'>
      <Link
        href='/'
        className='flex items-center gap-2 text-xl font-bold tracking-tight text-[#daa56a] hover:text-[#fadabd]'
      >
        <img
          src='/clearCircleLogo.png'
          alt='Cirrica Logo'
          className='rounded-full shadow-md max-h-12 w-auto'
        />
      </Link>
      <div className='flex gap-2 md:gap-6'>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/how-it-works'>How It Works</NavLink>
        <NavLink href='/signin'>Sign In</NavLink>
        <NavLink href='/signup'>Sign Up</NavLink>
      </div>
    </nav>
  );
}
