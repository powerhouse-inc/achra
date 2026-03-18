import { Badge } from '../ui/badge'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import { OverflowList } from './overflow-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof OverflowList> = {
  title: 'Shared/Components/OverflowList',
  component: OverflowList,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    collapseFrom: {
      control: { type: 'select' },
      options: ['start', 'end'],
    },
    minVisibleItems: {
      control: { type: 'number', min: 0, max: 10 },
    },
    alwaysRenderOverflow: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof OverflowList>

// Sample data
const sampleTags = [
  { id: 1, name: 'React', color: 'bg-blue-500' },
  { id: 2, name: 'TypeScript', color: 'bg-blue-600' },
  { id: 3, name: 'Next.js', color: 'bg-black' },
  { id: 4, name: 'Tailwind CSS', color: 'bg-cyan-500' },
  { id: 5, name: 'Storybook', color: 'bg-pink-500' },
  { id: 6, name: 'Jest', color: 'bg-red-500' },
  { id: 7, name: 'Testing Library', color: 'bg-green-500' },
  { id: 8, name: 'ESLint', color: 'bg-purple-500' },
  { id: 9, name: 'Prettier', color: 'bg-yellow-500' },
  { id: 10, name: 'Husky', color: 'bg-gray-500' },
  { id: 11, name: 'GitHub Actions', color: 'bg-gray-700' },
  { id: 12, name: 'Docker', color: 'bg-blue-700' },
]

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', avatar: 'AJ', role: 'Frontend Developer' },
  { id: 2, name: 'Bob Smith', avatar: 'BS', role: 'Backend Developer' },
  { id: 3, name: 'Carol Davis', avatar: 'CD', role: 'UI/UX Designer' },
  { id: 4, name: 'David Wilson', avatar: 'DW', role: 'DevOps Engineer' },
  { id: 5, name: 'Eva Brown', avatar: 'EB', role: 'Product Manager' },
  { id: 6, name: 'Frank Miller', avatar: 'FM', role: 'QA Engineer' },
  { id: 7, name: 'Grace Lee', avatar: 'GL', role: 'Data Scientist' },
  { id: 8, name: 'Henry Taylor', avatar: 'HT', role: 'Security Engineer' },
]

// Renderers
const tagRenderer = (item: unknown, _index: number) => {
  const tag = item as (typeof sampleTags)[0]
  return (
    <Badge key={tag.id} variant="secondary" className="whitespace-nowrap">
      {tag.name}
    </Badge>
  )
}

const tagOverflowRenderer = (items: unknown[]) => {
  const overflowTags = items as typeof sampleTags
  return (
    <Badge variant="outline" className="whitespace-nowrap">
      +{overflowTags.length} more
    </Badge>
  )
}

const userRenderer = (item: unknown, _index: number) => {
  const user = item as (typeof sampleUsers)[0]
  return (
    <div
      key={user.id}
      className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 whitespace-nowrap dark:bg-gray-800"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
        {user.avatar}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.name}</span>
        <span className="text-xs text-gray-500">{user.role}</span>
      </div>
    </div>
  )
}

const userOverflowRenderer = (items: unknown[]) => {
  const overflowUsers = items as typeof sampleUsers
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 whitespace-nowrap dark:bg-gray-800">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-medium text-white">
        +{overflowUsers.length}
      </div>
      <span className="text-sm font-medium">more users</span>
    </div>
  )
}

const skeletonRenderer = (items: unknown[]) => (
  <div className="flex gap-2">
    {Array.from({ length: Math.min(items.length, 5) }, (_, index) => (
      <div
        key={`skeleton-${Date.now()}-${index}`}
        className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
      />
    ))}
  </div>
)

const ResizableOverflowContainer = ({
  children,
  contentSize = 60,
}: {
  children: React.ReactNode
  contentSize?: number
}) => (
  <ResizablePanelGroup direction="horizontal" className="w-full">
    <ResizablePanel defaultSize={contentSize}>
      <div className="h-full rounded-lg border p-4">{children}</div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={100}>
      <div className="flex h-full items-center justify-center bg-gray-50 p-4 text-sm text-gray-500">
        Drag to resize
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
)

// Basic story
export const Default: Story = {
  args: {
    items: sampleTags.slice(0, 6),
    itemRenderer: tagRenderer,
    overflowRenderer: tagOverflowRenderer,
    collapseFrom: 'end',
    minVisibleItems: 2,
    className: 'w-full',
  },
  render: (args) => (
    <ResizableOverflowContainer>
      <OverflowList {...args} />
    </ResizableOverflowContainer>
  ),
}

export const WithSkeleton: Story = {
  args: {
    items: sampleTags.slice(0, 8),
    itemRenderer: tagRenderer,
    overflowRenderer: tagOverflowRenderer,
    skeletonRenderer,
    collapseFrom: 'end',
    minVisibleItems: 2,
    className: 'w-full',
  },
  render: (args) => (
    <ResizableOverflowContainer>
      <OverflowList {...args} />
    </ResizableOverflowContainer>
  ),
}

export const CollapseFromStart: Story = {
  args: {
    items: sampleTags.slice(0, 8),
    itemRenderer: tagRenderer,
    overflowRenderer: tagOverflowRenderer,
    collapseFrom: 'start',
    minVisibleItems: 2,
    className: 'w-full',
  },
  render: (args) => (
    <ResizableOverflowContainer>
      <OverflowList {...args} />
    </ResizableOverflowContainer>
  ),
}

export const Users: Story = {
  args: {
    items: sampleUsers.slice(0, 6),
    itemRenderer: userRenderer,
    overflowRenderer: userOverflowRenderer,
    collapseFrom: 'end',
    minVisibleItems: 1,
    className: 'w-full',
  },
  render: (args) => (
    <ResizableOverflowContainer>
      <OverflowList {...args} />
    </ResizableOverflowContainer>
  ),
}
