'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { LabeledSelect } from '@/modules/services/components/service-purchase/components/select-services-purchase/labeled-select'
import { ANONYMITY_LEVEL_OPTIONS, TEAM_STRUCTURE_OPTIONS } from '../types'

const SELECT_FIELDS = [
  {
    key: 'teamStructure',
    label: 'Team Structure',
    options: TEAM_STRUCTURE_OPTIONS,
    defaultValue: 'Remote Team' as const,
  },
  {
    key: 'anonymityLevel',
    label: 'Anonymity Level',
    options: ANONYMITY_LEVEL_OPTIONS,
    defaultValue: 'High (Standard)' as const,
  },
] as const

function ServicePurchaseSelects() {
  const [teamStructure, setTeamStructure] = useQueryState(
    'teamStructure',
    parseAsStringLiteral(TEAM_STRUCTURE_OPTIONS).withDefault('Remote Team'),
  )
  const [anonymityLevel, setAnonymityLevel] = useQueryState(
    'anonymityLevel',
    parseAsStringLiteral(ANONYMITY_LEVEL_OPTIONS).withDefault('High (Standard)'),
  )

  const handleValueChange = (key: string, value: string) => {
    switch (key) {
      case 'teamStructure':
        void setTeamStructure(value as (typeof TEAM_STRUCTURE_OPTIONS)[number])
        break
      case 'anonymityLevel':
        void setAnonymityLevel(value as (typeof ANONYMITY_LEVEL_OPTIONS)[number])
        break
    }
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {SELECT_FIELDS.map((field) => {
        let value: string
        switch (field.key) {
          case 'teamStructure':
            value = teamStructure
            break
          case 'anonymityLevel':
            value = anonymityLevel
            break
          default:
            value = ''
        }

        return (
          <LabeledSelect
            key={field.key}
            label={field.label}
            value={value}
            onValueChange={(val) => {
              handleValueChange(field.key, val)
            }}
            options={field.options as unknown as string[]}
            placeholder={field.defaultValue}
            className="w-full"
          />
        )
      })}
    </div>
  )
}

export { ServicePurchaseSelects }
