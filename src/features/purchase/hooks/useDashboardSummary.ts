import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../services/purchase.api';
import { dashboardKeys } from '../constants/query-keys';

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: getDashboardSummary,
    staleTime: 5 * 60 * 1000,
  });
}
