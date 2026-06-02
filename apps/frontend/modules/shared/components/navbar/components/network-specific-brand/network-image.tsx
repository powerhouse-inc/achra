import Image from 'next/image'

interface NetworkImageProps {
  lightImage: string | null
  darkImage: string | null
  alt: string
  size: number
  lightClassName?: string
  darkClassName?: string
  singleClassName?: string
  useImgTag?: boolean
  showName?: boolean
  networkName?: string
  containerClassName?: string
}

/**
 * Renders a network image with automatic light/dark theme support
 */
function NetworkImage({
  lightImage,
  darkImage,
  alt,
  size,
  lightClassName = '',
  darkClassName = '',
  singleClassName = '',
  useImgTag = false,
  showName = false,
  networkName,
  containerClassName,
}: NetworkImageProps): React.ReactNode {
  // If no images, return null (caller should handle fallback)
  if (!lightImage && !darkImage) {
    return null
  }

  const renderImage = (src: string, className: string): React.ReactElement => {
    return useImgTag ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} fetchPriority="high" className={className} />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority
        unoptimized
        fetchPriority="high"
        className={className}
      />
    )
  }

  const wrapWithContainer = (element: React.ReactNode): React.ReactNode => {
    if (showName && networkName) {
      return (
        <div className={containerClassName}>
          {element}
          <span className="font-bold">{networkName}</span>
        </div>
      )
    }
    return element
  }

  // If only light image exists, show it always
  if (lightImage && !darkImage) {
    return wrapWithContainer(renderImage(lightImage, singleClassName || lightClassName))
  }

  // If only dark image exists, show it always
  if (!lightImage && darkImage) {
    return wrapWithContainer(renderImage(darkImage, singleClassName || darkClassName))
  }

  // Both images exist
  if (lightImage && darkImage) {
    // If both images are the same, render only one
    if (lightImage === darkImage) {
      return wrapWithContainer(renderImage(lightImage, singleClassName || lightClassName))
    }

    // Both images are different - show light in light mode, dark in dark mode
    const lightElement = renderImage(lightImage, lightClassName)
    const darkElement = renderImage(darkImage, darkClassName)

    if (showName && networkName && containerClassName) {
      return (
        <div className={containerClassName}>
          {lightElement}
          {darkElement}
          <span className="font-bold">{networkName}</span>
        </div>
      )
    }

    return (
      <>
        {lightElement}
        {darkElement}
      </>
    )
  }

  return null
}

export { NetworkImage }
