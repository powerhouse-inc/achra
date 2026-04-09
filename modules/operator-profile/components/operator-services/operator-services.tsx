import EmptyStateService from '@/modules/services/components/empty-state-service/empty-state-service'
import ServicesList from '@/modules/services/components/services-list'
import type { Service } from '@/modules/shared/types/services'

interface OperatorServicesProps {
  services: Service[]
}

function OperatorServices({ services }: OperatorServicesProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-1">
      {services.length > 0 ? (
        <>
          <h3 className="text-lg leading-[120%] font-bold">What we offer</h3>
          <div className="flex w-full flex-col gap-6">
            <ServicesList services={services} />
          </div>
        </>
      ) : (
        <EmptyStateService
          title="No services listed yet"
          description="This operator has not listed any service offerings yet. Check back later for updates."
        />
      )}
    </div>
  )
}

export { OperatorServices }
