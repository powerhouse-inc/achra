'use client'

import { CardTitle } from '@achra/ui/card'
import { useMyBuilderProfile } from '@/modules/shared/hooks/use-my-builder-profile'

/**
 * The profile card's title. Reads the resolved builder profile so it reflects
 * the user's role: once they become an operator (`isOperator`), it reads
 * "Operator Profile"; otherwise "Builder Profile". Defaults to "Builder
 * Profile" while the profile is still loading.
 */
function AccountProfileTitle() {
  const { profileQuery } = useMyBuilderProfile()
  const isOperator = profileQuery.data?.isOperator ?? false

  return <CardTitle>{isOperator ? 'Operator Profile' : 'Builder Profile'}</CardTitle>
}

export { AccountProfileTitle }
