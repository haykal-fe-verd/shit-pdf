import React from 'react';

import { cn } from '@/lib/utils';

import { Card, CardContent } from '@/components/ui/card';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}
function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn('w-full pt-10', className)}>
      <div className="container mx-auto px-0 md:px-5">
        <Card className="rounded-none md:rounded-lg">
          <CardContent className="overflow-hidden p-5">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Wrapper;
