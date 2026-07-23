import Gnb from '@/components/Gnb';

// TODO: auth 연동 시 userType / cartCount / profileName 교체
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Gnb
        userType="USER"
        cartCount={4}
        profileName="김"
        className="sticky top-0 z-10"
      />
      {children}
    </>
  );
}
