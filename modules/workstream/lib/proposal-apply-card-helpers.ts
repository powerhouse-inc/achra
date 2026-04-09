const tagVariantOptions = [
  'yellow',
  'success',
  'progress',
  'destructive',
  'purple',
  'warning',
] as const

type TagVariant = (typeof tagVariantOptions)[number]

function getTagVariant(tag: string): TagVariant {
  return tagVariantOptions[
    tag.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % tagVariantOptions.length
  ]
}

export { getTagVariant }
export type { TagVariant }
