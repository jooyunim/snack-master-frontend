import { useQuery } from '@tanstack/react-query';

import { sampleKeys } from '../constants/query-keys';
import { getSampleList } from '../services/sample.api';

export function useSampleList() {
  return useQuery({
    queryKey: sampleKeys.list(),
    queryFn: getSampleList,
  });
}
