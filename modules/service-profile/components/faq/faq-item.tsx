import { cn } from '@/modules/shared/lib/utils'

interface FaqItemProps extends React.ComponentProps<'div'> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  question: string
  answer: string
}

export function FaqItem({
  icon: Icon,
  question,
  answer,
  className,
  ...props
}: Readonly<FaqItemProps>) {
  return (
    <div data-slot="faq-item" className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex items-center gap-3">
        <div
          data-slot="faq-icon"
          className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-full"
        >
          <Icon className="text-primary size-4" />
        </div>
        <h3 data-slot="faq-question" className="text-foreground text-lg leading-[120%] font-bold">
          {question}
        </h3>
      </div>
      <p data-slot="faq-answer" className="text-foreground text-base/6 font-normal">
        {answer}
      </p>
    </div>
  )
}
