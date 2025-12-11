import { ExternalLink, Globe, Link as LinkIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { type LinkElement, LinksPopover, type MediaElement } from './links-popover'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * A hover-activated dropdown menu component that displays a list of links (social media or custom links).
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { LinksPopover } from '@/modules/shared/components/links-popover'
 * ```
 *
 * ### Basic Usage with Default Button
 * ```tsx
 * <LinksPopover
 *   links={[
 *     { type: 'website', href: 'https://example.com' },
 *     { type: 'twitter', href: 'https://twitter.com/example' },
 *     { type: 'github', href: 'https://github.com/example' },
 *   ]}
 * />
 * ```
 *
 * ### Basic Usage with Custom Trigger
 * ```tsx
 * <LinksPopover
 *   links={[
 *     { type: 'website', href: 'https://example.com' },
 *     { type: 'twitter', href: 'https://twitter.com/example' },
 *   ]}
 * >
 *   <Button variant="outline">Links</Button>
 * </LinksPopover>
 * ```
 *
 * ### Usage with Custom Link Rendering
 * ```tsx
 * <LinksPopover
 *   links={[...]}
 *   renderLinkItem={(link) => (
 *     <LinksPopoverItem key={link.href} link={link} className="custom-class" />
 *   )}
 * />
 * ```
 */
const meta = {
  title: 'Shared/Components/LinksPopover',
  component: LinksPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  argTypes: {
    links: {
      description: 'Array of links to display in the popover',
      control: false,
    },
    children: {
      description:
        'Optional trigger element that opens the popover on hover. If not provided, a default button is used.',
      control: false,
    },
    renderLinkItem: {
      description:
        'Optional function to customize how each link item is rendered. Defaults to using LinksPopoverItem.',
      control: false,
    },
  },
} satisfies Meta<typeof LinksPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    links: [
      { type: 'website', href: 'https://example.com' },
      { type: 'twitter', href: 'https://twitter.com/example' },
      { type: 'github', href: 'https://github.com/example' },
    ] as MediaElement[],
  },
  render: (args) => <LinksPopover {...args} />,
}

export const AllSocialMedia: Story = {
  args: {
    links: [
      { type: 'website', href: 'https://example.com' },
      { type: 'forum', href: 'https://forum.example.com' },
      { type: 'discord', href: 'https://discord.gg/example' },
      { type: 'twitter', href: 'https://twitter.com/example' },
      { type: 'github', href: 'https://github.com/example' },
    ] as MediaElement[],
  },
  render: (args) => (
    <LinksPopover {...args}>
      <Button variant="secondary">All Social Links</Button>
    </LinksPopover>
  ),
}

export const CustomLinks: Story = {
  args: {
    links: [
      {
        href: '/network/powerhouse',
        label: 'Network Profile',
        icon: <Globe className="size-4" />,
      },
      {
        href: '/builders',
        label: 'Builders',
        icon: <LinkIcon className="size-4" />,
      },
      {
        href: 'https://external-site.com',
        label: 'External Site',
        icon: <ExternalLink className="size-4" />,
        isExternal: true,
      },
    ] as LinkElement[],
  },
  render: (args) => (
    <LinksPopover {...args}>
      <Button variant="ghost">Custom Links</Button>
    </LinksPopover>
  ),
}

export const MixedLinks: Story = {
  args: {
    links: [
      { type: 'website', href: 'https://example.com' },
      { type: 'twitter', href: 'https://twitter.com/example' },
      {
        href: '/network/powerhouse',
        label: 'Network Profile',
        icon: <Globe className="size-4" />,
      },
      {
        href: 'https://external-site.com',
        label: 'External Site',
        icon: <ExternalLink className="size-4" />,
        isExternal: true,
      },
    ] as Array<MediaElement | LinkElement>,
  },
  render: (args) => (
    <LinksPopover {...args}>
      <Button variant="outline">Mixed Links</Button>
    </LinksPopover>
  ),
}
