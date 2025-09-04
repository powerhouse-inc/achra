import SimpleBar from 'simplebar-react'
import { cn } from '@/modules/shared/lib/utils'

interface MaybeScrollableListProps extends React.PropsWithChildren {
  scrollable: boolean
}

const MaybeScrollableList: React.FC<MaybeScrollableListProps> = ({ scrollable, children }) =>
  scrollable ? (
    <SimpleBar
      className={cn(
        'rounded-lg',
        '&_.simplebar-scrollbar:before:w-1 &_.simplebar-scrollbar:before:ml-1 &_.simplebar-scrollbar:before:rounded-xl &_.simplebar-scrollbar:before:bg-charcoal-500',
      )}
      style={{
        height: 150,
      }}
      autoHide={false}
    >
      <ul className="flex h-full flex-col gap-2 p-0 pr-2">{children}</ul>
    </SimpleBar>
  ) : (
    <ul className="flex h-full flex-col gap-2 p-0 pr-2">{children}</ul>
  )

export default MaybeScrollableList
