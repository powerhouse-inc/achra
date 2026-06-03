import { LabeledSelect } from '../labeled-select'

interface FacetSelectProps {
  categoryLabel: string
  value: string
  onValueChange: (value: string) => void
  options: string[]
}

function FacetSelect({ categoryLabel, value, onValueChange, options }: Readonly<FacetSelectProps>) {
  return (
    <LabeledSelect
      label={categoryLabel}
      value={value}
      onValueChange={onValueChange}
      options={options}
      placeholder={categoryLabel}
      className="w-full"
      matchTriggerWidth={true}
    />
  )
}

export { FacetSelect }
