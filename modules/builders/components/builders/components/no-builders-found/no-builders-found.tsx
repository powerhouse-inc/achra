import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

function NoBuildersFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No builders found</EmptyTitle>
        <EmptyDescription>There are no builders to display at this time.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { NoBuildersFound }
