import { Card, CardContent } from '@/modules/shared/components/ui/card'

interface SimpleStatCardProps {
  date?: string
  value?: number
  caption: string
  hasEqualSign?: boolean
  dynamicChanges?: boolean
}

function SimpleStatCard({ ..._props }: SimpleStatCardProps) {
  return (
    <Card className="w-full border-none">
      <CardContent>SimpleStatCard</CardContent>
    </Card>
  )
}

export { SimpleStatCard }
