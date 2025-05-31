import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center px-4 py-2 gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none w-fit',
  {
    variants: {
      variant: {
        default: 'bg-brand text-brand-foreground rounded-2',
        outline: 'border border-brand rounded-2 bg-transparent text-brand',
        ghost: 'bg-transparent',
      },
      size: {
        default: 'h-9 md:h-10 text-sm font-medium ',
        icon: 'h-fit w-fit p-2',
        md: 'h-10 text-base font-medium',
        lg: 'h-11 text-base font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
