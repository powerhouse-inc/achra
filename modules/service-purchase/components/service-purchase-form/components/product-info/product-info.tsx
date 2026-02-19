'use client'

import type { Maybe, RsContentSection } from '@/modules/__generated__/graphql/switchboard-generated'
import ExpandableSection from '@/modules/service-purchase/components/service-purchase-form/components/product-info/components/expandable-section'
import { Markdown } from '@/modules/shared/components/markdown/markdown'

export interface ProductInfoProps {
  description?: Maybe<string>
  contentSections: RsContentSection[]
}

export default function ProductInfo({ description, contentSections }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <Markdown className="text-foreground">{description ?? ''}</Markdown>
      <div className="flex flex-col gap-4">
        {contentSections.map((section) => (
          <ExpandableSection key={section.id} title={section.title} description={section.content} />
        ))}
      </div>
    </div>
  )
}
