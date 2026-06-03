import { cn } from '@/modules/shared/lib/utils'
import {
  borderedVariant,
  capsuleVariant,
  compactVariant,
  filledVariant,
  underlineVariant,
  type VariantColorType,
  type VariantSizeType,
  type VariantType,
} from './variant-styles'
import type { ComponentProps, ElementType } from 'react'

type GenericChipProps<E extends ElementType> = {
  as?: E
  children: React.ReactNode
  variant: VariantType
  color: VariantColorType
  size?: VariantSizeType
} & ComponentProps<E>

function getVariantClassesByVariant(
  variant: VariantType,
  color: VariantColorType,
  size: VariantSizeType,
): string {
  switch (variant) {
    case 'filled':
      return filledVariant({ size, color })
    case 'bordered':
      return borderedVariant({ size, color })
    case 'compact':
      return compactVariant({ size, color })
    case 'underline':
      return underlineVariant({ size, color })
    case 'capsule':
      return capsuleVariant({ size, color })
  }
}

function GenericChip<E extends ElementType>({
  as: Element = 'div',
  children,
  variant,
  color,
  size = 'default',
  className,
  ...props
}: GenericChipProps<E>) {
  return (
    <Element
      className={cn(
        'inline-flex w-fit items-center whitespace-nowrap',
        getVariantClassesByVariant(variant, color, size),
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  )
}

export { GenericChip }
