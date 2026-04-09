'use client'

import type {
  Maybe,
  RsContentSection,
  RsFaqField,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { FaqSection } from '@/modules/service-profile/components/faq/faq'
import { Markdown } from '@/modules/shared/components/markdown/markdown'
import { ExpandableSection } from './expandable-section'

export interface ProductInfoProps {
  description?: Maybe<string>
  contentSections: RsContentSection[]
  faqFields?: Maybe<RsFaqField[]>
}

function ProductInfo({ description, contentSections, faqFields }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <Markdown className="text-foreground">{description ?? ''}</Markdown>
      <div className="flex flex-col gap-4">
        {contentSections.map((section) => (
          <ExpandableSection key={section.id} title={section.title} description={section.content} />
        ))}
      </div>
      {faqFields && faqFields.length > 0 && <FaqSection faqFields={faqFields} />}
    </div>
  )
}

export { ProductInfo }
