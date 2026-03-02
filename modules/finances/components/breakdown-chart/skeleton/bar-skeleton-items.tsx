import { BarWrapper } from './bar-wrapper'

const MobileBarsValues = [
  { height: 148 },
  { height: 150 },
  { height: 155 },
  { height: 139 },
  { height: 150 },
  { height: 156 },
  { height: 162 },
  { height: 166 },
  { height: 164, heightRelative: 13 },
  { height: 162, heightRelative: 23 },
  { height: 169, heightRelative: 53 },
  { height: 168, heightRelative: 48 },
]

const TabletBarsValues = [
  { height: 195 },
  { height: 195 },
  { height: 196 },
  { height: 180 },
  { height: 185 },
  { height: 192 },
  { height: 197 },
  { height: 208 },
  { height: 211, heightRelative: 13 },
  { height: 215, heightRelative: 23 },
  { height: 220, heightRelative: 53 },
  { height: 228, heightRelative: 48 },
]

const DeskBarsValues = [
  { height: 245 },
  { height: 244 },
  { height: 246 },
  { height: 226 },
  { height: 256 },
  { height: 264 },
  { height: 273 },
  { height: 286 },
  { height: 291, heightRelative: 13 },
  { height: 297, heightRelative: 23 },
  { height: 303, heightRelative: 53 },
  { height: 308, heightRelative: 48 },
]

export function BarSkeletonItems() {
  return (
    <div className="flex w-full flex-row gap-2 xl:gap-6">
      {/* Mobile */}
      <div className="flex w-full flex-row items-end justify-between gap-2 md:hidden">
        {MobileBarsValues.map((item, index) => (
          // It is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <BarWrapper key={index} height={item.height} heightRelative={item.heightRelative} />
        ))}
      </div>

      {/* Tablet */}
      <div className="hidden w-full flex-row items-end justify-between gap-1 md:flex lg:gap-2 xl:hidden">
        {TabletBarsValues.map((item, index) => (
          <BarWrapper
            // It is okay to use index as key here because the skeleton is static
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            height={item.height}
            heightRelative={item.heightRelative}
            className="w-6 lg:w-7.5"
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden flex-row items-end gap-[19px] xl:flex 2xl:gap-6">
        {DeskBarsValues.map((item, index) => (
          <BarWrapper
            // It is okay to use index as key here because the skeleton is static
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            height={item.height}
            heightRelative={item.heightRelative}
            className="w-10"
          />
        ))}
      </div>
    </div>
  )
}
