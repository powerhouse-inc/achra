interface ActualsProps {
  month: Date | null
}

async function Actuals({ month }: ActualsProps) {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border align-center flex justify-between rounded-xl border p-8">
        Actuals {month?.toISOString()}
      </div>
    </div>
  )
}

export { Actuals }
