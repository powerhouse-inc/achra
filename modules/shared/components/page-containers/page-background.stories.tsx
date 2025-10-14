import { PageBackground } from './page-background'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * PageBackground is a wrapper for page content that adds a full-screen radial gradient background
 * with spacing for navigation and supports customization via `as` and `className` props.
 *
 * ### Usage:
 *
 * ```tsx
 * <PageBackground>
 *   <PageContent>
 *     <h1>Page Content</h1>
 *   </PageContent>
 * </PageBackground>
 * ```
 */
const meta: Meta<typeof PageBackground> = {
  title: 'Shared/Components/Page Containers/PageBackground',
  component: PageBackground,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      description: 'Content to be rendered inside the component',
      control: false,
    },
    className: {
      description: 'Additional CSS classes to apply to the component',
      control: 'text',
    },
    as: {
      description: 'HTML element type to render as',
      control: 'select',
      options: ['div', 'main', 'section', 'article'],
      defaultValue: 'div',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageBackground>

export const Default: Story = {
  args: {
    children: (
      <div className="min-h-200 p-8">
        <h1 className="mb-4 text-4xl font-bold">Page Content</h1>
        <p className="text-muted-foreground text-lg">
          This is example content inside the PageBackground component.
        </p>
      </div>
    ),
  },
}
