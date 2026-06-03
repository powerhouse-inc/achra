import { SpotlightGrid } from './spotlight-grid'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/SpotlightGrid',
  component: SpotlightGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    spotlightRadius: {
      control: { type: 'range', min: 40, max: 300, step: 10 },
      description: 'Radius of the spotlight circle in px',
    },
    gridSize: {
      control: { type: 'range', min: 4, max: 80, step: 2 },
      description: 'Size of each grid cell in px',
    },
    containerSelector: {
      control: 'text',
      description: 'CSS selector passed to `closest()` to find the mouse-tracking container',
    },
    highlightOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Opacity of the highlight grid lines (0–1)',
    },
    showBaseGrid: {
      control: 'boolean',
      description: 'Whether to render a faint always-visible base grid underneath',
    },
  },
  decorators: [
    (Story) => (
      <section
        data-spotlight-container
        className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-neutral-900"
      >
        <Story />
        <p className="text-muted-foreground pointer-events-none relative z-10 text-sm select-none">
          Move your mouse over this area
        </p>
      </section>
    ),
  ],
} satisfies Meta<typeof SpotlightGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    spotlightRadius: 90,
    gridSize: 12,
    containerSelector: '[data-spotlight-container]',
    highlightOpacity: 0.5,
    showBaseGrid: false,
  },
}

export const WithBaseGrid: Story = {
  args: {
    spotlightRadius: 120,
    gridSize: 50,
    containerSelector: '[data-spotlight-container]',
    highlightOpacity: 0.45,
    showBaseGrid: true,
  },
}
