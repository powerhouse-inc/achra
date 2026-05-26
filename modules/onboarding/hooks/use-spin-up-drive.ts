'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  type BuilderDriveLink,
  useCreateUserDriveMutation,
  UserRole,
} from '@/modules/__generated__/graphql/switchboard-generated'

type SpinUpPersonaId = 'operator' | 'builder'

interface SpinUpDriveInput {
  personaId: SpinUpPersonaId
  name: string
}

const PERSONA_TO_ROLE: Record<SpinUpPersonaId, UserRole> = {
  operator: UserRole.Operator,
  builder: UserRole.Builder,
}

function useSpinUpDrive() {
  const auth = useRenownAuth()
  const queryClient = useQueryClient()

  return useMutation<BuilderDriveLink, Error, SpinUpDriveInput>({
    mutationFn: async ({ personaId, name }) => {
      const address = auth.address
      if (!address) {
        throw new Error('You must be signed in to create a drive.')
      }

      const result = await useCreateUserDriveMutation.fetcher({
        input: {
          user: address,
          role: PERSONA_TO_ROLE[personaId],
          name,
        },
      })()

      const output = result.createUserDrive
      if (!output) {
        throw new Error("Couldn't create your drive. Please try again.")
      }
      if (!output.success) {
        const message =
          output.errors.length > 0
            ? output.errors.join(', ')
            : "Couldn't create your drive. Please try again."
        throw new Error(message)
      }

      const drive = output.data?.drives[0]
      if (!drive) {
        throw new Error("Your drive was created but we couldn't read it back. Please refresh.")
      }

      return drive
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrives'] })
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrivesSuspense'] })
    },
  })
}

export { useSpinUpDrive }
export type { SpinUpDriveInput, SpinUpPersonaId }
