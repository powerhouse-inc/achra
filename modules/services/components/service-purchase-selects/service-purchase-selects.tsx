'use client'

import { useState } from 'react'
import { LabeledSelect } from '@/modules/services/components/service-purchase/components/labeled-select'

function ServicePurchaseSelects() {
  const [snoFunction, setSnoFunction] = useState<string>()
  const [legalEntity, setLegalEntity] = useState<string>()
  const [teamStructure, setTeamStructure] = useState<string>()
  const [anonymityLevel, setAnonymityLevel] = useState<string>()

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      <LabeledSelect
        label="SNO Function"
        value={snoFunction}
        onValueChange={setSnoFunction}
        options={['Operational Hub', 'Technical Hub', 'Strategy Hub']}
        placeholder="Operational Hub"
        className="w-full"
      />

      <LabeledSelect
        label="Legal Entity"
        value={legalEntity}
        onValueChange={setLegalEntity}
        options={['Swiss Association', 'US LLC', 'UK Ltd']}
        placeholder="Swiss Association"
        className="w-full"
      />

      <LabeledSelect
        label="Team Structure"
        value={teamStructure}
        onValueChange={setTeamStructure}
        options={['Remote Team', 'Hybrid Team', 'On-site Team']}
        placeholder="Remote Team"
        className="w-full"
      />
      <LabeledSelect
        label="Anonymity Level"
        value={anonymityLevel}
        onValueChange={setAnonymityLevel}
        options={['High', 'Medium', 'Low']}
        placeholder="Remote Team"
        className="w-full"
      />
    </div>
  )
}

export { ServicePurchaseSelects }
