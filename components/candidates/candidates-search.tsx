// components/candidates/candidates-search.tsx

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, XIcon } from 'lucide-react';

export function CandidatesSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    // Reset to first page when searching
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className='relative w-full max-w-sm'>
      <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Search candidates...'
        className='pl-8 pr-10'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      {searchQuery && (
        <Button
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-9 w-9 rounded-l-none'
          onClick={handleClear}
          disabled={isPending}
        >
          <XIcon className='h-4 w-4' />
          <span className='sr-only'>Clear search</span>
        </Button>
      )}
    </div>
  );
}
