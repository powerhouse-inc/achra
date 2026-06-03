import { AspectRatio } from '@achra/ui/aspect-ratio'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <AspectRatio ratio={16 / 9}>
        {/* Plain <img> is fine here — @achra/ui is framework-agnostic. */}
        <img
          src="https://picsum.photos/seed/storybook/600/338"
          alt="Landscape image for aspect ratio demo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AspectRatio>
    </div>
  ),
}
