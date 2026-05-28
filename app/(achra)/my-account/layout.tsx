import { AccountPageSkeleton } from '@/modules/my-account/components/account-page-skeleton'
import { SettingsNav } from '@/modules/my-account/components/settings-nav'
import { AuthGuard } from '@/modules/shared/components/auth-guard'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContent>
      <AuthGuard loadingFallback={<AccountPageSkeleton />}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr] md:items-start lg:grid-cols-[350px_1fr]">
          <SettingsNav />
          <main>{children}</main>
        </div>
      </AuthGuard>
    </PageContent>
  )
}
