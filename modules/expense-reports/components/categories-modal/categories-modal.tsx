'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FolderOpen, X } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Checkbox } from '@/modules/shared/components/ui/checkbox'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import { cn } from '@/modules/shared/lib/utils'
import { useModalCategories } from '../../providers/categories-provider'
import { HeadcountSection } from './headcount-section'
import { NonHeadcountSection } from './non-headcount-section'

function CategoriesModal() {
  const {
    headcountCategories,
    nonHeadcountCategories,
    hasNoCategories,
    hasNestedCategories,
    areAllExpanded,
    toggleAllCategories,
    handleHeadcountValueChange,
    handleNonHeadcountValueChange,
    isModalOpen,
    closeModal,
  } = useModalCategories()

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogPortal>
        <DialogOverlay className="z-170!" />
        <DialogPrimitive.Content
          className={cn(
            // Positioning
            'fixed top-16 left-0 sm:left-[50%]',
            // Transforms
            'sm:translate-x-[-50%]',
            // Z-index
            'z-180',
            // Layout
            'grid content-start items-start',
            // Height
            'h-[calc(100%-64px)] md:h-[calc(100%-128px)]',
            // Max height
            'max-h-full md:max-h-[813px] lg:max-h-[847px]',
            // Width
            'w-full',
            // Max width
            'max-w-full sm:max-w-[calc(100vw-64px)] md:max-w-[calc(100vw-128px)] lg:max-w-[min(1114px,calc(100vw-128px))] xl:max-w-[min(1184px,calc(100vw-128px))]',
            // Spacing
            'mb-0 gap-0 p-0 sm:mb-12',
            // Overflow & scrolling
            'no-scrollbar overflow-x-hidden overscroll-contain',
            // Visual styling
            'bg-background rounded-none border shadow-lg sm:rounded-lg',
            // Animations
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
          )}
        >
          <DialogHeader className="border-input flex flex-col border-b px-4 py-3 text-left">
            <div className="relative flex w-full flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-xl/[120%] font-bold">
                  Canonical Expense Categories
                </DialogTitle>
                <div className="mt-2 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                  <DialogDescription className="flex-1 pr-8 sm:pr-0">
                    Canonical Expense Categories are standardised classifications of expenses
                    tailored for managing a Team or Networks operational costs.
                  </DialogDescription>
                  {hasNestedCategories && (
                    <div className="flex flex-row-reverse items-center gap-2.5 sm:mr-2.5 sm:flex-row">
                      <label
                        htmlFor="expand-all"
                        className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Expand All Categories
                      </label>
                      <Checkbox
                        id="expand-all"
                        checked={areAllExpanded}
                        onCheckedChange={toggleAllCategories}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                aria-label="Close dialog"
                className="text-popover-foreground hover:text-popover-foreground/80 absolute top-0 right-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <SimpleBar
            className="h-full overflow-x-hidden px-4 py-3 sm:px-4 sm:py-3"
            autoHide={false}
          >
            <div className="space-y-6 pb-3">
              {hasNoCategories ? (
                <Empty className="border-border bg-muted/30 w-full border border-solid py-12">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FolderOpen className="text-muted-foreground size-10" />
                    </EmptyMedia>
                    <EmptyTitle>No expense categories</EmptyTitle>
                    <EmptyDescription>
                      No expense categories are available for this team.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <>
                  {/* Headcount Expense Categories */}
                  <HeadcountSection
                    categories={headcountCategories}
                    onValueChange={handleHeadcountValueChange}
                  />

                  {/* Non-Headcount Expense Categories */}
                  <NonHeadcountSection
                    categories={nonHeadcountCategories}
                    onValueChange={handleNonHeadcountValueChange}
                  />
                </>
              )}
            </div>
          </SimpleBar>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

export { CategoriesModal }
