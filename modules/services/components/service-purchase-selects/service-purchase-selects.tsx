'use client'

import { useState } from 'react'
import { LabeledSelect } from '@/modules/services/components/service-purchase/components/labeled-select'

// Improve this when UI its ready
const SELECT_FIELDS = [
  {
    key: 'snoFunction',
    label: 'SNO Function',
    options: ['Operational Hub', 'Technical Hub', 'Strategy Hub'],
  },
  { key: 'legalEntity', label: 'Legal Entity', options: ['Swiss Association', 'US LLC', 'UK Ltd'] },
  {
    key: 'teamStructure',
    label: 'Team Structure',
    options: ['Remote Team', 'Hybrid Team', 'On-site Team'],
  },
  { key: 'anonymityLevel', label: 'Anonymity Level', options: ['High', 'Medium', 'Low'] },
] as const

function ServicePurchaseSelects() {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      {SELECT_FIELDS.map((field) => (
        <LabeledSelect
          key={field.key}
          label={field.label}
          value={formData[field.key]}
          onValueChange={(val) => {
            handleChange(field.key, val)
          }}
          options={[...field.options]}
          placeholder={field.options[0]}
          className="w-full"
        />
      ))}
    </div>
  )
}

export { ServicePurchaseSelects }
