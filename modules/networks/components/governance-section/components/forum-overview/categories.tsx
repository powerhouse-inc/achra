import FireIcon from '@/public/networks/governance/fire.svg'

export function Dot({ className }: { className?: string }) {
  return <span className={`inline-block size-3 rounded-full ${className}`} />
}

export interface ForumCategory {
  id: number
  category: string
  categorySlug: string
  tabLabel: string
  icon: React.ReactNode
}

export const forumCategories: ForumCategory[] = [
  {
    id: 89,
    category: 'General Discussion',
    categorySlug: 'general-discussion',
    tabLabel: 'Popular',
    icon: <FireIcon className="size-4" />,
  },
  {
    id: 68,
    category: 'New to MakerDAO',
    categorySlug: 'welcome',
    tabLabel: 'Onboarding',
    icon: <Dot className="bg-muted-foreground" />,
  },
  {
    id: 92,
    category: 'Maker Core',
    categorySlug: 'maker-core',
    tabLabel: 'Finances',
    icon: <Dot className="bg-status-success" />,
  },
  {
    id: 78,
    category: 'Alignment Conservers',
    categorySlug: 'alignment-conserver',
    tabLabel: 'Governance',
    icon: <Dot className="bg-purple" />,
  },
  {
    id: 101,
    category: 'Governance AI Tools',
    categorySlug: 'gait',
    tabLabel: 'Atlas',
    icon: <Dot className="bg-to-do" />,
  },
]
