import { cn } from '@/modules/shared/lib/utils'

interface ExpandableButtonItemProps {
  expanded: boolean
  handleToggleExpand: () => void
}

const ExpandableButtonItem: React.FC<ExpandableButtonItemProps> = ({
  expanded,
  handleToggleExpand,
}) => {
  return (
    <div className="flex items-center" onClick={handleToggleExpand}>
      <div className="mt-2 flex w-full cursor-pointer items-center gap-2 pl-2">
        <span className="text-sm font-medium">{expanded ? 'Collapse' : 'Expand'}</span>
        <div className="my-auto h-px w-full bg-gray-200" />
        <svg
          className={cn('transition-transform', expanded ? 'rotate-180' : 'rotate-0')}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.69339 10.8631C7.85404 11.0456 8.14598 11.0456 8.30664 10.8631L12.9036 5.63952C13.1255 5.38735 12.9398 5 12.597 5H3.40306C3.06023 5 2.87451 5.38735 3.09643 5.63952L7.69339 10.8631Z"
            fill="#546978"
          />
        </svg>
      </div>
    </div>
  )
}

export default ExpandableButtonItem
