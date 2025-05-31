import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import PairArrowRightIcon from '../icons/pair-arrow-right-icon';
import Link from 'next/link';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className="font-montserrat text-primary text-sm font-normal"
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn('flex flex-wrap items-center gap-3 break-words ', className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-3', className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  href,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  href: string;
}) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Link href={href} passHref data-slot="breadcrumb-item">
      <Comp
        data-slot="breadcrumb-link"
        className={cn('transition-colors text-sm font-normal', className)}
        {...props}
      />
    </Link>
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-sm font-normal', className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <PairArrowRightIcon />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
