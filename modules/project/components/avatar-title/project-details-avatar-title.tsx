import { AvatarTitleAvatar, AvatarTitleRoot, AvatarTitleText } from './avatar-title'
import type { Route } from 'next'

interface ProjectDetailsAvatarTitlePageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
  src: string
  title: string
}
export async function AvatarTitleProjectDetails({
  src,
  title,
  params,
}: ProjectDetailsAvatarTitlePageProps) {
  const { slug } = await params
  return (
    <AvatarTitleRoot href={`/network/${slug}/builders` as Route}>
      <AvatarTitleAvatar src={src} alt={title} className="size-6" />
      <AvatarTitleText>{title}</AvatarTitleText>
    </AvatarTitleRoot>
  )
}
