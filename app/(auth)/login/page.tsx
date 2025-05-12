import { LoginForm } from '@/components/auth/login-form';

export default async function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      <LoginForm />
    </div>
  );
}
