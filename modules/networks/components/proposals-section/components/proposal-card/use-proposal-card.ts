import { useRouter } from 'next/navigation'
import type { RouteWithDynamicPages } from '@/shared/types/routes'

interface UseProposalCardProps {
  detailsHref: RouteWithDynamicPages
}

export function useProposalCard({ detailsHref }: UseProposalCardProps) {
  const router = useRouter()

  const handleDetailsClick = () => {
    router.push(detailsHref)
  }

  return { handleDetailsClick }
}
