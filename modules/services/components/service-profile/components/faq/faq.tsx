import {
  BookA,
  Building2,
  CircleDollarSign,
  Clock,
  Headset,
  HelpCircle,
  Link2,
  Monitor,
  Settings2,
} from 'lucide-react'
import { cn } from '../../../../../shared/lib/utils'
import { FaqItem } from './faq-item'

interface FaqItemData {
  id: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  question: string
  answer: string
}

const faqData: FaqItemData[] = [
  {
    id: '1',
    icon: BookA,
    question: 'What is an Operational Hub?',
    answer:
      'Our Operational Hubs provide a single point of contact for managing legal, compliance, and operational tasks, ensuring efficiency.',
  },
  {
    id: '2',
    icon: HelpCircle,
    question: 'Why do I need an Operational Hub?',
    answer:
      'An Operational Hub offers a streamlined approach to handling legal, compliance, and operational tasks, promoting efficiency.',
  },
  {
    id: '3',
    icon: Link2,
    question: 'Can I customize my Operational Hub?',
    answer:
      'Operational Hubs offer a central platform to handle legal, compliance, and operational tasks, ensuring efficiency and scalability.',
  },
  {
    id: '4',
    icon: Clock,
    question: 'How long does it take to set up an Operational Hub?',
    answer:
      'Our Operational Hubs deliver a central platform to handle legal, compliance, and operational tasks, ensuring efficiency and agility.',
  },
  {
    id: '5',
    icon: CircleDollarSign,
    question: 'How much does an Operational Hub cost?',
    answer:
      'Operational Hubs offer a central platform to handle legal, compliance, and operational tasks, ensuring efficiency and reliability.',
  },
  {
    id: '6',
    icon: Building2,
    question: 'How can an Operational Hub help with compliance?',
    answer:
      'Our Operational Hubs offer a central platform to handle legal, compliance, and operational tasks, ensuring efficiency and security.',
  },
  {
    id: '7',
    icon: Headset,
    question: 'What kind of support does Accountable OPC offer?',
    answer:
      'Operational Hubs provide a central platform to handle legal, compliance, and operational tasks, ensuring efficiency and control.',
  },
  {
    id: '8',
    icon: Settings2,
    question: 'What are the benefits of using Powerhouse Genesis OH?',
    answer:
      'Our Operational Hubs deliver a central platform to handle legal, compliance, and operational tasks, ensuring efficiency.',
  },
  {
    id: '9',
    icon: Monitor,
    question: 'How does an Operational Hub work?',
    answer:
      'Operational Hubs offer a unified platform to handle legal, compliance, and operational tasks, ensuring efficiency and clarity.',
  },
]

interface FaqSectionProps extends React.ComponentProps<'section'> {
  title?: string
  items?: FaqItemData[]
}

function FaqSection({
  title = 'FAQ',
  items = faqData,
  className,
  ...props
}: Readonly<FaqSectionProps>) {
  return (
    <section
      id="faq"
      data-slot="faq-section"
      className={cn('border-border w-full border-t pt-6', className)}
      {...props}
    >
      <div>
        <h2 className="text-foreground mb-6 text-center text-xl leading-[120%] font-bold">
          {title}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-x-12 gap-y-8 md:grid-flow-col md:grid-cols-2 md:grid-rows-5 lg:grid-cols-3 lg:grid-rows-3">
          {items.map((item) => (
            <FaqItem key={item.id} icon={item.icon} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { FaqSection, faqData }
