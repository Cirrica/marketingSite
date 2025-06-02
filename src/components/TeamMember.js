'use client';

export default function TeamMember({ name, role, linkedin, email }) {
  return (
    <li className='flex flex-col items-center bg-[#181818] rounded-xl p-6 gap-2 shadow-md w-full'>
      <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2'>
        {name[0]}
      </div>
      <div className='text-xl font-semibold max-w-full whitespace-nowrap overflow-x-auto'>
        {name}
      </div>
      <div className='text-gray-400 text-sm'>{role}</div>
      <div className='flex gap-3 mt-2'>
        {linkedin && (
          <a
            href={linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 hover:text-blue-600 underline'
          >
            LinkedIn
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className='text-blue-300 hover:text-blue-500 underline'
          >
            Email
          </a>
        )}
      </div>
    </li>
  );
}
