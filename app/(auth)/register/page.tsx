// app/(auth)/register/page.tsx

import { RegisterForm } from '@/components/auth/register-form';

export default async function RegisterPage() {
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      <RegisterForm />
    </div>
  );
}
