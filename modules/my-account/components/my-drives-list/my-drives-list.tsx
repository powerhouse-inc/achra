import { HardDrive } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'

function MyDrivesList() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HardDrive aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No drives yet</EmptyTitle>
        <EmptyDescription>When you create a drive, it will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { MyDrivesList }
