'use client'

import { useQueryState } from 'nuqs'
import { LabeledSelect } from '@/modules/services/components/service-purchase/select-services-purchase/labeled-select'

// Improve this when UI its ready
const SELECT_FIELDS = [
  {
    key: 'snoFunction',
    label: 'SNO Function',
    options: ['Operational Hub', 'Technical Hub', 'Strategy Hub'],
    defaultValue: 'Operational Hub',
  },
  {
    key: 'legalEntity',
    label: 'Legal Entity',
    options: ['Swiss Association', 'US LLC', 'UK Ltd'],
    defaultValue: 'Swiss Association',
  },
  {
    key: 'teamStructure',
    label: 'Team Structure',
    options: ['Remote Team', 'Hybrid Team', 'On-site Team'],
    defaultValue: 'Remote Team',
  },
  {
    key: 'anonymityLevel',
    label: 'Anonymity Level',
    options: ['High (Standard)', 'Medium', 'Low'],
    defaultValue: 'High (Standard)',
  },
] as const

function ServicePurchaseSelects() {
  const [snoFunction, setSnoFunction] = useQueryState('snoFunction', {
    defaultValue: 'Operational Hub',
  })
  const [legalEntity, setLegalEntity] = useQueryState('legalEntity', {
    defaultValue: 'Swiss Association',
  })
  const [teamStructure, setTeamStructure] = useQueryState('teamStructure', {
    defaultValue: 'Remote Team',
  })
  const [anonymityLevel, setAnonymityLevel] = useQueryState('anonymityLevel', {
    defaultValue: 'High (Standard)',
  })

  const values: Record<string, string> = {
    snoFunction: snoFunction || 'Operational Hub',
    legalEntity: legalEntity || 'Swiss Association',
    teamStructure: teamStructure || 'Remote Team',
    anonymityLevel: anonymityLevel || 'High (Standard)',
  }

  const setters: Record<string, (value: string) => Promise<URLSearchParams>> = {
    snoFunction: setSnoFunction,
    legalEntity: setLegalEntity,
    teamStructure: setTeamStructure,
    anonymityLevel: setAnonymityLevel,
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      {SELECT_FIELDS.map((field) => (
        <LabeledSelect
          key={field.key}
          label={field.label}
          value={values[field.key]}
          onValueChange={(val) => {
            void setters[field.key](val)
          }}
          options={[...field.options]}
          placeholder={field.defaultValue}
          className="w-full"
        />
      ))}
    </div>
  )
}

export { ServicePurchaseSelects }
