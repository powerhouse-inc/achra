import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Benefit {
  icon: LucideIcon
  text: ReactNode
}

interface UseCase {
  title: string
  tags: string[]
  description: ReactNode
  note?: ReactNode
  benefits: Benefit[]
}

export type { Benefit, UseCase }
