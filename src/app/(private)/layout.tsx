import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth.server';
import PrivateLayoutClient from './PrivateLayoutClient';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return <PrivateLayoutClient user={user}>{children}</PrivateLayoutClient>;
}
