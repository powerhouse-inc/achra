import type { BreadcrumbItemNavigation } from '@/modules/shared/types/breadcrumb'
import type { RouteWithDynamicPages } from '@/modules/shared/types/routes'
import { withPortalFontStyles } from '../../lib/decorators'
import { Breadcrumb, PageBreadcrumbContainer } from './index'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * Breadcrumb Navigation Component
 *
 * A responsive breadcrumb navigation component that provides hierarchical navigation
 * for users to understand their current location within the application and navigate
 * back to parent pages.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Networks', href: '/networks' },
 *     { label: 'Powerhouse', href: '/network/powerhouse' },
 *     { label: 'Overview', href: '/network/powerhouse/roadmap/overview' }
 *   ]}
 * />
 * ```
 *
 * ### With Page Container
 * `PageBreadcrumbContainer` adds a fixed positioning, background styling, and responsive layout typically used in page headers.
 *
 * ```tsx
 * <PageBreadcrumbContainer>
 *   <Breadcrumb
 *     items={[
 *       { label: 'Networks', href: '/networks' },
 *       { label: 'Powerhouse', href: '/network/powerhouse' },
 *       { label: 'Overview', href: '/network/powerhouse/roadmap/overview' }
 *     ]}
 *   />
 * </PageBreadcrumbContainer>
 * ```
 */
const meta = {
  title: 'Shared/Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [withPortalFontStyles],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/roadmap/overview',
        params: {
          slug: 'powerhouse',
          roadmapSlug: 'overview',
        },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

const breadcrumbItems: BreadcrumbItemNavigation[] = [
  { label: 'Networks', href: '/networks' as RouteWithDynamicPages },
  { label: 'Powerhouse', href: '/network/powerhouse' as RouteWithDynamicPages },
  { label: 'Roadmaps', href: '/network/powerhouse/roadmaps' as RouteWithDynamicPages },
  {
    label: 'Roadmap',
    href: '/network/powerhouse/roadmap/overview' as RouteWithDynamicPages,
  },
  {
    label: 'Overview',
    href: '/network/powerhouse/roadmap/overview' as RouteWithDynamicPages,
  },
]

export const Basic: Story = {
  name: 'Breadcrumb Component',
  args: {
    maxSegmentWidthMobile: 100,
    items: breadcrumbItems,
  },
}

export const WithContainer: Story = {
  name: 'Breadcrumb with Page Container',
  render: (args) => (
    <div className="min-h-100">
      <PageBreadcrumbContainer>
        <Breadcrumb {...args} />
      </PageBreadcrumbContainer>
    </div>
  ),
  args: {
    maxSegmentWidthMobile: 100,
    items: breadcrumbItems,
  },
}
