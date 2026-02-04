'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { LabeledSelect } from '@/modules/services/components/service-purchase/components/configure-services-purchase/components/labeled-select'
import {
  ANONYMITY_LEVEL_OPTIONS,
  LEGAL_ENTITY_OPTIONS,
  SNO_FUNCTION_OPTIONS,
  TEAM_STRUCTURE_OPTIONS,
} from '../types'

const SELECT_FIELDS = [
  {
    key: 'teamStructure',
    label: 'Team Structure',
    options: TEAM_STRUCTURE_OPTIONS,
    defaultValue: 'Remote' as const,
  },
  {
    key: 'anonymityLevel',
    label: 'Anonymity Level',
    options: ANONYMITY_LEVEL_OPTIONS,
    defaultValue: 'Higher' as const,
  },
  {
    key: 'legalEntity',
    label: 'Legal Entity',
    options: LEGAL_ENTITY_OPTIONS,
    defaultValue: 'Swiss Association' as const,
  },
  {
    key: 'snoFunction',
    label: 'SNO Function',
    options: SNO_FUNCTION_OPTIONS,
    defaultValue: 'Operational Hub' as const,
  },
] as const

function ServicePurchaseSelects() {
  const [teamStructure, setTeamStructure] = useQueryState(
    'teamStructure',
    parseAsStringLiteral(TEAM_STRUCTURE_OPTIONS).withDefault('Remote'),
  )
  const [anonymityLevel, setAnonymityLevel] = useQueryState(
    'anonymityLevel',
    parseAsStringLiteral(ANONYMITY_LEVEL_OPTIONS).withDefault('Higher'),
  )
  const [legalEntity, setLegalEntity] = useQueryState(
    'legalEntity',
    parseAsStringLiteral(LEGAL_ENTITY_OPTIONS).withDefault('Swiss Association'),
  )
  const [snoFunction, setSnoFunction] = useQueryState(
    'snoFunction',
    parseAsStringLiteral(SNO_FUNCTION_OPTIONS).withDefault('Operational Hub'),
  )

  const handleValueChange = (key: string, value: string) => {
    switch (key) {
      case 'teamStructure':
        void setTeamStructure(value as (typeof TEAM_STRUCTURE_OPTIONS)[number])
        break
      case 'anonymityLevel':
        void setAnonymityLevel(value as (typeof ANONYMITY_LEVEL_OPTIONS)[number])
        break
      case 'legalEntity':
        void setLegalEntity(value as (typeof LEGAL_ENTITY_OPTIONS)[number])
        break
      case 'snoFunction':
        void setSnoFunction(value as (typeof SNO_FUNCTION_OPTIONS)[number])
        break
      default:
        break
    }
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      {SELECT_FIELDS.map((field) => {
        let value: string
        switch (field.key) {
          case 'teamStructure':
            value = teamStructure
            break
          case 'anonymityLevel':
            value = anonymityLevel
            break
          case 'legalEntity':
            value = legalEntity
            break
          case 'snoFunction':
            value = snoFunction
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
            matchTriggerWidth={true}
          />
        )
      })}
    </div>
  )
}

export { ServicePurchaseSelects }
