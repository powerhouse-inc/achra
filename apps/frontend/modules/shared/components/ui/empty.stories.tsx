import { ArrowUpRight, Folder } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Shadcn/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An empty state component used to display when there is no content to show. Includes header, media, title, description, and content sections.',
      },
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <a href="#">
          Learn More <ArrowUpRight />
        </a>
      </Button>
    </Empty>
  ),
}

export const Simple: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No data available</EmptyTitle>
        <EmptyDescription>There is no data to display at this time.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}

export const WithLink: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <a href="#">
          Learn More <ArrowUpRight />
        </a>
      </Button>
    </Empty>
  ),
}

export const CustomMedia: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <div className="text-6xl">📁</div>
        </EmptyMedia>
        <EmptyTitle>No Files Found</EmptyTitle>
        <EmptyDescription>
          Upload your first file to get started with your project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Upload File</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const Playground: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>Custom Title</EmptyTitle>
        <EmptyDescription>Custom description for the empty state.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}
