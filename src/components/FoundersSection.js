import React from 'react';
import FadeInSection from './FadeInSection';
import TeamMember from './TeamMember';

export default function FoundersSection({ teamMembers }) {
  return (
    <FadeInSection id='founders' className='text-white mt-0 pt-0'>
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
            tilt
          />
        ))}
      </ul>
    </FadeInSection>
  );
}
