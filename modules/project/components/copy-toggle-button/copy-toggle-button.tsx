'use client'
import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { useCopyIndicator } from './use-copy-indicator'

interface CopyToggleButtonProps {
  value: string
  className?: string
  resetDelay?: number
}

export function CopyToggleButton({ value, className, resetDelay = 2000 }: CopyToggleButtonProps) {
  const { isCopied, handleCopyAddress } = useCopyIndicator({ resetDelay })

  return (
    <Button
      variant="icon"
      size="iconXsm"
      className={cn('size-4', className)}
      onClick={(event) => void handleCopyAddress(event, value)}
    >
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: [0.5, 1.2, 1],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              scale: {
                times: [0, 0.6, 1],
                duration: 0.4,
              },
            }}
          >
            <Check className="size-4" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Copy className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
