import { OperatorChipEnum } from '@/modules/operator-profile/types'
import ServicesList from '@/modules/services/components/services-list'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { Button } from '@/modules/shared/components/ui/button'
import { HeaderTitleOperatorProfile } from '../header-title-operator-profile'
import { OperationalMetrics } from '../operational-metric'

// TODO: remove this component
function OperatorProfileSection() {
  // TODO: [API Integration] Replace mock data with API call for operator's services
  const services = SERVICES_CARDS_MOCK

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
          <p className="ml-16 text-sm/5.5 font-normal">
            Empowering you business with reliable bookkeeping, payroll, and tax solutions.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-2 lg:w-86 lg:flex-col xl:w-108">
          <OperationalMetrics label="Active Since" value="JUL 2022" />
          <OperationalMetrics label="Min Engagement" value="3 month" />
          <OperationalMetrics label="Team Size" value="12 FTEs" />
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:flex-1">
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
        <div className="flex w-full flex-col gap-6">
          <ServicesList services={services} />

          <Button variant="outline" size="lg" className="w-58 self-center">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

export { OperatorProfileSection }
