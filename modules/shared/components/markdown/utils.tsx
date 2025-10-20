import type { HTMLAttributes } from 'react'

export function createHeadingComponent(level: 1 | 2 | 3 | 4 | 5 | 6, defaultClasses: string) {
  function Heading({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
    return (
      <Tag className={`${defaultClasses} ${className ?? ''}`} {...props}>
        {children}
      </Tag>
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}
