import { MyAppsList } from '@/modules/my-account/components/my-apps-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Apps',
}

export default function MyAppsPage() {
  return <MyAppsList />
}
