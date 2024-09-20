import React from 'react';

import { cn } from '@/lib/utils';

function InputError({
  message,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <p {...props} className={cn('text-sm text-destructive', className)}>
      {message}
    </p>
  ) : null;
}

export default InputError;
