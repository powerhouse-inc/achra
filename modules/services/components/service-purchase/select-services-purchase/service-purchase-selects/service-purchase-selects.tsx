'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { LabeledSelect } from '@/modules/services/components/service-purchase/select-services-purchase/labeled-select'

// Improve this when UI its ready
const SNO_FUNCTION_OPTIONS = ['Operational Hub', 'Technical Hub', 'Strategy Hub'] as const
const LEGAL_ENTITY_OPTIONS = ['Swiss Association', 'US LLC', 'UK Ltd'] as const
const TEAM_STRUCTURE_OPTIONS = ['Remote Team', 'Hybrid Team', 'On-site Team'] as const
const ANONYMITY_LEVEL_OPTIONS = ['High (Standard)', 'Medium', 'Low'] as const

const SELECT_FIELDS = [
  {
    key: 'snoFunction',
    label: 'SNO Function',
    options: SNO_FUNCTION_OPTIONS,
    defaultValue: 'Operational Hub' as const,
  },
  {
    key: 'legalEntity',
    label: 'Legal Entity',
    options: LEGAL_ENTITY_OPTIONS,
    defaultValue: 'Swiss Association' as const,
  },
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
  const [snoFunction, setSnoFunction] = useQueryState(
    'snoFunction',
    parseAsStringLiteral(SNO_FUNCTION_OPTIONS).withDefault('Operational Hub'),
  )
  const [legalEntity, setLegalEntity] = useQueryState(
    'legalEntity',
    parseAsStringLiteral(LEGAL_ENTITY_OPTIONS).withDefault('Swiss Association'),
  )
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
      case 'snoFunction':
        void setSnoFunction(value as (typeof SNO_FUNCTION_OPTIONS)[number])
        break
      case 'legalEntity':
        void setLegalEntity(value as (typeof LEGAL_ENTITY_OPTIONS)[number])
        break
      case 'teamStructure':
        void setTeamStructure(value as (typeof TEAM_STRUCTURE_OPTIONS)[number])
        break
      case 'anonymityLevel':
        void setAnonymityLevel(value as (typeof ANONYMITY_LEVEL_OPTIONS)[number])
        break
    }
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      {SELECT_FIELDS.map((field) => {
        let value: string
        switch (field.key) {
          case 'snoFunction':
            value = snoFunction
            break
          case 'legalEntity':
            value = legalEntity
            break
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
