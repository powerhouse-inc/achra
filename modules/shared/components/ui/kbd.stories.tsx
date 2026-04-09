import React from 'react'
import { Kbd, KbdGroup } from './kbd'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Shadcn/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A keyboard key component for displaying keyboard shortcuts and key combinations. Supports grouping multiple keys together.',
      },
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
}

export const SingleKey: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⌃</Kbd>
      <Kbd>Space</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  ),
}

export const KeyGroup: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const CommonShortcuts: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>C</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>V</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>Z</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>⇧</Kbd>
        <span>+</span>
        <Kbd>Z</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const WindowsShortcuts: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>C</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>V</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Z</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Y</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const NavigationKeys: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Home</Kbd>
        <Kbd>End</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Page Up</Kbd>
        <Kbd>Page Down</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const FunctionKeys: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>F1</Kbd>
        <Kbd>F2</Kbd>
        <Kbd>F3</Kbd>
        <Kbd>F4</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>F5</Kbd>
        <Kbd>F6</Kbd>
        <Kbd>F7</Kbd>
        <Kbd>F8</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const ComplexCombination: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>⇧</Kbd>
        <span>+</span>
        <Kbd>⌥</Kbd>
        <span>+</span>
        <Kbd>P</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Alt</Kbd>
        <span>+</span>
        <Kbd>Del</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const InText: Story = {
  render: () => (
    <div className="space-y-2 text-center">
      <p>
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
      </p>
      <p>
        Use <Kbd>Tab</Kbd> to navigate between fields.
      </p>
      <p>
        Press <Kbd>Esc</Kbd> to close dialogs.
      </p>
    </div>
  ),
}

export const Playground: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>Custom</Kbd>
        <span>+</span>
        <Kbd>Key</Kbd>
      </KbdGroup>
    </div>
  ),
}
