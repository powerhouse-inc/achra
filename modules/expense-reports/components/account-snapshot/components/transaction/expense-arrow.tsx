import React from 'react'
import { cn } from '@/modules/shared/lib/utils'

interface ExpenseArrowProps extends React.SVGProps<SVGSVGElement> {
  isIncoming?: boolean
}

function ExpenseArrow({ isIncoming = false, ...props }: ExpenseArrowProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'size-4 opacity-30',
        isIncoming ? 'text-status-success' : 'text-destructive',
        props.className,
        { 'rotate-180': !isIncoming },
      )}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8.01246 12.915C7.45185 12.9268 6.77225 12.1915 6.77225 12.1915L4.2011 9.1273C3.8461 8.70422 3.90128 8.03099 4.32436 7.67599C4.74743 7.32098 5.37819 7.37617 5.73319 7.79924L6.91504 9.20772L6.91504 4C6.91504 3.44771 7.44772 2.91504 8 2.91504C8.55228 2.91504 9.12337 3.44771 9.12337 4L9.12337 9.20772L10.2339 7.8842C10.5889 7.46113 11.2197 7.40594 11.6428 7.76095C12.0658 8.11595 12.121 8.70422 11.766 9.1273L9.19487 12.1915C9.19487 12.1915 8.5537 12.9037 8.01246 12.915Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { ExpenseArrow }
