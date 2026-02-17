'use client'

import type {
  Maybe,
  ResourceTemplate_ContentSection,
} from '@/modules/__generated__/graphql/switchboard-generated'
import ExpandableSection from '@/modules/service-purchase/components/service-purchase-form/components/product-info/components/expandable-section'
import { Markdown } from '@/modules/shared/components/markdown/markdown'

export interface ProductInfoProps {
  description?: Maybe<string>
  contentSections: ResourceTemplate_ContentSection[]
}

export default function ProductInfo({ description, contentSections }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <Markdown className="text-foreground">{description ?? ''}</Markdown>
      <div className="flex flex-col gap-4">
        {contentSections.map((section: ResourceTemplate_ContentSection) => (
          <ExpandableSection key={section.id} title={section.title} description={section.content} />
        ))}
      </div>
    </div>
  )
}
