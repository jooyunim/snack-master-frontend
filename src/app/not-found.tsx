'use client';

import { useRouter } from 'next/navigation';
import EmptyState from '@/components/EmptyState';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <h1 className="sr-only">페이지를 찾을 수 없어요</h1>
      <EmptyState
        title="페이지를 찾을 수 없어요"
        description={'요청하신 페이지가 존재하지 않거나\n이동되었을 수 있어요'}
        buttonLabel="상품 목록으로"
        onButtonClick={() => router.push('/products')}
      />
    </main>
  );
}
