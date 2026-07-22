// BE 연동 시 참고용 fetch 호출 예시

import { CreateSampleRequest, Sample } from '../types/sample.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function getSampleList(): Promise<Sample[]> {
  const response = await fetch(`${API_BASE}/samples`, { cache: 'no-store' });
  return response.json();
}

export async function getSampleById(id: number): Promise<Sample> {
  const response = await fetch(`${API_BASE}/sample/${id}`, {
    cache: 'no-store',
  });
  return response.json();
}

export async function createSample(data: CreateSampleRequest): Promise<Sample> {
  const response = await fetch(`${API_BASE}/samples`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
