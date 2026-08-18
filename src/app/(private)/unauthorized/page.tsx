'use client';

import { useRouter } from 'next/navigation';
import EmptyState from '@/components/EmptyState';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-6 max-lg:min-h-[calc(100vh-100px)] max-sm:min-h-[calc(100vh-56px)]">
      <h1 className="sr-only">접근 권한이 없어요</h1>
      <EmptyState
        title="접근 권한이 없어요"
        description="이 페이지를 볼 수 있는 권한이 없습니다."
        buttonLabel="상품 목록으로"
        onButtonClick={() => router.push('/products')}
      />
    </main>
  );
}
