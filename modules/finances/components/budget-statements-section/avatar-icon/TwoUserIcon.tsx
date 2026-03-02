import { type SVGProps, useId } from 'react'

function TwoUserIcon(props: SVGProps<SVGSVGElement>) {
  const filterId = useId()

  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter={`url(#${filterId})`}>
        <rect
          x="12"
          y="10"
          width="20"
          height="20"
          rx="10"
          fill="white"
          shapeRendering="crispEdges"
        />
        <rect
          x="12.5"
          y="10.5"
          width="19"
          height="19"
          rx="9.5"
          stroke="currentColor"
          strokeOpacity="0.3"
          shapeRendering="crispEdges"
        />
        <path
          d="M25 24.5C25 23.4391 24.5786 22.4217 23.8284 21.6716C23.0783 20.9214 22.0609 20.5 21 20.5M21 20.5C19.9391 20.5 18.9217 20.9214 18.1716 21.6716C17.4214 22.4217 17 23.4391 17 24.5M21 20.5C22.3807 20.5 23.5 19.3807 23.5 18C23.5 16.6193 22.3807 15.5 21 15.5C19.6193 15.5 18.5 16.6193 18.5 18C18.5 19.3807 19.6193 20.5 21 20.5ZM27 24C27 22.315 26 20.75 25 20C25.3287 19.7534 25.5916 19.4295 25.7653 19.0571C25.939 18.6847 26.0183 18.2752 25.996 17.8649C25.9738 17.4546 25.8507 17.056 25.6377 16.7046C25.4248 16.3532 25.1284 16.0596 24.775 15.85"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_3523_60500"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.478431 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.2 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3523_60500" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3523_60500"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export { TwoUserIcon }
