interface AccountSnapshotProps {
  month: Date | null
}

async function AccountSnapshot({ month }: AccountSnapshotProps) {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border align-center flex justify-between rounded-xl border p-8">
        Account Snapshot {month?.toISOString()}
      </div>
    </div>
  )
}

export { AccountSnapshot }
