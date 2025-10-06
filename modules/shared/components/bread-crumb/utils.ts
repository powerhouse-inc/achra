export const MAX_ALLOWED_WIDTH = 250
export const MAX_SEGMENT_WIDTH_MOBILE_DEFAULT = 100
export const THREE_DOTS_WIDTH = 60

export const getTextWidth = (text: string, font: string) => {
  if (typeof document === 'undefined') return 0
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return 0
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

export const mobileRecommendedSegmentWidth = (mounted: boolean, elementWidths: number[]) =>
  mounted ? Math.max(10, (elementWidths[0] ?? 0) - (elementWidths[1] ?? 0) - 64 - 16) : undefined
