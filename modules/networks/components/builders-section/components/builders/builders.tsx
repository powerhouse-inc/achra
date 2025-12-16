import { BuildersList } from './components/builders-list/builders-list'

interface BuildersProps {
  className?: string
}

export function Builders({ className }: BuildersProps) {
  // Backend requests will be implemented here

  return <BuildersList className={className} builders={[]} />
}
