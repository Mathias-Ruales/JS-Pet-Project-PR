export const tabs = [
  { id: 'popular', label: 'Popular' },
  { id: 'recent', label: 'Recent' },
  { id: 'total', label: 'Total' },
  { id: 'top-stars', label: 'Top 5' },
  { id: 'alpha', label: 'Alphabetical' },
] as const

export type TabId = (typeof tabs)[number]['id']
