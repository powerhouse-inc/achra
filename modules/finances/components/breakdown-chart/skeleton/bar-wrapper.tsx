export function BarWrapper({
  height,
  heightRelative,
  className,
}: Readonly<{
  height: number
  heightRelative?: number
  className?: string
}>) {
  return (
    <div
      className={`bg-accent relative flex w-4 flex-col items-end justify-end overflow-hidden rounded-sm ${className ?? ''}`}
      style={{ height }}
    >
      {heightRelative && (
        <div
          className="bg-border absolute top-0 flex h-full w-4 rounded-t-lg md:w-6 md:rounded-t-lg lg:w-7.5 xl:w-10"
          style={{ height: heightRelative }}
        />
      )}
    </div>
  )
}
