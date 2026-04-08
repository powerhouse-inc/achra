'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'

import { HOME_FAQ_COLUMNS } from './home-faq-data'

function FaqSection() {
  return (
    <section className="w-full py-14 sm:py-16 lg:py-20" aria-labelledby="home-faq-heading">
      <div className="container">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <h2
            id="home-faq-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
            Everything you need to know.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-12 lg:gap-16">
          {HOME_FAQ_COLUMNS.map((column) => (
            <Accordion key={column[0]?.id ?? 'col'} type="multiple" className="w-full">
              {column.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-border last:border-b"
                >
                  <AccordionTrigger className="text-foreground items-center py-5 text-left text-[15px] font-semibold hover:no-underline data-[state=open]:pb-3 sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 text-[15px] leading-relaxed sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
