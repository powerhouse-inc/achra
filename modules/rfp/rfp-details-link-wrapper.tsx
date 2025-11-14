import { RfpDetailsLink } from '../workstream/components/workstream-card/rfp-details-link'

interface RfpDetailsLinkWrapperProps {
  params: Promise<{ slug: string }>
}

export async function RfpDetailsLinkWrapper({ params }: RfpDetailsLinkWrapperProps) {
  const { slug } = await params

  return <RfpDetailsLink slug={slug} />
}
