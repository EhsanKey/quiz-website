import Navbar from '@/components/Navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="mx-6 md:mx-10 lg:mx-20">{children}</div>
    </main>
  );
};

export default DashboardLayout;
