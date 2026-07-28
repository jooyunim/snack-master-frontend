import ManageSideNav from '@/app/(private)/(super-admin)/manage/components/ManageSideNav';

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-start gap-16 px-6 pb-20 pt-20 max-lg:flex-col max-lg:gap-16 max-lg:pt-6 max-sm:gap-5 max-sm:pt-2.5">
        <ManageSideNav />
        {children}
      </div>
    </div>
  );
}
