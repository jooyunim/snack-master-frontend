export const sampleKeys = {
  all: ['samples'] as const,
  lists: () => [...sampleKeys.all, 'list'] as const,
  list: () => [...sampleKeys.lists()] as const,
  details: () => [...sampleKeys.all, 'detail'] as const,
  detail: (id: number) => [...sampleKeys.details(), id] as const,
};
