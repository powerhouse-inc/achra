import type { ScopeOfWork_Progress } from '@/modules/__generated__/graphql/switchboard-generated'

type RoadmapDetailsWorkProgress =
  | { __typename?: 'SOW_Binary'; done?: boolean | null }
  | { __typename?: 'SOW_Percentage'; value: number }
  | { __typename?: 'SOW_StoryPoint'; total: number; completed: number }

// Type guard helpers for RoadmapDetails workProgress
export function isStoryPointProgress(
  progress: RoadmapDetailsWorkProgress | null | undefined,
): progress is Extract<RoadmapDetailsWorkProgress, { total: number; completed: number }> {
  return (
    !!progress &&
    (progress.__typename === 'SOW_StoryPoint' || ('completed' in progress && 'total' in progress))
  )
}

export function isBinaryProgress(
  progress: RoadmapDetailsWorkProgress | null | undefined,
): progress is Extract<RoadmapDetailsWorkProgress, { done?: boolean | null }> {
  return !!progress && (progress.__typename === 'SOW_Binary' || 'done' in progress)
}

export function isPercentageProgress(
  progress: RoadmapDetailsWorkProgress | null | undefined,
): progress is Extract<RoadmapDetailsWorkProgress, { value: number }> {
  return !!progress && (progress.__typename === 'SOW_Percentage' || 'value' in progress)
}

/**
 * Calculates the progress percentage from a ScopeOfWork_Progress object
 * @param progress - The progress object to calculate percentage from
 * @returns The progress percentage as a number (0-100), rounded to nearest integer
 */
export function getProgressPercentage(
  progress: RoadmapDetailsWorkProgress | ScopeOfWork_Progress | null | undefined,
): number {
  if (!progress) return 0

  // @ts-expect-error - progress may not have value on all types, use guard
  if (isPercentageProgress(progress)) {
    return Math.round(progress.value || 0)
  }

  // @ts-expect-error - progress may not have done on all types, use guard
  if (isBinaryProgress(progress)) {
    return progress.done ? 100 : 0
  }

  // @ts-expect-error - progress may not have completed or total on all types, use guard
  if (isStoryPointProgress(progress)) {
    if (!progress.completed || !progress.total) return 0
    return Math.round((progress.completed / progress.total) * 100)
  }

  // Fallback for unknown progress types
  return 0
}
