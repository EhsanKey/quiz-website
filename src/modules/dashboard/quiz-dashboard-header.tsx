import PlusIcon from '@/components/icons/plus-icon';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const QuizDashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold text-2xl text-primary">Quiz Dashboard</span>
      <Link className={buttonVariants({ size: 'md' })} href="/dashboard/new-quiz">
        <PlusIcon />
        New Quiz
      </Link>
    </div>
  );
};

export default QuizDashboardHeader;
