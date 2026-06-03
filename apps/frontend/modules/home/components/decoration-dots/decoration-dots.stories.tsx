import { DecorationDots } from './decoration-dots'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/DecorationDots',
  component: DecorationDots,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    rows: { control: { type: 'number', min: 1, max: 30 } },
    columns: { control: { type: 'number', min: 1, max: 30 } },
    dotSize: { control: { type: 'number', min: 1, max: 24 } },
    gap: { control: { type: 'number', min: 2, max: 64 } },
    className: { control: 'text' },
  },
} satisfies Meta<typeof DecorationDots>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rows: 5,
    columns: 8,
    dotSize: 3,
    gap: 16,
    className: 'text-primary/40',
  },
}

export const FadeFromTop: Story = {
  args: {
    rows: 6,
    columns: 10,
    dotSize: 3,
    gap: 16,
    fade: { direction: 'top', from: 0.15, to: 1 },
    className: 'text-primary/60',
  },
}

export const FadeFromLeft: Story = {
  args: {
    rows: 6,
    columns: 6,
    dotSize: 4,
    gap: 18,
    fade: { direction: 'left', from: 0.15, to: 1 },
    className: 'text-primary/60',
  },
}

export const RadialFade: Story = {
  args: {
    rows: 9,
    columns: 13,
    dotSize: 4,
    gap: 18,
    fade: { direction: 'radial', from: 1, to: 0.05 },
    className: 'text-primary/70',
  },
}

export const DiagonalFade: Story = {
  args: {
    rows: 8,
    columns: 8,
    dotSize: 3,
    gap: 14,
    fade: { direction: 'bottom-right', from: 0.1, to: 0.7 },
    className: 'text-primary',
  },
}

export const IrregularPattern: Story = {
  args: {
    rows: 5,
    columns: 6,
    dotSize: 5,
    gap: 22,
    pattern: [
      [0.35, 0.35, null, null, null, null],
      [0.55, 0.55, 0.55, null, null, null],
      [0.8, 0.8, 0.8, 0.8, null, null],
      [1, 1, 1, 1, 1, null],
      [1, 1, 1, 1, 1, 1],
    ],
    className: 'text-primary',
  },
}

export const HybridFadeAndHoles: Story = {
  args: {
    rows: 5,
    columns: 8,
    dotSize: 3,
    gap: 14,
    fade: { direction: 'top', from: 0.1, to: 1 },
    pattern: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ],
    className: 'text-primary',
  },
}

export const MutedTint: Story = {
  args: {
    rows: 5,
    columns: 8,
    dotSize: 3,
    gap: 16,
    className: 'text-muted-foreground/50',
  },
}
