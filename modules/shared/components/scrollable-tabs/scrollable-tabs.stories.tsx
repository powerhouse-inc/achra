import { TabsContent, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { ScrollableTabs, ScrollableTabsList } from './scrollable-tabs'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/ScrollableTabs',
  component: ScrollableTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollableTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollableTabs defaultValue="tab1" className="w-80">
      <ScrollableTabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Details</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </ScrollableTabsList>
      <TabsContent value="tab1">Overview content</TabsContent>
      <TabsContent value="tab2">Details content</TabsContent>
      <TabsContent value="tab3">Settings content</TabsContent>
    </ScrollableTabs>
  ),
}

export const ManyTabs: Story = {
  render: () => (
    <ScrollableTabs defaultValue="tab1" className="w-80">
      <ScrollableTabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
        <TabsTrigger value="tab5">Tab 5</TabsTrigger>
        <TabsTrigger value="tab6">Tab 6</TabsTrigger>
      </ScrollableTabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
      <TabsContent value="tab4">Content 4</TabsContent>
      <TabsContent value="tab5">Content 5</TabsContent>
      <TabsContent value="tab6">Content 6</TabsContent>
    </ScrollableTabs>
  ),
}
