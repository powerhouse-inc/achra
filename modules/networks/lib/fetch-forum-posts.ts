export interface Topic {
  id: number
  created_at: string
  title: string
  tags: string[]
  like_count: number
  posts_count: number
  slug: string
  category_id: number
  // the api returns other fields, but we don't need them
}

export interface TopicList {
  topic_list: {
    topics: Topic[]
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const forumApi = (id: string) => `/api/forum?id=${id}`

export const fetchForumPosts = async (categoryId: number | string): Promise<Topic[]> => {
  const response = await fetch(BASE_URL + forumApi(categoryId.toLocaleString()))
  return await response.json()
}
