import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/shared/components/ui/table'
import { cn } from '@/modules/shared/lib/utils'
import { SectionHeaderSkeleton } from '../section-header'

interface ExpenseComparisonSkeletonProps {
  hasOffChainData?: boolean
}

function ExpenseComparisonDesktopSkeleton({
  hasOffChainData = false,
}: ExpenseComparisonSkeletonProps) {
  return (
    <Table variant="default" className="bg-popover w-full border-collapse rounded-xl shadow-lg">
      <TableHeader className="lg:[&_th]:p-4! lg:[&_th]:text-base/6">
        <TableRow className="border-b hover:bg-transparent">
          <TableHead
            colSpan={2}
            rowSpan={hasOffChainData ? 2 : 1}
            className="align-center text-foreground/30 border-r py-3 text-right text-base/6"
          >
            <Skeleton className="h-5 w-32" />
          </TableHead>
          {hasOffChainData ? (
            <TableHead colSpan={4} className="py-3 text-center">
              <Skeleton className="mx-auto h-5 w-48" />
            </TableHead>
          ) : (
            <>
              <TableHead className="py-3 text-right">
                <Skeleton className="ml-auto h-5 w-40" />
              </TableHead>
              <TableHead className="text-foreground/30 py-3 text-right text-base/6">
                <Skeleton className="ml-auto h-5 w-20" />
              </TableHead>
            </>
          )}
        </TableRow>
        {hasOffChainData && (
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="py-3 text-right">
              <Skeleton className="ml-auto h-5 w-28" />
            </TableHead>
            <TableHead className="text-foreground/30 border-r py-3 text-right text-base/6">
              <Skeleton className="ml-auto h-5 w-16" />
            </TableHead>
            <TableHead className="py-3 text-right">
              <Skeleton className="ml-auto h-5 w-32" />
            </TableHead>
            <TableHead className="text-foreground/30 py-3 text-right text-base/6">
              <Skeleton className="ml-auto h-5 w-16" />
            </TableHead>
          </TableRow>
        )}
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-b">
        {/* Render 3-4 rows to match typical data */}
        {[1, 2, 3, 4].map((index) => {
          const isTotals = index === 4

          return (
            <TableRow
              key={index}
              className={cn(
                'border-b [&_td]:text-sm/5.5 [&_td]:font-semibold lg:[&_td]:p-4 lg:[&_td]:text-base/6',
                index === 1 && 'bg-accent',
                isTotals && 'font-semibold',
                !isTotals && index < 4 && 'border-b-transparent',
              )}
            >
              <TableCell className={cn('border-r py-3', !isTotals && 'uppercase')}>
                <Skeleton className={cn('h-4.5 w-20', isTotals && 'h-5 w-16')} />
              </TableCell>
              <TableCell className={cn('border-r py-3 text-right', isTotals && 'font-semibold')}>
                <Skeleton className="ml-auto h-4.5 w-24" />
              </TableCell>
              {hasOffChainData ? (
                <>
                  <TableCell className={cn('py-3 text-right', isTotals && 'font-semibold')}>
                    <Skeleton className="ml-auto h-4.5 w-24" />
                  </TableCell>
                  <TableCell
                    className={cn('border-r py-3 text-right', isTotals && 'font-semibold')}
                  >
                    <Skeleton className="ml-auto h-4.5 w-16" />
                  </TableCell>
                  <TableCell className={cn('py-3 text-right', isTotals && 'font-semibold')}>
                    <Skeleton className="ml-auto h-4.5 w-24" />
                  </TableCell>
                  <TableCell className={cn('py-3 text-right', isTotals && 'font-semibold')}>
                    <Skeleton className="ml-auto h-4.5 w-16" />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className={cn('py-3 text-right', isTotals && 'font-semibold')}>
                    <Skeleton className="ml-auto h-4.5 w-24" />
                  </TableCell>
                  <TableCell className={cn('py-3 text-right', isTotals && 'font-semibold')}>
                    <Skeleton className="ml-auto h-4.5 w-16" />
                  </TableCell>
                </>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function ExpenseComparisonMobileSkeleton({
  hasOffChainData = false,
}: ExpenseComparisonSkeletonProps) {
  return (
    <div className="space-y-2">
      {/* First Item - Always Expanded */}
      <Card className="gap-2 border-none py-2">
        <CardContent className="px-0">
          <div className="px-4">
            <Skeleton className="h-4.5 w-32" />
          </div>

          <div className="px-4 pb-4">
            {/* Reported Actuals */}
            <div className="flex items-center justify-between py-2">
              <Skeleton className="h-4.5 w-36" />
              <Skeleton className="h-4.5 w-24" />
            </div>

            {/* Net Expense Transactions Header */}
            {hasOffChainData && (
              <div className="pb-2 text-center">
                <Skeleton className="mx-auto h-4.5 w-48" />
              </div>
            )}

            <div className="-mx-2 flex flex-col gap-1 rounded-lg border p-2">
              {/* On-chain only */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4.5 w-32" />
                  <Skeleton className="size-4 rounded-full" />
                </div>
                <Skeleton className="h-4.5 w-24" />
              </div>

              <div className="-mx-2">
                <Skeleton className="h-px w-full" />
              </div>

              {/* On-chain Difference */}
              <div className="flex items-center justify-between py-1">
                <Skeleton className="h-4.5 w-20" />
                <Skeleton className="h-4.5 w-16" />
              </div>

              {/* Off-chain Section */}
              {hasOffChainData && (
                <>
                  <div className="-mx-2">
                    <Skeleton className="h-px w-full" />
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4.5 w-36" />
                      <Skeleton className="size-4 rounded-full" />
                    </div>
                    <Skeleton className="h-4.5 w-24" />
                  </div>

                  <div className="-mx-2">
                    <Skeleton className="h-px w-full" />
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <Skeleton className="h-4.5 w-20" />
                    <Skeleton className="h-4.5 w-16" />
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remaining Items - Accordion-like structure */}
      {[2, 3, 4].map((index) => (
        <Card key={index} className="bg-popover rounded-lg p-0 shadow-xl">
          <CardContent className="px-4 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4.5 w-32" />
              <Skeleton className="size-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ExpenseComparisonSkeleton({ hasOffChainData = false }: ExpenseComparisonSkeletonProps) {
  return (
    <div className="flex flex-col gap-6 md:gap-4">
      <SectionHeaderSkeleton
        className={cn(
          '**:data-[slot="title"]:w-full **:data-[slot="title"]:max-w-64',
          '**:data-[slot="subtitle"]:w-full **:data-[slot="subtitle"]:max-w-180',
        )}
        showTooltip={true}
        level="h2"
      />

      <div className="md:hidden">
        <ExpenseComparisonMobileSkeleton hasOffChainData={hasOffChainData} />
      </div>
      <div className="hidden md:block">
        <ExpenseComparisonDesktopSkeleton hasOffChainData={hasOffChainData} />
      </div>
    </div>
  )
}

export { ExpenseComparisonSkeleton }
