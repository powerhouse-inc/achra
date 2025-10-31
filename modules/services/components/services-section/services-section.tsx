import ServicesFilters from './components/services-filters/services-filters'

export function ServicesSection() {
  return (
    <section className="flex w-full flex-col gap-6">
      <ServicesFilters />
    </section>
  )
}
