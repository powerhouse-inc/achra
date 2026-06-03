import { ScrollArea } from '@achra/ui/scroll-area'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ height: 200, width: 260 }}>
      <ScrollArea>
        <div style={{ height: 400 }}>
          {Array.from({ length: 20 }).map((_, index) => (
            // this is for storybook/testing purposes only
            <div key={index}>Item {index + 1}</div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}
