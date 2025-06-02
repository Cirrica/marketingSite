'use client';

export default function TeamMember({
  firstName,
  lastName,
  role,
  linkedin,
  email,
}) {
  return (
    <li className='flex flex-col items-center bg-[#1a1510]/60 rounded-2xl shadow-lg p-6 border border-[#daa56a]/20 transition hover:scale-[1.03] hover:shadow-2xl w-full min-w-[220px]'>
      <div className='mb-4'>
        <div className='relative w-20 h-20 flex items-center justify-center'>
          {/* Soft blurred gradient glow */}
          <span className='absolute inset-0 rounded-full bg-gradient-to-br from-[#fadabd] via-[#daa56a] to-[#b97a2a] blur-xl opacity-40'></span>
          {/* Main avatar circle with subtle border */}
          <span className='relative w-20 h-20 rounded-full bg-[#18120a] flex items-center justify-center border-2 border-[#daa56a]/40 shadow-lg'>
            {/* Outlined initials */}
            <span
              className='text-3xl font-extrabold'
              style={{
                WebkitTextStroke: '2px #daa56a',
                color: 'transparent',
                letterSpacing: '0.05em',
              }}
            >
              {firstName[0]}
              {lastName && lastName[0]}
            </span>
          </span>
        </div>
      </div>
      {/* Name: first and last name on one line, allow shrinking/growing */}
      <div className='text-xl font-bold text-[#fadabd] mb-1 text-center break-words w-full min-w-[220px]'>
        {firstName} {lastName}
      </div>
      <div className='text-[#daa56a] font-semibold mb-2 text-center'>
        {role}
      </div>
      <div className='flex gap-4 justify-center mt-2 w-full'>
        {linkedin && (
          <a
            href={linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#fadabd] hover:text-[#daa56a] transition underline text-base min-w-[80px] text-center'
            aria-label={`${firstName} ${lastName} LinkedIn`}
          >
            LinkedIn
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className='text-[#fadabd] hover:text-[#daa56a] transition underline text-base min-w-[80px] text-center'
            aria-label={`${firstName} ${lastName} Email`}
          >
            Email
          </a>
        )}
      </div>
    </li>
  );
}
