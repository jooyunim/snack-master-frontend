import { useQuery } from '@tanstack/react-query';

import { sampleKeys } from '../constants/query-keys';
import { getSampleById } from '../services/sample.api';

export function useSampleDetail(id: number | null) {
  return useQuery({
    queryKey: sampleKeys.detail(id ?? 0),
    queryFn: () => getSampleById(id!),
    enabled: id !== null,
  });
}
