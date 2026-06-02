'use client'

export type ServiceCatalogBodyProps = React.ComponentProps<'div'>

function ServiceCatalogBody({ children, className, ...props }: ServiceCatalogBodyProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export { ServiceCatalogBody }
