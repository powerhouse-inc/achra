import { ArrowUp, Check, Info, Plus, Search } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group'
import { Separator } from './separator'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Shadcn/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An input group component that combines inputs with addons, buttons, and text. Supports various alignments and configurations.',
      },
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithTextAddon: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="example.com" className="!pl-1" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithButtonAddon: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="example.com" className="!pl-1" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton className="rounded-full" size="icon-xs">
                <Info />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
            <Plus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="[--radius:0.95rem]">
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" className="!h-4" />
          <InputGroupButton variant="default" className="rounded-full" size="icon-xs" disabled>
            <ArrowUp />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithStatusIndicator: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
            <Check className="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithResultsCount: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const BlockStartAddon: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>Search Query</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Enter your search..." />
        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const BlockEndAddon: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Enter your message..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
            <Plus />
          </InputGroupButton>
          <InputGroupText className="ml-auto">0/280</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const ComplexExample: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="example.com" className="!pl-1" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton className="rounded-full" size="icon-xs">
                <Info />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
            <Plus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="[--radius:0.95rem]">
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" className="!h-4" />
          <InputGroupButton variant="default" className="rounded-full" size="icon-xs" disabled>
            <ArrowUp />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
            <Check className="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const Playground: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Playground input..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs">
            <Plus />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}
