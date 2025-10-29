import { Search, X } from 'lucide-react'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import { Input } from '@/modules/shared/components/ui/input'
import { cn } from '@/modules/shared/lib/utils'
import { mockDeliverables } from '../../mock/deliverable'
import { StatusSelectDeliverable } from './key-resul-filters'
import { KeyResultItem } from './key-result-item'
import useDeliverableFilters from './useDeliverableFilters'

interface KeyResultsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyResultsModal({ isOpen, onClose }: KeyResultsModalProps) {
  const { search, statuses, onReset, setSearch, setStatuses, filteredDeliverables } =
    useDeliverableFilters({
      deliverables: mockDeliverables,
    })

  const handleClose = () => {
    onClose()
    onReset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[694px] w-full max-w-[1118px]! gap-0 overflow-hidden p-0"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="border-input flex flex-col border-b px-4 py-3">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-foreground text-lg/[120%] font-bold">
                Front-end Development
              </DialogTitle>
              <p className="text-foreground/50 text-base/6 font-semibold">Key Results</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-popover-foreground hover:text-popover-foreground/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center gap-6">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  void setSearch(e.target.value)
                }}
                className={cn(
                  'pl-10',

                  // Borders & background - override all focus styles
                  'border-accent bg-accent shadow-none',
                  'focus:border-accent focus:ring-0 focus:outline-none',
                  'focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0',
                  // Typography & color
                  'placeholder:text-accent-foreground/30 text-sm',
                  // Hide native search cancel button (Webkit)
                  '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:appearance-none',
                )}
              />
            </div>
            <div>
              <StatusSelectDeliverable
                statuses={statuses}
                setStatuses={setStatuses}
                className="w-56"
              />
            </div>
          </div>
        </DialogHeader>

        <div className="no-scrollbar h-150 overflow-y-auto px-3 pt-4 pb-15">
          {filteredDeliverables.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground text-lg">Results not found...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeliverables.map((deliverable) => (
                <div key={deliverable.id}>
                  {/* Deliverable Header */}
                  <div className="bg-accent mb-3 flex items-center justify-between rounded-md p-2">
                    <div className="flex items-center gap-1">
                      <span className="text-foreground/30 text-sm/4.5 font-semibold">
                        {deliverable.id}
                      </span>
                      <h3 className="text-foreground text-sm/5.5 font-semibold">
                        {deliverable.title}
                      </h3>
                    </div>
                    <div className="ml-1 flex">
                      <DeliverableStatusChip status={deliverable.status} />
                    </div>
                  </div>

                  {/* Key Results */}
                  <ul className="flex flex-col gap-3 px-4">
                    {deliverable.keyResults.map((keyResult) => (
                      <KeyResultItem key={keyResult.id} keyResult={keyResult} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
