import * as React from 'react'
import { cn } from '@/shared/lib/utils'

export type TotalDisplayContainerProps = React.ComponentProps<'div'>

export function TotalDisplayContainer({ className, ...props }: TotalDisplayContainerProps) {
  return (
    <div
      data-slot="total-display-container"
      className={cn('flex items-center gap-3', className)}
      {...props}
    />
  )
}

export type TotalDisplayTitleProps = React.ComponentProps<'span'>

export function TotalDisplayTitle({ className, ...props }: TotalDisplayTitleProps) {
  return (
    <span
      data-slot="total-display-title"
      className={cn('text-base/6 font-semibold', className)}
      {...props}
    />
  )
}

export type TotalDisplayContentProps = React.ComponentProps<'div'>

export function TotalDisplayContent({ className, ...props }: TotalDisplayContentProps) {
  return (
    <div
      data-slot="total-display-content"
      className={cn('bg-muted flex items-center rounded-lg px-4 py-2', className)}
      {...props}
    />
  )
}

export type TotalDisplayItemProps = React.ComponentProps<'div'>

export function TotalDisplayItem({ className, ...props }: TotalDisplayItemProps) {
  return (
    <div
      data-slot="total-display-item"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}

export type TotalDisplayValueProps = React.ComponentProps<'span'>

export function TotalDisplayValue({ className, ...props }: TotalDisplayValueProps) {
  return (
    <span
      data-slot="total-display-value"
      className={cn('text-accent-foreground text-lg/6 font-semibold', className)}
      {...props}
    />
  )
}

export type TotalDisplayDescriptionProps = React.ComponentProps<'span'>

export function TotalDisplayDescription({ className, ...props }: TotalDisplayDescriptionProps) {
  return (
    <span
      data-slot="total-display-description"
      className={cn('text-muted-foreground text-lg/6 font-medium', className)}
      {...props}
    />
  )
}

export type TotalDisplaySeparatorProps = React.ComponentProps<'div'>

export function TotalDisplaySeparator({ className, ...props }: TotalDisplaySeparatorProps) {
  return (
    <div
      data-slot="total-display-separator"
      className={cn('bg-border mx-3 h-6 w-px', className)}
      {...props}
    />
  )
}

interface TotalDisplayProps {
  primaryValue: number
  secondaryValue: number
}

export function TotalDisplay({ primaryValue, secondaryValue }: TotalDisplayProps) {
  const primaryValueFormatted = primaryValue.toLocaleString() || 0
  const secondaryValueFormatted = secondaryValue.toLocaleString() || 0
  return (
    <TotalDisplayContainer>
      <TotalDisplayTitle>Total</TotalDisplayTitle>
      <TotalDisplayContent>
        <TotalDisplayItem>
          <TotalDisplayValue>{primaryValueFormatted}</TotalDisplayValue>
          <TotalDisplayDescription>USDS</TotalDisplayDescription>
        </TotalDisplayItem>
        <TotalDisplaySeparator />
        <TotalDisplayItem>
          <TotalDisplayValue>{secondaryValueFormatted}</TotalDisplayValue>
          <TotalDisplayDescription>SKY</TotalDisplayDescription>
        </TotalDisplayItem>
      </TotalDisplayContent>
    </TotalDisplayContainer>
  )
}
