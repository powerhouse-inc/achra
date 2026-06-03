import { MyDrivesList } from '@/modules/my-account/components/my-drives-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Drives',
}

export default function MyDrivesPage() {
  return <MyDrivesList />
}
