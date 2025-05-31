import NewQuizModule from '@/modules/new-quiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Quiz',
};

const Page = () => {
  return (
    <div className="my-8 md:my-9 lg:my-10 space-y-6 md:space-y-9 lg:space-y-6">
      <NewQuizModule />
    </div>
  );
};

export default Page;
