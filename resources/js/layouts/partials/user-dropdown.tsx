import React from 'react';
import { router, usePage } from '@inertiajs/react';

import { PageProps } from '@/types';
import { cn, getInitial } from '@/lib/utils';
import { authNavigation } from '@/constants/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserDropdown() {
  // hooks
  const { ziggy, user } = usePage<PageProps>().props;

  // states
  const falbackAvatar = getInitial(user.name);

  // events
  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className={cn('h-10 w-10')}>
              <AvatarImage src={user?.avatar} alt={`@${user.name}`} />
              <AvatarFallback>{falbackAvatar}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup className="block md:hidden">
            {authNavigation.map((item) => (
              <DropdownMenuItem
                key={item.href}
                onClick={() => router.get(item.href)}
                className={cn(
                  '',
                  ziggy.location === item.href && 'font-bold text-primary'
                )}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.get(route('profile.edit'))}>
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserDropdown;
