import { Folder } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

export function RfpEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No request for proposal found </EmptyTitle>
        <EmptyDescription>No request for proposal found for this workstream.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
