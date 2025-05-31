import EditQuizModule from '@/modules/edit-quiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Quiz',
};

type PageProps = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div className="my-8 md:my-9 lg:my-10 space-y-6 md:space-y-9 lg:space-y-6">
      <EditQuizModule id={id} />
    </div>
  );
};

export default Page;
