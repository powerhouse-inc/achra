import { cn } from '@/modules/shared/lib/utils'
import type { CardSpacingSize, ItemType } from '../types'
import type { JSX } from 'react'

interface Props {
  header: JSX.Element | string
  headers: Array<JSX.Element | string>
  items?: JSX.Element[]
  separators?: boolean[]
  footer?: JSX.Element | string
  // TODO: Type this to avoid lower and uppercase error
  itemType: ItemType
  cardSpacingSize?: CardSpacingSize
  subHeader: string
  showSubHeader: boolean
  category?: string
}

export function TransparencyCard({
  cardSpacingSize = 'large',
  header,
  headers,
  itemType,
  subHeader,
  footer,
  items,
  separators,
  showSubHeader,
  category = 'General',
}: Props) {
  if (itemType === 'section') return null

  return (
    <div
      className={cn(
        'bg-card flex flex-col overflow-hidden rounded-xl pb-2 shadow-lg',
        `advance-table--transparency-card ${
          itemType === 'total'
            ? 'advance-table--transparency-card_total'
            : 'advance-table--transparency_item'
        }`,
      )}
    >
      {showSubHeader && (
        <div className={cn('bg-accent flex flex-col gap-2 px-6 py-2')}>
          <div className="text-base/6 font-semibold">{category}</div>
          <div className="text-sm/5.5 font-semibold">{subHeader}</div>
        </div>
      )}
      {header}

      {headers.map((header, i) => {
        const titleReactComponent = (header as JSX.Element).props?.title || ''
        const isTotal = header === 'Totals' || titleReactComponent === 'Totals'

        return (
          <div
            key={`${header.toString()}-${i}`}
            className={cn(
              '[&_.advanced-table__cell-row--category--comments]:p-0 [&_.advanced-table__cell-row--category--comments]:text-end',
              '[&_.advanced-table__cell-row--category--comments]:[&_div]:h-0 [&_.advanced-table__cell-row--category--comments]:[&_div]:w-0',
              cardSpacingSize === 'large' ? 'px-6 pt-5 pb-2.5' : 'px-6',
            )}
          >
            <div
              className={cn('md:flex-start flex flex-1 items-center md:justify-between', {
                'justify-between': header !== 'Target Balance' || itemType === 'total',
              })}
            >
              <div
                className={cn(
                  'flex min-w-[132px] items-center text-base/6 font-semibold',
                  isTotal ? 'text-foreground' : 'text-foreground/30',
                )}
              >
                {header}
              </div>
              <div
                className={cn(
                  'justify-end',
                  { flex: itemType === 'total' },
                  {
                    'w-full':
                      header === 'Target Balance' ||
                      (header === 'Target Balance' && itemType !== 'total'),
                  },
                )}
              >
                {items?.[i] ?? ''}
              </div>
            </div>
            {separators?.[i] && <div className={cn('my-2 flex flex-1 border-t')} />}
          </div>
        )
      })}

      {footer && <div className={cn('mt-4 flex justify-center border-t px-0 pt-0')}>{footer}</div>}
    </div>
  )
}
