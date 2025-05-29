import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chipVariants = cva('px-3 py-1 rounded-7 text-xs font-normal', {
  variants: {
    variant: {
      default: 'bg-brand text-brand-foreground',
      positive: 'bg-positive-light text-positive-dark',
      negative: 'bg-negative text-light',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ChipProps = React.ComponentProps<'span'> & VariantProps<typeof chipVariants>;

const Chip = ({ className, variant, ...props }: ChipProps) => {
  return <span className={cn(chipVariants({ variant }), className)} {...props} />;
};

export default Chip;
