'use client'

import { useMyBuilderProfile } from '@/modules/my-account/hooks/use-my-builder-profile'
import { BuilderProfile } from '@/modules/shared/components/builder-profile'
import { BuildersSkillsChip } from '@/modules/shared/components/chips/builders-skills-chip'
import { LinksList } from '@/modules/shared/components/links-popover'
import { getDomain } from '@/modules/shared/lib/get-domain'
import { AccountProfileEmpty } from './account-profile-empty'
import { AccountProfileError } from './account-profile-error'
import { AccountProfileSkeleton } from './account-profile-skeleton'

function AccountProfile() {
  const { drivesQuery, profileQuery, driveSlug, builderProfileId } = useMyBuilderProfile()

  if (drivesQuery.isPending) return <AccountProfileSkeleton />
  if (drivesQuery.isError) return <AccountProfileError onRetry={() => void drivesQuery.refetch()} />
  if (!driveSlug) return <AccountProfileEmpty />
  if (!builderProfileId) return <AccountProfileEmpty driveSlug={driveSlug} />
  if (profileQuery.isPending) return <AccountProfileSkeleton />
  if (profileQuery.isError) {
    return <AccountProfileError onRetry={() => void profileQuery.refetch()} />
  }

  const profile = profileQuery.data
  if (!profile) return <AccountProfileEmpty driveSlug={driveSlug} />

  return (
    <div className="flex flex-col gap-5">
      <h3 className="leading-none font-semibold">
        {profile.isOperator ? 'Operator Profile' : 'Builder Profile'}
      </h3>

      <BuilderProfile
        name={profile.name}
        code={profile.code}
        status={profile.status}
        image={profile.icon ?? ''}
        isOperator={profile.isOperator}
      />

      {profile.skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-sm font-medium">Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <BuildersSkillsChip key={skill} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {profile.links.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-sm font-medium">Links</span>
          <LinksList
            links={profile.links.map((link) => ({
              type: link.label?.trim() ? link.label : getDomain(link.url),
              href: link.url,
            }))}
          />
        </div>
      )}
    </div>
  )
}

export { AccountProfile }
