import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@achra/ui/card'
import {
  AccountProfile,
  AccountProfileTitle,
} from '@/modules/my-account/components/account-profile'
import { RenownIdentity } from '@/modules/my-account/components/renown-identity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
}

export default function MyAccountPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <AccountProfileTitle />
          <CardDescription>The Renown profile you use to sign in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <AccountProfile />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Renown Identity</CardTitle>
          <CardDescription>The Renown profile you use to sign in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <RenownIdentity />
        </CardContent>
      </Card>
    </div>
  )
}
