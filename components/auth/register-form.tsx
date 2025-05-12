// components/auth/register-form.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegisterSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions/auth/register';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setIsPending(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await register(values);

      if (result?.error) {
        setError(result.error);
      }

      if (result?.success) {
        setSuccess(result.success);
        form.reset();
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className='w-full max-w-md space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Create an account</h1>
        <p className='text-gray-500'>
          Enter your information to create an account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='John Doe'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='name@example.com'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='••••••••'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className='p-3 rounded-md bg-red-50 text-red-500 text-sm'>
              {error}
            </div>
          )}
          {success && (
            <div className='p-3 rounded-md bg-green-50 text-green-500 text-sm'>
              {success}
            </div>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Creating account...' : 'Register'}
          </Button>
        </form>
      </Form>

      <div className='text-center text-sm'>
        <p className='text-gray-500'>
          Already have an account?{' '}
          <Link href='/login' className='text-primary font-medium'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
