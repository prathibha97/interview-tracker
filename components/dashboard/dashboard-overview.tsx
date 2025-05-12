// components/dashboard/dashboard-overview.tsx

'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface DashboardOverviewProps {
  title: string;
  data: any[];
  viewAllHref: string;
}

export function DashboardOverview({
  title,
  data,
  viewAllHref,
}: DashboardOverviewProps) {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {data.length === 0 ? (
          <p className='text-center text-muted-foreground py-6'>
            No data available
          </p>
        ) : (
          data.map((item) => {
            // Format based on data type
            if (item.startTime) {
              // Interview
              return (
                <div
                  key={item.id}
                  className='flex items-center justify-between border-b border-muted pb-2'
                >
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {item.candidate?.name || 'No candidate'} - {item.type}
                    </p>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {formatDistanceToNow(new Date(item.startTime), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              );
            } else {
              // Candidate
              return (
                <div
                  key={item.id}
                  className='flex items-center justify-between border-b border-muted pb-2'
                >
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {item.position?.title || 'No position'} - {item.status}
                    </p>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              );
            }
          })
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant='outline' className='w-full'>
          <Link href={viewAllHref}>View all</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
