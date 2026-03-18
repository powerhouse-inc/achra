import { PageContent } from './page-content'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * PageContent is a container component that provides consistent spacing and layout for page content
 * with variants for different use cases and supports customization via `as` and `className` props.
 *
 * The component automatically accounts for navbar spacing and provides a `with-breadcrumb` variant
 * for pages that include breadcrumb navigation.
 *
 * ### Usage:
 *
 * ```tsx
 * <PageContent>
 *   <h1>Page Title</h1>
 *   <p>Page content goes here</p>
 * </PageContent>
 * ```
 *
 * **See** [PageBackground](?path=/docs/shared-components-page-containers-pagebackground--docs) - Related component for page background styling
 */
const meta: Meta<typeof PageContent> = {
  title: 'Shared/Components/Page Containers/PageContent',
  component: PageContent,
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
      options: ['main', 'div', 'section', 'article'],
      defaultValue: 'main',
    },
    variant: {
      description: 'Layout variant for different spacing needs',
      control: 'select',
      options: ['default', 'with-breadcrumb'],
      defaultValue: 'default',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageContent>

export const Default: Story = {
  args: {
    children: (
      <div className="min-h-200 p-8">
        <h1 className="mb-4 text-4xl font-bold">Page Content</h1>
        <p className="text-muted-foreground text-lg">
          This is example content inside the PageContent component.
        </p>
      </div>
    ),
  },
}
