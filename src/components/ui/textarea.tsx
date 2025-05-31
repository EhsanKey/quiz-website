import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-primary text-secondary  data-[error=true]:border-negative flex field-sizing-content min-h-16 w-full rounded-1 border bg-transparent p-4 text-xs font-normal outline-none disabled:cursor-not-allowed disabled:opacity-50 ',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
