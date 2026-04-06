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
    <section
      className="w-full bg-[rgb(250,249,247)] px-6 py-14 sm:px-10 sm:py-16 lg:py-20"
      aria-labelledby="home-faq-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <h2
            id="home-faq-heading"
            className="text-3xl font-semibold tracking-tight text-balance text-[#1a1a1a] sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-[#666666] sm:text-lg">
            Get help and find answers
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {HOME_FAQ_COLUMNS.map((column) => (
            <Accordion key={column[0]?.id ?? 'col'} type="single" collapsible className="w-full">
              {column.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-[rgb(230,230,230)] last:border-b"
                >
                  <AccordionTrigger className="items-center py-5 text-left text-[15px] font-semibold text-[#1a1a1a] hover:no-underline data-[state=open]:pb-3 sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-[#666666] sm:text-base">
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
