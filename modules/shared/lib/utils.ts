import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNumeric(value: unknown): value is number | bigint {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  return typeof value === 'bigint'
}
