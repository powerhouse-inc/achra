import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

function useBuilderDrawerState(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [open, setOpen] = useState<boolean>(false)

  // close the drawer if the screen is resized
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false)
      }
    }
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  return [open, setOpen]
}

export { useBuilderDrawerState }
