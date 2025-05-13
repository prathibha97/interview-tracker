// app/(dashboard)/layout.tsx

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const user = await getCurrentUser();

  return (
    <div className='flex min-h-screen flex-col'>
      {/* @ts-expect-error Server Component */}
      <DashboardHeader user={user!} />
      <div className='flex flex-1'>
        <DashboardNav role={user?.role} />
        <main className='flex-1 bg-slate-50 p-6'>{children}</main>
      </div>
    </div>
  );
}
