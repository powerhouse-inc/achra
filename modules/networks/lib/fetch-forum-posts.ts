import type { Topic } from '@/modules/networks/types'
import { BASE_URL } from '@/modules/shared/config/constants'

const forumApi = (id: string) => `/api/forum?id=${id}`

export const fetchForumPosts = async (categoryId: number | string): Promise<Topic[]> => {
  const response = await fetch(BASE_URL + forumApi(categoryId.toLocaleString()))
  return await response.json()
}
