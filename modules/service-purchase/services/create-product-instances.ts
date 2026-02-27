import {
  type CreateProductInstancesInput,
  useCreateProductInstancesMutation,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { CreateResourceInstancesResult } from '../types'

export async function submitResourceRequest(
  input: CreateProductInstancesInput,
): Promise<CreateResourceInstancesResult> {
  const result = await useCreateProductInstancesMutation.fetcher({ input })()

  const output = result.createProductInstances

  if (!output) {
    throw new Error('No response from createProductInstances mutation')
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
