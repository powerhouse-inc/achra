'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const tableVariants = cva('relative w-full', {
  variants: {
    variant: {
      default: 'overflow-x-auto',
      pills:
        '[&_table_tbody_tr]:hover:shadow-sm [&_table_tbody_tr]:bg-popover [&_table_tbody_tr]:hover:bg-accent [&_table_thead_tr]:bg-card [&_table_thead_tr]:hover:bg-card overflow-x-visible [&_table]:text-sm/5.5 xl:[&_table]:text-base/6 [&_table]:border-separate [&_table]:border-spacing-y-2 [&_tr]:rounded-xl [&_tr_th]:py-4 [&_tr_th:first-child]:pl-2 [&_tr_th:last-child]:pr-2 xl:[&_tr_th:first-child]:pl-3 xl:[&_tr_th:last-child]:pr-4 2xl:[&_tr_th:first-child]:pl-3.5 2xl:[&_tr_th:last-child]:pr-4 [&_tbody_tr_td:first-child]:rounded-s-xl [&_tr_td:last-child]:rounded-e-xl [&_tbody_tr_td]:py-3 [&_tr_td:first-child]:pl-2 [&_tr_td:last-child]:pr-2 2xl:[&_tr_td:first-child]:pl-3.5 2xl:[&_tr_td:last-child]:pr-4 xl:[&_tr_td:first-child]:pl-3 xl:[&_tr_td:last-child]:pr-4 [&_thead_tr]:outline [&_thead_tr]:outline-border [&_thead_tr_th]:text-foreground/50 [&_thead]:bg-color-background [&_tr]:shadow-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Table({
  variant,
  className,
  ...props
}: React.ComponentProps<'table'> & VariantProps<typeof tableVariants>) {
  return (
    <div data-slot="table-container" className={cn(tableVariants({ variant }), className)}>
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
