import { HelpCircle } from 'lucide-react'
import type { RsFaqField } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { FaqItem } from './faq-item'

interface FaqSectionProps extends React.ComponentProps<'section'> {
  title?: string
  faqFields?: RsFaqField[]
}

function FaqSection({ title = 'FAQ', faqFields, className }: Readonly<FaqSectionProps>) {
  return (
    <section
      id="faq"
      data-slot="faq-section"
      className={cn('border-border w-full border-t pt-6', className)}
    >
      <div>
        <h2 className="text-foreground mb-6 text-center text-xl leading-[120%] font-bold">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {faqFields?.map((item) => (
            <FaqItem
              key={item.id}
              icon={HelpCircle}
              question={item.question ?? ''}
              answer={item.answer ?? ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
