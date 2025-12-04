import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/shared/components/ui/table'

export function MetricCardSkeleton() {
  return (
    <Card className="bg-popover relative flex h-[74px] w-full flex-col justify-between gap-2 border px-4 py-2 shadow-none">
      <div className="flex w-full items-center justify-between">
        {/* Label */}
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="flex w-full items-end justify-between">
        <div className="flex items-baseline gap-2">
          {/* Value */}
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
        {/* Footer/Action */}
        <Skeleton className="h-3 w-10" />
      </div>
    </Card>
  )
}

// Simula ProgressCard
export function ProgressCardSkeleton() {
  return (
    <div className="bg-popover flex h-[74px] w-full flex-col justify-center gap-2 rounded-xl border p-2 lg:px-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" /> {/* Label */}
        <Skeleton className="h-5 w-20 rounded-full" /> {/* Status Chip */}
      </div>
      <div className="relative w-full">
        <Skeleton className="h-4 w-full rounded" /> {/* Progress Bar */}
      </div>
    </div>
  )
}

// Simula DeliverableList (Mobile View)
export function DeliverableListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-popover flex w-full flex-col gap-2 rounded-xl p-2 shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" /> {/* Avatar */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" /> {/* Title */}
                <Skeleton className="h-3 w-16 sm:hidden" /> {/* Status mobile */}
              </div>
            </div>
            {/* Desktop Status/Progress section hidden on mobile */}
            <div className="hidden flex-col items-end gap-2 sm:flex">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-2 w-32" />
            </div>
          </div>

          {/* Mobile Progress */}
          <Skeleton className="mt-1 h-2 w-full sm:hidden" />

          <div className="bg-border my-2 hidden h-px w-full sm:block" />

          {/* Bottom stats */}
          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="flex justify-between gap-1 sm:block">
              <Skeleton className="mb-1 h-3 w-10" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between gap-1 sm:block">
              <Skeleton className="mb-1 h-3 w-10" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between gap-1 sm:block sm:text-right">
              <Skeleton className="mb-1 h-3 w-10 sm:ml-auto" />
              <Skeleton className="h-4 w-16 sm:ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Simula DeliverableTable (Desktop View)
export function DeliverableTableSkeleton() {
  return (
    // CAMBIO 1: Agregamos [&_table]:flex [&_table]:flex-col para que la tabla use flexbox internamente
    <Table className="w-full [&_table]:flex [&_table]:flex-col">
      {/* CAMBIO 2: TableHeader debe ser block w-full */}
      <TableHeader className="block w-full">
        {/* CAMBIO 3: TableRow debe ser flex w-full */}
        <TableRow className="flex w-full border-b-0!">
          {/* Ajustamos los anchos de los headers para coincidir con las celdas */}
          <TableHead className="h-fit w-[22.9%] py-4 lg:w-[22.9%] xl:w-[22.3%]">
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead className="h-fit w-[16.9%] py-4 lg:w-[16.9%] xl:w-[14.9%]">
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead className="h-fit w-[13.7%] py-4 lg:w-[13.7%] xl:w-[17.8%]">
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead className="h-fit w-[5.9%] py-4 text-right lg:w-[5.9%] xl:w-[8.2%]">
            <Skeleton className="ml-auto h-4 w-12" />
          </TableHead>
          <TableHead className="h-fit w-[15.3%] py-4 text-right lg:w-[15.3%] xl:w-[13.4%]">
            <Skeleton className="ml-auto h-4 w-16" />
          </TableHead>
          <TableHead className="h-fit w-[15.3%] py-4 text-right lg:w-[15.3%] xl:w-[13.4%]">
            <Skeleton className="ml-auto h-4 w-16" />
          </TableHead>
          <TableHead className="h-fit w-[10%] py-4" />
        </TableRow>
      </TableHeader>

      <TableBody className="flex w-full translate-y-2 flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <TableRow
            key={i}
            className="bg-popover hover:bg-popover! flex h-fit w-full items-center border-b-0! px-2 py-3 hover:shadow-none! xl:p-3"
          >
            <TableCell className="w-[22.9%] shrink-0 lg:w-[22.9%] xl:w-[22.3%]">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </TableCell>
            <TableCell className="w-[16.9%] shrink-0 lg:w-[16.9%] xl:w-[14.9%]">
              <Skeleton className="h-6 w-20 rounded-full" />
            </TableCell>
            <TableCell className="w-[13.7%] shrink-0 lg:w-[13.7%] xl:w-[17.8%]">
              <Skeleton className="h-2 w-24" />
            </TableCell>
            <TableCell className="w-[5.9%] shrink-0 text-right lg:w-[5.9%] xl:w-[8.2%]">
              <Skeleton className="ml-auto h-4 w-12" />
            </TableCell>
            <TableCell className="w-[15.3%] shrink-0 text-right lg:w-[15.3%] xl:w-[13.4%]">
              <Skeleton className="ml-auto h-4 w-16" />
            </TableCell>
            <TableCell className="w-[15.3%] shrink-0 text-right lg:w-[15.3%] xl:w-[13.4%]">
              <Skeleton className="ml-auto h-4 w-16" />
            </TableCell>
            <TableCell className="w-[10%] shrink-0">
              <Skeleton className="ml-auto h-8 w-8 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
