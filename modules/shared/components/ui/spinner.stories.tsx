import React from 'react'
import { Item, ItemContent, ItemMedia, ItemTitle } from './item'
import { Spinner } from './spinner'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Shadcn/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A spinner component for indicating loading states. Uses the Loader2Icon from Lucide React with a spinning animation.',
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Spinner />,
}

export const Small: Story = {
  render: () => <Spinner className="size-3" />,
}

export const Medium: Story = {
  render: () => <Spinner className="size-4" />,
}

export const Large: Story = {
  render: () => <Spinner className="size-6" />,
}

export const ExtraLarge: Story = {
  render: () => <Spinner className="size-8" />,
}

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-4 py-2">
        <Spinner className="size-4" />
        Loading...
      </button>
      <button className="border-input bg-background inline-flex items-center gap-2 rounded-md border px-4 py-2">
        <Spinner className="size-4" />
        Processing
      </button>
    </div>
  ),
}

export const InItem: Story = {
  render: () => (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Spinner />
        <span>Loading content...</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner className="size-3" />
        <span className="text-muted-foreground text-sm">Saving changes...</span>
      </div>
    </div>
  ),
}

export const Centered: Story = {
  render: () => (
    <div className="flex h-32 w-full items-center justify-center">
      <Spinner className="size-6" />
    </div>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <div className="flex gap-4">
      <Spinner className="text-primary size-6" />
      <Spinner className="text-destructive size-6" />
      <Spinner className="size-6 text-green-500" />
      <Spinner className="size-6 text-blue-500" />
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="w-full max-w-sm rounded-lg border p-6">
      <div className="flex items-center gap-3">
        <Spinner className="size-5" />
        <div>
          <h3 className="font-medium">Uploading file...</h3>
          <p className="text-muted-foreground text-sm">Please wait while we process your file.</p>
        </div>
      </div>
    </div>
  ),
}

export const Playground: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Spinner className="size-5" />
      <span className="text-muted-foreground text-sm">Custom spinner size</span>
    </div>
  ),
}
