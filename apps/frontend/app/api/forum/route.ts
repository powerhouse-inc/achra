import { NextResponse } from 'next/server'

// Inline id → slug mapping to avoid importing React/asset-heavy .tsx in a server route
const FORUM_CATEGORY_ID_TO_SLUG: Record<string, string> = {
  '89': 'general-discussion',
  '68': 'welcome',
  '92': 'maker-core',
  '78': 'alignment-conserver',
  '101': 'gait',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const slug = FORUM_CATEGORY_ID_TO_SLUG[id]
  if (!slug) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  const upstreamUrl = `https://forum.makerdao.com/c/${slug}/${id}/l/latest.json`
  const response = await fetch(upstreamUrl)

  if (!response.ok) {
    return NextResponse.json({ error: 'Upstream error' }, { status: response.status })
  }

  const data = await response.json()
  const topics = data?.topic_list?.topics ?? []

  return NextResponse.json(topics, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600',
    },
  })
}
