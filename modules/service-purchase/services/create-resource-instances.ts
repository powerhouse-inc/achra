import {
  type CreateResourceInstancesInput,
  useCreateResourceInstancesMutation,
} from '@/modules/__generated__/graphql/switchboard-generated'

import type { CreateResourceInstancesResult } from '../types'

export async function submitResourceRequest(
  input: CreateResourceInstancesInput,
): Promise<CreateResourceInstancesResult> {
  const result = await useCreateResourceInstancesMutation.fetcher({ input })()

  const output = result.createResourceInstances

  if (!output) {
    throw new Error('No response from createResourceInstances mutation')
  }

  if (!output.success) {
    const errorMessage = output.errors.length > 0 ? output.errors.join(', ') : 'Request failed'
    throw new Error(errorMessage)
  }

  return {
    name: input.name,
    teamName: input.teamName,
    // TODO: add email to the input once we have it in the API input
    email: 'example@example.com',
    driveUrl: output.data?.linkToDrive ?? null,
  }
}
