import { AvatarTitleAvatar, AvatarTitleRoot, AvatarTitleText } from './avatar-title'
import type { Route } from 'next'

interface ProjectDetailsAvatarTitlePageProps {
  params: Promise<{ slug: string }>
  src: string
  title: string
  builderId: string
}
export async function AvatarTitleProjectDetails({
  src,
  title,
  params,
  builderId,
}: ProjectDetailsAvatarTitlePageProps) {
  const { slug } = await params
  return (
    <AvatarTitleRoot
      href={`/network/${slug}/builders/${builderId}` as Route}
      className="w-fit hover:opacity-80"
    >
      <AvatarTitleAvatar src={src} alt={title} className="size-6" />
      <AvatarTitleText>{title}</AvatarTitleText>
    </AvatarTitleRoot>
  )
}
