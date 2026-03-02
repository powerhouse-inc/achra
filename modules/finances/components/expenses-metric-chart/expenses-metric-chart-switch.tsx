'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'

interface Props {
  isChecked: boolean
  handleChangeSwitch: () => void
}

export default function SwitchComponent({ isChecked, handleChangeSwitch }: Props) {
  return (
    <div
      data-slot="switch-container"
      className="cursor-pointer"
      onClick={handleChangeSwitch}
      role="switch"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleChangeSwitch()
        }
      }}
    >
      <div
        data-slot="switch-track"
        className={cn(
          'relative h-[21px] w-[42px] rounded-full p-0 transition-colors duration-500',
          isChecked ? 'bg-primary' : 'bg-muted dark:bg-muted/80',
        )}
      >
        <div
          data-slot="switch-thumb"
          className={cn(
            'bg-background absolute top-[1.5px] h-[18px] w-[18px] rounded-full transition-transform duration-300',
            isChecked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </div>
    </div>
  )
}
