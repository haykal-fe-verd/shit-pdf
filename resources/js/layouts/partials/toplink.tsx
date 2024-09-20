import React from 'react';
import { Link, usePage } from '@inertiajs/react';

import { PageProps } from '@/types';
import { cn } from '@/lib/utils';
import { authNavigation } from '@/constants/navigation';

function TopLink() {
  // hooks
  const { ziggy } = usePage<PageProps>().props;

  return (
    <nav
      className={cn(
        '-my-px mx-5 hidden h-full flex-1 items-center space-x-5 md:flex'
      )}
    >
      {authNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'inline-flex h-full items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium leading-5 text-muted-foreground transition duration-150 ease-in-out hover:border-muted-foreground hover:text-primary focus:border-muted-foreground focus:text-primary focus:outline-none',
            ziggy.location === item.href &&
              'border-primary font-bold text-primary'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default TopLink;
