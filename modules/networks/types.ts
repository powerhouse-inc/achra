export type ChipVariant = 'oss' | 'defi'

export interface ChipProps {
  variant: ChipVariant
  children: React.ReactNode
  className?: string
}
