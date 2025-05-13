'use client';

import dynamic from 'next/dynamic';
import { BeatLoader } from 'react-spinners';

// Fix for named exports instead of default exports
const LoginForm = dynamic<{}>(
  () =>
    import('@/components/auth/login-form').then((mod) => ({
      default: mod.LoginForm, // Use the named export
    })),
  {
    ssr: false,
    loading: () => (
      <div className='flex justify-center items-center h-full min-h-[400px]'>
        <BeatLoader />
      </div>
    ),
  }
);

export default function LoginPage() {
  return <LoginForm />;
}
