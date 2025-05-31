import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

interface FormActionsProps {
  loading: boolean;
}

const FormActions = ({ loading }: FormActionsProps) => {
  const cancelClassName = buttonVariants({
    className: 'border-primary text-tertiary',
    size: 'lg',
    variant: 'outline',
  });

  return (
    <div className="flex items-center justify-end gap-[14px]">
      <Link href="/dashboard" className={cancelClassName}>
        Cancel
      </Link>
      <Button size="lg" type="submit" disabled={loading}>
        Create Quiz
      </Button>
    </div>
  );
};

export default FormActions;
