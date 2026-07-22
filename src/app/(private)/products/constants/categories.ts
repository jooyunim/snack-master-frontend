export type CategoryChild = {
  label: string;
  slug: string;
};

export type CategoryItem = {
  label: string;
  slug: string;
  children?: CategoryChild[];
};

export const CATEGORIES: CategoryItem[] = [
  { label: '스낵', slug: 'snack' },
  {
    label: '음료',
    slug: 'drink',
    children: [
      { label: '청량 ∙ 탄산 음료', slug: 'soda' },
      { label: '과즙음료', slug: 'juice' },
      { label: '에너지음료', slug: 'energy' },
      { label: '이온음료', slug: 'ion' },
      { label: '건강음료', slug: 'health' },
    ],
  },
  { label: '생수', slug: 'water' },
  { label: '간편식', slug: 'convenience' },
  { label: '신선식', slug: 'fresh' },
  { label: '원두커피', slug: 'coffee' },
  { label: '비품', slug: 'supplies' },
];

export function findCategory(slug: string) {
  return CATEGORIES.find((item) => item.slug === slug);
}

export function findSubCategory(categorySlug: string, subSlug: string) {
  const category = findCategory(categorySlug);
  return category?.children?.find((child) => child.slug === subSlug);
}
