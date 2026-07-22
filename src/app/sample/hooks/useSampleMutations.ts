import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sampleKeys } from '../constants/query-keys';
import { createSample } from '../services/sample.api';
import type { CreateSampleRequest } from '../types/sample.types';

export function useSampleMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateSampleRequest) => createSample(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sampleKeys.lists() });
    },
  });

  return { createMutation };
}
