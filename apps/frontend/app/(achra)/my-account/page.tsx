import { AccountProfile } from '@/modules/my-account/components/account-profile'
import { BecomeAnOperator } from '@/modules/my-account/components/become-an-operator'
import { RenownIdentity } from '@/modules/my-account/components/renown-identity'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
}

export default function MyAccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Renown Identity</CardTitle>
        <CardDescription>The Renown profile you use to sign in.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <RenownIdentity />
        <BecomeAnOperator />
        <AccountProfile />
      </CardContent>
    </Card>
  )
}
