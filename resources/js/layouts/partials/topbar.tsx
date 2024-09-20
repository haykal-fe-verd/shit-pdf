import React from 'react';

import TopLink from '@/layouts/partials/toplink';
import UserDropdown from '@/layouts/partials/user-dropdown';
import { Icons } from '@/components/icons';
import ThemeToggle from '@/components/theme-toggle';

function Topbar() {
  // states
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

  return (
    <header className="border-b bg-card text-card-foreground">
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          {/* icons */}
          <div className="flex items-center gap-2">
            <Icons.Logo className="h-8 w-auto dark:fill-white" />
            <h1 className="text-xl font-bold">{appName}</h1>
          </div>

          {/* navigation */}
          <TopLink />

          {/* theme & user dropdown */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
