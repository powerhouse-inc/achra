import { useParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { WORKSTREAM_BANNER_VISIBLE_STORAGE_KEY } from '../../config/constants'
import type { HTMLMotionProps } from 'motion/react'

function useWorkstreamBanner() {
  const { slug: networkSlug } = useParams<{ slug?: string }>()

  const bannerVisibleStorageKey = networkSlug
    ? `${networkSlug}-${WORKSTREAM_BANNER_VISIBLE_STORAGE_KEY}`
    : WORKSTREAM_BANNER_VISIBLE_STORAGE_KEY

  const [isVisible, setIsVisible] = useLocalStorage(bannerVisibleStorageKey, true, {
    deserializer(value) {
      return value !== 'false'
    },
  })

  const isNetworkBanner = !!networkSlug

  const handleHide = useCallback(() => {
    setIsVisible(false)
  }, [setIsVisible])

  const animationProps: Pick<
    HTMLMotionProps<'div'>,
    'initial' | 'animate' | 'transition'
  > = useMemo(() => {
    return {
      initial: {
        opacity: 0,
        height: 0,
        marginBottom: 0,
      },
      animate: {
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 0,
        marginBottom: isVisible ? 'calc(var(--spacing) * 8)' : 0,
      },
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    }
  }, [isVisible])

  return {
    isVisible,
    isNetworkBanner,
    handleHide,
    animationProps,
  }
}

export { useWorkstreamBanner }
