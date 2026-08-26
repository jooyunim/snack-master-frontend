import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getDashboardSummary } from '../services/purchase.api';
import { dashboardKeys } from '../constants/query-keys';
import type { DashboardSummary } from '../types/purchase.types';

type DashboardSummaryOptions = Omit<
  UseQueryOptions<DashboardSummary, Error, DashboardSummary>,
  'queryKey' | 'queryFn'
>;

export function useDashboardSummary(options?: DashboardSummaryOptions) {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: getDashboardSummary,
    staleTime: 5 * 60 * 1000, // 기본값
    ...options, // 호출부 옵션이 기본값을 덮음
  });
}
