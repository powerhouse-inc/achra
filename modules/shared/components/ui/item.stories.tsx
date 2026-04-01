import { BadgeCheck, ChevronRight } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './item'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Shadcn/Item',
  component: Item,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An item component for displaying structured content with media, title, description, and actions. Supports various variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'muted'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Item>
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Item variant="outline" size="sm" asChild>
        <a href="#">
          <ItemMedia variant="icon">
            <BadgeCheck className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  ),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Item {...args}>
        <ItemContent>
          <ItemTitle>Outline Item</ItemTitle>
          <ItemDescription>This item has an outline variant with a border.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Item {...args}>
        <ItemContent>
          <ItemTitle>Muted Item</ItemTitle>
          <ItemDescription>This item has a muted background variant.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Item {...args}>
        <ItemContent>
          <ItemTitle>Small Item</ItemTitle>
          <ItemDescription>This is a smaller sized item with reduced padding.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const WithMedia: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Item>
        <ItemMedia variant="icon">
          <BadgeCheck className="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Item with Media</ItemTitle>
          <ItemDescription>This item includes a media section with an icon.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Item variant="outline" asChild>
        <a href="#" className="hover:bg-accent/50 transition-colors">
          <ItemMedia variant="icon">
            <BadgeCheck className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Clickable Item</ItemTitle>
            <ItemDescription>This item is rendered as a link and is clickable.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  ),
}

export const ItemGroupExample: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <ItemGroup>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>First Item</ItemTitle>
            <ItemDescription>This is the first item in the group.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Second Item</ItemTitle>
            <ItemDescription>This is the second item in the group.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Third Item</ItemTitle>
            <ItemDescription>This is the third item in the group.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Item {...args}>
        <ItemMedia variant="icon">
          <BadgeCheck className="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Playground Item</ItemTitle>
          <ItemDescription>
            This is a playground item for testing different variants and sizes.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
}
