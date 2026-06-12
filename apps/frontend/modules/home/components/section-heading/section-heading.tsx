'use client'

import { cn } from '@achra/ui/lib/utils'
import { motion } from 'motion/react'

interface SectionHeadingProps {
  /** Heading copy, rendered verbatim */
  title: string
  /** Substring of `title` rendered with the violet→pink gradient */
  highlight?: string
  id?: string
  className?: string
}

/**
 * Oversized section heading with the hero's word-by-word blur reveal and a
 * gradient accent on the key phrase — the landing page's typographic
 * signature.
 */
function SectionHeading({ title, highlight, id, className }: SectionHeadingProps) {
  const words = title.split(' ')
  // map the highlight substring to word indices so the gradient survives the
  // per-word animation spans
  const highlightWords = highlight?.split(' ') ?? []
  let highlightStart = -1
  if (highlightWords.length > 0) {
    for (let i = 0; i + highlightWords.length <= words.length; i++) {
      if (highlightWords.every((word, j) => words[i + j] === word)) {
        highlightStart = i
        break
      }
    }
  }

  return (
    <motion.h2
      id={id}
      className={cn(
        'text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.07 }}
    >
      {words.map((word, index) => {
        const isHighlighted =
          highlightStart >= 0 &&
          index >= highlightStart &&
          index < highlightStart + highlightWords.length
        return (
          <motion.span
            key={`${word}-${index}`}
            className={cn(
              'inline-block',
              isHighlighted &&
                'from-primary to-fusion bg-linear-to-r bg-clip-text text-transparent',
            )}
            variants={{
              hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
              },
            }}
          >
            {word}
            {index < words.length - 1 && ' '}
          </motion.span>
        )
      })}
    </motion.h2>
  )
}

export { SectionHeading }
