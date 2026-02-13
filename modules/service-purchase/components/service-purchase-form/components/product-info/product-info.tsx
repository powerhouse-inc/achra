'use client'

import type { ResourceTemplate_ContentSection } from '@/modules/__generated__/graphql/switchboard-generated'
import ExpandableSection from '@/modules/service-purchase/components/service-purchase-form/components/product-info/components/expandable-section'

export interface ProductInfoProps {
  summary: string
  contentSections: ResourceTemplate_ContentSection[]
}

export default function ProductInfo({ summary, contentSections }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-foreground text-sm/5.5 lg:text-base/6">{summary}</span>
      <div className="flex flex-col gap-4">
        {contentSections.map((section: ResourceTemplate_ContentSection) => (
          <ExpandableSection key={section.id} title={section.title} description={section.content} />
        ))}
      </div>
    </div>
  )
}
