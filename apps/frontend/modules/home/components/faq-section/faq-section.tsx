'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@achra/ui/accordion'
import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { SectionHeading } from '@/modules/home/components/section-heading'
import { Reveal } from '@/shared/components/reveal'

import { HOME_FAQ_COLUMNS } from './home-faq-data'

function FaqSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" aria-labelledby="home-faq-heading">
      <div className="container">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <SectionHeading
            id="home-faq-heading"
            title="Frequently Asked Questions"
            highlight="Questions"
          />
          <AnimatedSubtitle className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
            Everything you need to know.
          </AnimatedSubtitle>
        </header>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-12 lg:gap-16">
          {HOME_FAQ_COLUMNS.map((column, columnIndex) => (
            <Accordion key={column[0]?.id ?? 'col'} type="multiple" className="w-full">
              {column.map((item, itemIndex) => (
                <Reveal key={item.id} delay={columnIndex * 0.05 + itemIndex * 0.06} y={20}>
                  <AccordionItem value={item.id} className="border-border last:border-b">
                    <AccordionTrigger className="text-foreground hover:text-primary data-[state=open]:text-primary items-center py-6 text-left text-base font-semibold transition-colors hover:no-underline data-[state=open]:pb-3 sm:text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 text-[15px] leading-relaxed sm:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
