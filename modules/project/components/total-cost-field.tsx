import React from 'react'

interface TotalCostFieldProps {
  label: string
  value: number
}

export function TotalCostField({ label, value }: TotalCostFieldProps) {
  return (
    <div className="flex w-full items-center justify-end gap-4">
      <h2 className="text-end text-sm/5.5 font-semibold">{label}</h2>
      <div className="border-border-input bg-secondary flex min-w-32 justify-center rounded-md border px-3 py-2">
        <p className="text-sm/5.5 font-semibold">{`${value.toFixed(2)} USD`}</p>
      </div>
    </div>
  )
}
