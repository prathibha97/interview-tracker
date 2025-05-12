// components/ui/star-rating.tsx (continued)

'use client';

import * as React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

export function StarRating({
  value,
  onChange,
  className,
  size = 'md',
  readOnly = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState(0);

  const handleMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(0);
  };

  const handleClick = (index: number) => {
    if (readOnly) return;
    onChange(index);
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      case 'md':
      default:
        return 'h-5 w-5';
    }
  };

  const sizeClass = getSizeClass();

  return (
    <div
      className={cn('flex items-center', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isActive = (hoverValue || value) >= starValue;

        return (
          <StarIcon
            key={index}
            className={cn(
              sizeClass,
              'cursor-pointer transition-colors',
              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
              readOnly && 'cursor-default'
            )}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
}
