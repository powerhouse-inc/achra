import { ItemLegendAxisValues } from '../item-legend-axis-values'

const MOBILE_AXIS_Y_VALUES = Array.from({ length: 9 }).map((_, i) => ({
  width: [13, 26, 16, 25, 16, 25, 16, 25, 16][i],
}))

function LegendAxisYItems() {
  return (
    <div className="flex">
      <div className="flex flex-col justify-end gap-4 md:hidden">
        {MOBILE_AXIS_Y_VALUES.map((_, index) => (
          // it is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex">
            <ItemLegendAxisValues width={16} />
          </div>
        ))}
      </div>
      <div className="hidden flex-col justify-end gap-2.5 md:flex lg:gap-3 xl:gap-5">
        {MOBILE_AXIS_Y_VALUES.map((_, index) => (
          // it is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex">
            <ItemLegendAxisValues width={48} />
          </div>
        ))}
      </div>
    </div>
  )
}

export { LegendAxisYItems }
