'use client'

import { cn } from '@achra/ui/lib/utils'
import { useId } from 'react'

interface CtaDecorativeIsotypeProps {
  className?: string
}

/** Large watermark builders isotype: glassy fill + embossed white inner highlight. */
function CtaDecorativeIsotype({ className }: CtaDecorativeIsotypeProps) {
  const filterId = `cta-decorative-isotype-relief-${useId().replace(/:/g, '')}`

  return (
    <svg
      className={cn('shrink-0 opacity-70 blur-[1.5px]', className)}
      viewBox="0 0 24 23"
      overflow="visible"
      aria-hidden
    >
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x="-4"
          y="-4"
          width="32"
          height="31"
          colorInterpolationFilters="sRGB"
        >
          {/* White inner highlight — light from top-left */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.85" result="highlightBlur" />
          <feOffset in="highlightBlur" dx="-0.7" dy="-1" result="highlightOffset" />
          <feComposite
            in="highlightOffset"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="highlightMask"
          />
          <feFlood floodColor="white" floodOpacity="0.9" result="highlightColor" />
          <feComposite
            in="highlightColor"
            in2="highlightMask"
            operator="in"
            result="innerHighlight"
          />

          {/* Subtle inner shade — depth on bottom-right so relief reads */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="shadeBlur" />
          <feOffset in="shadeBlur" dx="0.6" dy="1.1" result="shadeOffset" />
          <feComposite
            in="shadeOffset"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadeMask"
          />
          <feFlood floodColor="#4C1D95" floodOpacity="0.24" result="shadeColor" />
          <feComposite in="shadeColor" in2="shadeMask" operator="in" result="innerShade" />

          <feMerge>
            <feMergeNode in="innerShade" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="innerHighlight" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <path
          className="fill-white/32!"
          d="M 11.859 14.966 C 15.186 14.956 18.378 16.268 20.719 18.607 C 21.283 19.168 21.792 19.781 22.239 20.438 C 22.462 20.765 22.315 21.206 21.947 21.359 L 18.139 22.949 C 17.858 23.066 17.534 22.975 17.337 22.745 C 16.742 22.054 16.019 21.482 15.207 21.06 C 14.174 20.524 13.025 20.247 11.859 20.252 C 9.75 20.243 7.745 21.155 6.381 22.745 C 6.183 22.975 5.86 23.066 5.579 22.949 L 1.771 21.359 C 1.403 21.205 1.255 20.766 1.478 20.438 C 1.925 19.781 2.435 19.168 2.999 18.607 C 5.34 16.268 8.532 14.956 11.859 14.966 Z M 5.339 2.316 C 5.301 2.005 5.464 1.698 5.757 1.579 L 9.542 0.049 C 9.906 -0.099 10.32 0.1 10.405 0.48 C 10.602 1.356 10.706 2.267 10.706 3.202 C 10.706 9.203 6.431 14.211 0.747 15.375 C 0.335 15.46 -0.03 15.12 0.002 14.704 L 0.335 10.457 C 0.36 10.192 0.537 9.964 0.79 9.872 C 3.57 8.802 5.399 6.152 5.394 3.202 C 5.394 2.902 5.376 2.606 5.339 2.316 Z"
        />
        <path
          className="fill-white/32!"
          d="M 18.606 3.202 C 18.601 6.152 20.431 8.802 23.211 9.872 C 23.462 9.968 23.645 10.192 23.665 10.457 L 23.998 14.704 C 24.03 15.12 23.666 15.46 23.254 15.375 C 17.569 14.211 13.294 9.203 13.294 3.202 C 13.294 2.267 13.398 1.356 13.595 0.48 C 13.68 0.1 14.094 -0.099 14.458 0.049 L 18.243 1.579 C 18.536 1.698 18.7 2.005 18.661 2.316 C 18.625 2.61 18.606 2.906 18.606 3.202 Z"
        />
      </g>
    </svg>
  )
}

export { CtaDecorativeIsotype }
