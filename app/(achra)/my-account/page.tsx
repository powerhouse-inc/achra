import { AccountForm } from '@/modules/my-account/components/account-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
}

export default function MyAccountPage() {
  return <AccountForm />
}
