import ServicesList from '../services/components/services-section/components/services-list/services-list'
import { HeaderTitleOperatorProfile } from './components/header-title-operator-profile'
import { OperationalMetrics } from './components/operational-metrics'
import { OperatorChipEnum } from './types'

export function OperatorProfileSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-2 lg:flex-2">
          <HeaderTitleOperatorProfile
            title="Accountable OPC"
            operatorChips={[
              OperatorChipEnum.Accountable,
              OperatorChipEnum.Budgeting,
              OperatorChipEnum.Forecasting,
            ]}
          />
          <p className="text-sm/5.5 font-normal">
            Empowering you business with reliable bookkeeping, payroll, and tax solutions.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-2 lg:w-86 lg:flex-col xl:w-108">
          <OperationalMetrics label="Active Since" value="JUL 2022" />
          <OperationalMetrics label="Min Engagement" value="3 month" />
          <OperationalMetrics label="Team Size" value="12 FTEs" />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-1">
        <h3 className="text-lg leading-[120%] font-bold">Who we are</h3>
        <p className="text-sm/5.5 font-normal xl:text-base/6">
          Lorem ipsum dolor sit amet consectetur. Ac proin mi netus dui tempus mi massa duis nam.
          Turpis rhoncus viverra eget urna eleifend senectus massa sit. Netus felis amet ipsum
          hendrerit diam arcu. Sed amet quam pellentesque neque massa lectus. Tortor nisl a nec odio
          id aenean integer sit quam. Ornare amet nisl in arcu elit. A maecenas nunc egestas a
          suspendisse eget. Velit libero ante vel sed. Pretium faucibus lorem vitae nunc
          sollicitudin arcu cursus hac. Felis at a enim tempor. Consectetur tellus mauris leo in
          hendrerit molestie tellus risus mi. Sit non auctor proin arcu senectus varius porttitor
          elementum pretium. Gravida duis ipsum sit tristique auctor enim tortor vel amet.
        </p>
      </div>
      <div className="flex flex-col gap-4 lg:flex-1">
        <h3 className="text-lg leading-[120%] font-bold">What we offer</h3>
        <ServicesList />
      </div>
    </div>
  )
}
