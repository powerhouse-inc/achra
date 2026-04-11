'use client'

import {
  ArrowRight,
  Briefcase,
  Clock,
  Globe,
  GraduationCap,
  Heart,
  Laptop,
  MapPin,
  Palmtree,
  Search,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Separator } from '@/modules/shared/components/ui/separator'
import type { Route } from 'next'

// ─── Mock Data ───────────────────────────────────────────────────────────────

type Department = 'Engineering' | 'Design' | 'Product' | 'Operations'

interface Job {
  id: string
  title: string
  department: Department
  location: string
  type: string
  level: string
  salary: string
  description: string
  posted: string
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Smart Contract Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$150k – $200k',
    description:
      'Design and implement smart contracts for decentralized governance protocols. Deep knowledge of Solidity and EVM required.',
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$120k – $170k',
    description:
      'Build and maintain our Next.js web platform, integrating with blockchain infrastructure and real-time data feeds.',
    posted: '5 days ago',
  },
  {
    id: '3',
    title: 'DevOps & Infrastructure Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$140k – $185k',
    description:
      'Own our cloud infrastructure, CI/CD pipelines, and monitoring systems. Kubernetes and Terraform experience preferred.',
    posted: '1 week ago',
  },
  {
    id: '4',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$110k – $155k',
    description:
      'Shape the visual identity of Achra and design intuitive interfaces for complex governance workflows.',
    posted: '3 days ago',
  },
  {
    id: '5',
    title: 'UX Researcher',
    department: 'Design',
    location: 'Amsterdam, NL (Hybrid)',
    type: 'Full-time',
    level: 'Mid',
    salary: '$95k – $130k',
    description:
      'Conduct user research to uncover insights that drive product decisions. Experience with DAO tooling or Web3 UX is a plus.',
    posted: '1 week ago',
  },
  {
    id: '6',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$135k – $175k',
    description:
      'Define product strategy and roadmap for our governance marketplace. Experience shipping 0→1 products in fast-paced environments.',
    posted: '4 days ago',
  },
  {
    id: '7',
    title: 'Technical Writer',
    department: 'Product',
    location: 'Remote',
    type: 'Part-time',
    level: 'Mid',
    salary: '$60k – $80k',
    description:
      'Create developer documentation, API guides, and educational content for our decentralized governance platform.',
    posted: '6 days ago',
  },
  {
    id: '8',
    title: 'Community & Partnerships Lead',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$100k – $140k',
    description:
      'Grow and nurture our community of network operators. Build strategic partnerships with DAOs and protocol teams.',
    posted: '1 day ago',
  },
  {
    id: '9',
    title: 'Business Development Manager',
    department: 'Operations',
    location: 'Amsterdam, NL (Hybrid)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$120k – $160k',
    description:
      'Identify and close enterprise deals for our governance-as-a-service offering. Web3 BD experience strongly preferred.',
    posted: '2 weeks ago',
  },
]

const departments: Department[] = ['Engineering', 'Design', 'Product', 'Operations']

const benefits = [
  {
    icon: Globe,
    title: 'Remote-First',
    description: 'Work from anywhere in the world. We have team members across 12+ countries.',
  },
  {
    icon: Zap,
    title: 'Competitive Equity',
    description:
      'Meaningful token allocation so you share in the upside of what we build together.',
  },
  {
    icon: GraduationCap,
    title: 'Learning Budget',
    description: '$2,500/year for conferences, courses, and books to keep growing your skills.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description:
      'Comprehensive health coverage and a monthly wellness stipend for gym, therapy, or more.',
  },
  {
    icon: Palmtree,
    title: 'Flexible Time Off',
    description: 'Minimum 25 days PTO plus local holidays. We trust you to manage your own time.',
  },
  {
    icon: Laptop,
    title: 'Home Office Setup',
    description: '$2,000 stipend for your home office plus the latest MacBook Pro or equivalent.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Radical Transparency',
    description:
      'We operate in the open. Our governance, finances, and decision-making are visible to everyone.',
  },
  {
    icon: Sparkles,
    title: 'Ship with Purpose',
    description:
      'Every feature we build solves a real coordination problem. We move fast but always with intention.',
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description:
      'We build for and with our community. Feedback loops are short and contributor input shapes the roadmap.',
  },
]

const stats = [
  { label: 'Open Positions', value: '9' },
  { label: 'Team Members', value: '45+' },
  { label: 'Countries', value: '12' },
]

// ─── Page Component ──────────────────────────────────────────────────────────

export default function CareersPage() {
  const [search, setSearch] = useState('')
  const [activeDepartment, setActiveDepartment] = useState<Department | 'All'>('All')

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDepartment = activeDepartment === 'All' || job.department === activeDepartment
      const matchesSearch =
        search === '' ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      return matchesDepartment && matchesSearch
    })
  }, [search, activeDepartment])

  return (
    <main className="-mt-18 sm:-mt-24.5">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0118] via-[#1e0a38] to-[#0f0118] pt-32 pb-20 sm:pt-44 sm:pb-28">
        <div className="relative z-10 container">
          <Badge className="border-primary/30 bg-primary/10 text-primary mb-6">
            We&apos;re hiring
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Build the Future of Global Coordination
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Join a passionate, remote-first team creating the marketplace that powers decentralized
            governance for organizations worldwide.
          </p>

          <div className="mt-10 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(122,58,255,0.25),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(142,85,234,0.15),transparent_40%)]" />
      </section>

      {/* ── Open Positions ────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="container">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Open Positions
          </h2>
          <p className="text-muted-foreground mt-3 sm:text-lg">
            Find the role that fits your skills and ambitions.
          </p>

          {/* Search + Filters */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                placeholder="Search roles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeDepartment === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setActiveDepartment('All')
                }}
              >
                All
              </Button>
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={activeDepartment === dept ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveDepartment(dept)
                  }}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="group transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant="secondary">{job.department}</Badge>
                    <span className="text-muted-foreground shrink-0 text-xs">{job.posted}</span>
                  </div>

                  <h3 className="text-foreground mt-3 text-lg font-semibold">{job.title}</h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-3.5" />
                      {job.level}
                    </span>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <span className="text-foreground text-sm font-semibold">{job.salary}</span>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      Apply
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-lg font-medium">
                No positions match your search.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch('')
                  setActiveDepartment('All')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────── */}
      <section className="bg-secondary/50 w-full py-16 sm:py-20 lg:py-24">
        <div className="container">
          <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Why You&apos;ll Love Working Here
            </h2>
            <p className="text-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              We invest in our people so they can do the best work of their careers.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-card border-0 shadow-xs">
                <CardContent>
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                    <benefit.icon className="text-primary size-5" />
                  </div>
                  <h3 className="text-foreground mt-4 text-base font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="container">
          <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What Drives Us
            </h2>
            <p className="text-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              Our values shape how we build, collaborate, and grow as a team.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="bg-primary/10 mx-auto flex size-14 items-center justify-center rounded-2xl">
                  <value.icon className="text-primary size-7" />
                </div>
                <h3 className="text-foreground mt-5 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-secondary/30 w-full border-t py-16 sm:py-20 lg:py-24">
        <div className="container text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Don&apos;t see the right role?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg">
            We&apos;re always looking for exceptional people. Send us your resume and we&apos;ll
            reach out when a matching position opens.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href={'/contact' as Route}>
              Send a General Application
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
