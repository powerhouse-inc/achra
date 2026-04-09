import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ArrowLeft, Search, X } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import { Input } from '@/modules/shared/components/ui/input'
import { cn } from '@/modules/shared/lib/utils'
import { StatusSelectDelivarableDrawer, StatusSelectDeliverable } from './key-result-filters'
import { KeyResultItem } from './key-result-item'
import useDeliverableFilters from './use-deliverable-filters'

interface KeyResultsModalProps {
  isOpen: boolean
  onClose: () => void
  deliverables: ScopeOfWork_Deliverable[]
}

export function KeyResultsModal({ isOpen, onClose, deliverables }: KeyResultsModalProps) {
  const { search, statuses, onReset, setSearch, setStatuses, filteredDeliverables } =
    useDeliverableFilters({
      deliverables,
    })

  const handleClose = () => {
    onClose()
    onReset()
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="z-170!" />
        <DialogPrimitive.Content
          className={cn(
            // mobile
            'no-scrollbar top-0 left-0 z-180 mb-0 h-screen max-h-full! w-screen max-w-full translate-x-0 translate-y-0 content-start items-start gap-0 overflow-hidden overscroll-contain rounded-none p-0',
            'sm:top-[50%] sm:left-[50%] sm:mb-12 sm:h-auto sm:w-full sm:max-w-xl! sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg md:max-w-172! lg:max-w-216! xl:max-h-173.5! xl:max-w-279.5!',
            // Base styles from DialogContent
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed grid border shadow-lg duration-200',
          )}
        >
          <DialogHeader className="border-input flex flex-col border-b px-4 py-3">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex items-start gap-2 sm:items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="flex items-center sm:hidden"
                  onClick={onClose}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <DialogTitle className="text-foreground flex flex-col text-lg/[120%] font-bold sm:flex-row sm:gap-2">
                  Front-end Development
                  <p className="text-foreground/50 text-start text-base/6 font-semibold sm:text-start">
                    Key Results
                  </p>
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-popover-foreground hover:text-popover-foreground/80 hidden sm:flex"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
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
              <div className="hidden sm:block">
                <StatusSelectDeliverable
                  statuses={statuses}
                  setStatuses={setStatuses}
                  className="w-56"
                />
              </div>
              <div className="flex sm:hidden">
                <FilterDrawer className="z-200" onReset={onReset}>
                  <StatusSelectDelivarableDrawer statuses={statuses} setStatuses={setStatuses} />
                </FilterDrawer>
              </div>
            </div>
          </DialogHeader>

          <SimpleBar className="px-4 py-3 sm:h-150 sm:px-4 sm:py-3" autoHide={false}>
            {filteredDeliverables.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground text-lg">Results not found...</p>
              </div>
            ) : (
              <div className="space-y-3 pb-3">
                {filteredDeliverables.map((deliverable) => (
                  <div key={deliverable.id}>
                    <div className="bg-accent mb-3 flex items-center justify-between rounded-md p-2">
                      <div className="flex items-center gap-1">
                        <span className="text-foreground/30 text-sm/4.5 font-semibold">
                          {deliverable.code}
                        </span>
                        <h3 className="text-foreground text-sm/5.5 font-semibold">
                          {deliverable.title}
                        </h3>
                      </div>
                      <div className="ml-1 flex">
                        <DeliverableStatusChip status={deliverable.status} />
                      </div>
                    </div>
                    <ul className="flex flex-col gap-3 sm:pl-2 md:pl-4 xl:pl-4">
                      {deliverable.keyResults.map((keyResult) => (
                        <KeyResultItem key={keyResult.id} keyResult={keyResult} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </SimpleBar>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
