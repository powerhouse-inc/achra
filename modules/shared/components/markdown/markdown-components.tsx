import { createHeadingComponent } from './utils'
import type { HTMLAttributes } from 'react'
import type { StreamdownProps } from 'streamdown'

function OrderedList({ children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="list-inside list-decimal" {...props}>
      {children}
    </ol>
  )
}

function UnorderedList({ children, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className="ml-1 list-inside list-disc" {...props}>
      {children}
    </ul>
  )
}

function Table({ children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-4 flex flex-col space-y-2">
      <div className="border-border overflow-x-auto rounded-xl border">
        <table className="w-full" {...props}>
          {children}
        </table>
      </div>
    </div>
  )
}

function TableHeader({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="bg-secondary border-b" {...props}>
      {children}
    </thead>
  )
}

function TableBody({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className="divide-border divide-y" {...props}>
      {children}
    </tbody>
  )
}

function TableRow({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="border-border [&:not(:last-child)]:border-b" {...props}>
      {children}
    </tr>
  )
}

function TableHeaderCell({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-3 py-2 text-left text-sm/5.5 font-semibold whitespace-nowrap xl:px-4 xl:text-base/6"
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className="px-3 py-4 text-sm/5.5 xl:p-4 xl:text-base/6" {...props}>
      {children}
    </td>
  )
}

function Blockquote({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className="border-foreground/50 ml-4 border-l-2 pr-3 pl-4" {...props}>
      {children}
    </blockquote>
  )
}

const Heading1 = createHeadingComponent(1, 'mt-0 mb-4 text-3xl font-bold')
const Heading2 = createHeadingComponent(2, 'mt-0 mb-4 text-2xl font-bold')
const Heading3 = createHeadingComponent(3, 'mt-0 mb-4 text-xl font-bold')

function Hr({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <hr className="border-border my-4" {...props}>
      {children}
    </hr>
  )
}

function Link({ children, ...props }: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className="text-foreground" {...props}>
      {children}
    </a>
  )
}

export const componentsOverrides: StreamdownProps['components'] = {
  blockquote: Blockquote,
  ol: OrderedList,
  ul: UnorderedList,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableCell,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  hr: Hr,
  a: Link,
}
