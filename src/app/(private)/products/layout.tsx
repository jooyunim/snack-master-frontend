import CategorySideNav from '@/app/(private)/products/components/CategorySideNav';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-start gap-10 px-6 pb-20 pt-20 max-lg:gap-5 max-lg:pt-0 max-sm:flex-col max-sm:gap-0 max-sm:px-0 max-sm:pb-20 max-sm:pt-5">
        <CategorySideNav />
        {children}
      </div>
    </main>
  );
}
