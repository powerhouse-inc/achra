'use client'

import { AlertTriangle, Bug, Rocket, Sparkles, Tag, Wrench } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'

// ─── Types & Constants ───────────────────────────────────────────────────────

type ChangeType = 'feature' | 'improvement' | 'fix' | 'breaking'

interface Change {
  type: ChangeType
  description: string
}

interface Release {
  version: string
  date: string
  title: string
  summary: string
  changes: Change[]
}

const changeConfig: Record<
  ChangeType,
  {
    label: string
    icon: typeof Sparkles
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
  }
> = {
  feature: { label: 'Feature', icon: Sparkles, variant: 'default' },
  improvement: { label: 'Improvement', icon: Wrench, variant: 'secondary' },
  fix: { label: 'Fix', icon: Bug, variant: 'outline' },
  breaking: { label: 'Breaking', icon: AlertTriangle, variant: 'destructive' },
}

const categories = ['all', 'feature', 'improvement', 'fix', 'breaking'] as const

// ─── Mock Data ───────────────────────────────────────────────────────────────

const releases: Release[] = [
  {
    version: '2.4.0',
    date: 'April 1, 2026',
    title: 'Governance Analytics Dashboard',
    summary:
      'Major analytics update with real-time governance metrics, proposal tracking, and network health scoring.',
    changes: [
      {
        type: 'feature',
        description:
          'New governance analytics dashboard with live voting metrics and participation rates',
      },
      {
        type: 'feature',
        description: 'Network health score widget showing uptime, activity, and growth indicators',
      },
      {
        type: 'feature',
        description:
          'Proposal lifecycle tracker with timeline visualization for each governance action',
      },
      {
        type: 'improvement',
        description: 'Redesigned network listing page with improved filtering and sorting controls',
      },
      {
        type: 'improvement',
        description: 'Chart components now support responsive sizing and dark mode color schemes',
      },
      {
        type: 'fix',
        description:
          'Fixed a race condition in proposal submission that could duplicate votes under high load',
      },
      {
        type: 'fix',
        description: 'Corrected date formatting for non-UTC timezones in the activity feed',
      },
    ],
  },
  {
    version: '2.3.0',
    date: 'March 15, 2026',
    title: 'Service Marketplace Expansion',
    summary:
      'Expanded the service marketplace with operator profiles, purchase flows, and service comparison tools.',
    changes: [
      {
        type: 'feature',
        description: 'Operator profile pages with portfolio, ratings, and past engagement history',
      },
      {
        type: 'feature',
        description: 'Service purchase flow with configurable options, pricing tiers, and checkout',
      },
      {
        type: 'feature',
        description: 'Side-by-side service comparison tool for evaluating multiple providers',
      },
      {
        type: 'improvement',
        description: 'Service cards now display real-time availability indicators',
      },
      {
        type: 'improvement',
        description: 'Improved search relevance with typo tolerance and synonym matching',
      },
      {
        type: 'fix',
        description:
          'Fixed filter state not persisting when navigating between service detail pages',
      },
    ],
  },
  {
    version: '2.2.0',
    date: 'February 28, 2026',
    title: 'Builder Profiles & Budget Transparency',
    summary:
      'Launched builder profile pages with budget statement integration and contribution tracking.',
    changes: [
      {
        type: 'feature',
        description: 'Builder profile pages showing active workstreams, deliverables, and history',
      },
      {
        type: 'feature',
        description: 'Budget statement viewer with monthly/quarterly breakdown charts',
      },
      {
        type: 'improvement',
        description: 'Workstream detail pages now include deliverable completion progress bars',
      },
      {
        type: 'improvement',
        description: 'Skeleton loading states for all data-heavy sections to reduce layout shift',
      },
      {
        type: 'fix',
        description: 'Fixed incorrect currency conversion in multi-token budget displays',
      },
      { type: 'fix', description: 'Resolved sidebar collapse animation glitch on Safari' },
    ],
  },
  {
    version: '2.1.0',
    date: 'February 10, 2026',
    title: 'Dark Mode & Accessibility',
    summary:
      'Full dark mode support, WCAG 2.1 AA compliance improvements, and keyboard navigation enhancements.',
    changes: [
      {
        type: 'feature',
        description: 'Dark mode with automatic system preference detection and manual toggle',
      },
      {
        type: 'feature',
        description: 'Keyboard-navigable dropdown menus, modals, and tab interfaces',
      },
      {
        type: 'improvement',
        description: 'Color contrast ratios now meet WCAG 2.1 AA across all components',
      },
      {
        type: 'improvement',
        description: 'Focus ring styles unified across all interactive elements',
      },
      {
        type: 'improvement',
        description: 'Screen reader announcements for dynamic content updates (toasts, filters)',
      },
      {
        type: 'fix',
        description: 'Fixed tab order inconsistencies in the network dashboard sidebar',
      },
    ],
  },
  {
    version: '2.0.0',
    date: 'January 20, 2026',
    title: 'Achra Platform Launch',
    summary:
      'The initial public launch of Achra — the marketplace for global coordination. Complete rewrite with Next.js App Router.',
    changes: [
      {
        type: 'breaking',
        description: 'Complete platform rewrite — all legacy API endpoints deprecated',
      },
      {
        type: 'breaking',
        description: 'New authentication system replacing the previous wallet-only login',
      },
      {
        type: 'feature',
        description: 'Network dashboard with governance overview, builder listings, and finances',
      },
      {
        type: 'feature',
        description: 'Workstream management with roadmaps, proposals, and RFP support',
      },
      {
        type: 'feature',
        description:
          'Service marketplace for discovering and engaging governance service providers',
      },
      {
        type: 'feature',
        description: 'Responsive layout with mobile-first design and custom container system',
      },
      {
        type: 'improvement',
        description: 'Page load times reduced by 60% through server components and streaming',
      },
      {
        type: 'fix',
        description: 'Resolved memory leak in real-time WebSocket subscription handler',
      },
    ],
  },
]

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ChangelogPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('all')

  const filteredReleases = useMemo(() => {
    if (activeCategory === 'all') return releases
    return releases
      .map((release) => ({
        ...release,
        changes: release.changes.filter((c) => c.type === activeCategory),
      }))
      .filter((release) => release.changes.length > 0)
  }, [activeCategory])

  return (
    <main>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <section className="w-full border-b py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
              <Rocket className="text-primary size-5" />
            </div>
            <p className="text-primary text-sm font-semibold tracking-wider uppercase">Changelog</p>
          </div>
          <h1 className="text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            What&apos;s New in Achra
          </h1>
          <p className="text-foreground/80 mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
            Follow our journey as we build the marketplace for global coordination. Every update,
            feature, and fix — documented.
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="container">
          {/* Category Filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <Button
                  key={cat}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveCategory(cat)
                  }}
                  className="capitalize"
                >
                  {cat === 'all' ? 'All Changes' : `${changeConfig[cat].label}s`}
                </Button>
              )
            })}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="bg-border absolute top-0 bottom-0 left-[19px] hidden w-px lg:block" />

            <div className="flex flex-col gap-12">
              {filteredReleases.map((release, index) => (
                <div key={release.version} className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className="relative hidden shrink-0 lg:flex lg:w-10 lg:justify-center">
                    <div
                      className={cn(
                        'bg-background relative z-10 flex size-10 items-center justify-center rounded-full border-2',
                        index === 0 ? 'border-primary shadow-primary' : 'border-border',
                      )}
                    >
                      <Tag
                        className={cn(
                          'size-4',
                          index === 0 ? 'text-primary' : 'text-muted-foreground',
                        )}
                      />
                    </div>
                  </div>

                  {/* Release Card */}
                  <Card className="min-w-0 flex-1">
                    <CardContent>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={index === 0 ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              v{release.version}
                            </Badge>
                            {index === 0 && (
                              <Badge variant="success" className="text-xs">
                                Latest
                              </Badge>
                            )}
                          </div>
                          <h2 className="text-foreground mt-3 text-xl font-semibold sm:text-2xl">
                            {release.title}
                          </h2>
                        </div>
                        <time className="text-muted-foreground shrink-0 text-sm">
                          {release.date}
                        </time>
                      </div>

                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {release.summary}
                      </p>

                      <Separator className="my-5" />

                      {/* Grouped changes */}
                      <ul className="space-y-3">
                        {release.changes.map((change, i) => {
                          const config = changeConfig[change.type]
                          const Icon = config.icon
                          return (
                            <li key={i} className="flex items-start gap-3">
                              <Badge
                                variant={config.variant}
                                className="mt-0.5 shrink-0 gap-1 text-[10px]"
                              >
                                <Icon className="size-3" />
                                {config.label}
                              </Badge>
                              <span className="text-foreground text-sm leading-relaxed">
                                {change.description}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {filteredReleases.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground text-lg font-medium">
                No changes match this filter.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setActiveCategory('all')
                }}
              >
                Show all changes
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
