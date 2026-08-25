// 서버 전용 인증 헬퍼

import type { User } from '@/features/auth/types/auth.types';
import { ApiError } from './api';
import { apiServerFetch } from './api.server';

export async function getUser(): Promise<User | null> {
  try {
    const data = await apiServerFetch<{ user: User }>('/auth/user');
    return data.user ?? null; //지금 요청한 사용자가 로그인되어 있으면 user, 아니면 null 반환
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      //로그인 안 됨만 처리
      return null; //401이면 비로그인으로 처리
    }
    throw error; //서버 장애 등
  }
}
