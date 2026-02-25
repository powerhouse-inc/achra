'use client'

import type { Maybe, RsContentSection } from '@/modules/__generated__/graphql/switchboard-generated'
import { Markdown } from '@/modules/shared/components/markdown/markdown'
import { ExpandableSection } from './components/expandable-section'

export interface ProductInfoProps {
  description?: Maybe<string>
  contentSections: RsContentSection[]
}

function ProductInfo({ description, contentSections }: ProductInfoProps) {
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

export { ProductInfo }
