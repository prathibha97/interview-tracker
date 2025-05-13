'use client';

import dynamic from 'next/dynamic';
import { BeatLoader } from 'react-spinners';

// Dynamically import with SSR disabled
const NewVerificationForm = dynamic(
  () => import('@/components/auth/new-verification-form'),
  {
    ssr: false,
    loading: () => (
      <div className='flex justify-center items-center h-full min-h-[400px]'>
        <BeatLoader />
      </div>
    ),
  }
);

export default function NewVerificationPage() {
  return <NewVerificationForm />;
}
