import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function DoughnutChartSkeleton() {
  return (
    <div className="hidden flex-row items-center gap-6 md:flex xl:gap-16">
      {/* SVG Container */}
      <svg
        viewBox="0 0 129 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-32 w-32 animate-pulse xl:h-[148px] xl:w-[148px]"
      >
        <mask id="path-1-inside-1_skeleton" fill="white">
          <path d="M128.489 64.4307C128.489 99.7769 99.8357 128.431 64.4895 128.431C29.1432 128.431 0.489471 99.7769 0.489471 64.4307C0.489471 29.0844 29.1432 0.430664 64.4895 0.430664C99.8357 0.430664 128.489 29.0844 128.489 64.4307ZM32.4895 64.4307C32.4895 82.1038 46.8164 96.4307 64.4895 96.4307C82.1626 96.4307 96.4895 82.1038 96.4895 64.4307C96.4895 46.7576 82.1626 32.4307 64.4895 32.4307C46.8164 32.4307 32.4895 46.7576 32.4895 64.4307Z" />
        </mask>
        <path
          d="M128.489 64.4307C128.489 99.7769 99.8357 128.431 64.4895 128.431C29.1432 128.431 0.489471 99.7769 0.489471 64.4307C0.489471 29.0844 29.1432 0.430664 64.4895 0.430664C99.8357 0.430664 128.489 29.0844 128.489 64.4307ZM32.4895 64.4307C32.4895 82.1038 46.8164 96.4307 64.4895 96.4307C82.1626 96.4307 96.4895 82.1038 96.4895 64.4307C96.4895 46.7576 82.1626 32.4307 64.4895 32.4307C46.8164 32.4307 32.4895 46.7576 32.4895 64.4307Z"
          strokeWidth="1.33333"
          mask="url(#path-1-inside-1_skeleton)"
          className="fill-muted stroke-muted dark:fill-accent dark:stroke-accent"
        />

        <mask id="path-2-inside-2_skeleton" fill="white">
          <path d="M128.489 64.4307C128.489 49.8987 123.544 35.7993 114.466 24.4515L89.4778 44.4411C94.0167 50.115 96.4895 57.1647 96.4895 64.4307H128.489Z" />
        </mask>
        <path
          d="M128.489 64.4307C128.489 49.8987 123.544 35.7993 114.466 24.4515L89.4778 44.4411C94.0167 50.115 96.4895 57.1647 96.4895 64.4307H128.489Z"
          strokeWidth="1.33333"
          mask="url(#path-2-inside-2_skeleton)"
          className="fill-border stroke-border dark:fill-border/70 dark:stroke-border/70"
        />

        <mask id="path-3-inside-3_skeleton" fill="white">
          <path d="M114.658 24.7431C104.742 12.2134 90.4971 3.84635 74.7244 1.28696C58.9517 -1.27244 42.7921 2.16095 29.4226 10.9121C16.053 19.6633 6.44069 33.0992 2.47534 48.5784C-1.49001 64.0575 0.47847 80.4601 7.99379 94.5615L36.2336 79.511C32.4759 72.4604 31.4917 64.2591 33.4743 56.5195C35.457 48.7799 40.2632 42.062 46.9479 37.6864C53.6327 33.3108 61.7125 31.5941 69.5989 32.8738C77.4852 34.1535 84.6076 38.337 89.5657 44.6019L114.658 24.7431Z" />
        </mask>
        <path
          d="M114.658 24.7431C104.742 12.2134 90.4971 3.84635 74.7244 1.28696C58.9517 -1.27244 42.7921 2.16095 29.4226 10.9121C16.053 19.6633 6.44069 33.0992 2.47534 48.5784C-1.49001 64.0575 0.47847 80.4601 7.99379 94.5615L36.2336 79.511C32.4759 72.4604 31.4917 64.2591 33.4743 56.5195C35.457 48.7799 40.2632 42.062 46.9479 37.6864C53.6327 33.3108 61.7125 31.5941 69.5989 32.8738C77.4852 34.1535 84.6076 38.337 89.5657 44.6019L114.658 24.7431Z"
          strokeWidth="1.33333"
          mask="url(#path-3-inside-3_skeleton)"
          className="fill-input stroke-input dark:fill-border/40 dark:stroke-border/40"
        />
      </svg>

      {/* Chart Legends */}
      <div className="flex flex-col gap-4">
        {/* Item 1 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
          <Skeleton className="ml-3 h-3 w-28 rounded" />
        </div>

        {/* Item 2 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-36 rounded" />
          </div>
          <Skeleton className="ml-3 h-3 w-28 rounded" />
        </div>

        {/* Item 3 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-40 rounded" />
          </div>
          <Skeleton className="ml-3 h-3 w-24 rounded" />
        </div>
      </div>
    </div>
  )
}
