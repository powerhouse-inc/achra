import { FundingOverview } from './components/funding-overview'

interface AccountSnapshotProps {
  month: Date | null
}

async function AccountSnapshot({ month: _ }: AccountSnapshotProps) {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col gap-8">
      <FundingOverview />
    </div>
  )
}

export { AccountSnapshot }
