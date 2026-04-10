import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { SkillsAccordion } from '@/modules/builder-profile/components/skills-accordion'
import { ProfileFinancesCardContent } from '@/modules/expense-reports/components/profile-finances-card-content'
import { ProfileFinancesDrawer } from '@/modules/expense-reports/components/profile-finances-drawer'
import { ProjectCard } from '@/modules/expense-reports/components/project-card'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import ff from '@/modules/shared/lib/feature-flags'

interface BuilderProfileProps {
  builder: BuilderProfileState
  isOperatorProfile?: boolean
}

function BuilderProfile({ builder, isOperatorProfile }: BuilderProfileProps) {
  const connectButton = (
    <ConnectLink
      action="edit"
      href="https://connect.sky.org/d/dashboard-reporting"
      driveName="Sky Network Admin"
      className="w-full sm:w-fit"
      disabled={true}
    />
  )

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="w-full">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex items-center justify-between gap-2 sm:w-full">
              <h1 className="text-lg leading-[120%] font-bold lg:text-xl">
                {`${builder.name}: Who we are`}
              </h1>

              {!isOperatorProfile && (
                <div className="lg:hidden">
                  <ProfileFinancesDrawer
                    builderSlug={builder.slug ?? ''}
                    operationalHub={builder.operationalHubMember}
                  />
                </div>
              )}
            </div>

            {ff.builders.CONNECT_LINK_ENABLED && (
              <div className="sm:w-57 sm:min-w-57 lg:hidden">{connectButton}</div>
            )}
          </div>

          <Markdown>{builder.about ?? ''}</Markdown>
        </div>

        <div className="sticky top-43.5 hidden h-fit w-full flex-col gap-6 lg:flex lg:w-96 xl:w-104 xl:min-w-104">
          {ff.builders.CONNECT_LINK_ENABLED && (
            <div className="flex justify-end">{connectButton}</div>
          )}

          {!isOperatorProfile && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xl leading-[120%] font-bold">Finances</h2>
              <Card className="border-none py-0">
                <CardContent className="p-4">
                  <ProfileFinancesCardContent
                    builderSlug={builder.slug ?? ''}
                    operationalHub={builder.operationalHubMember}
                  />
                </CardContent>
              </Card>
            </div>
          )}
          <SkillsAccordion skills={builder.skills} className="hidden lg:flex" />
        </div>
      </div>
      <SkillsAccordion skills={builder.skills} className="lg:hidden" />
      {ff.builders.PROJECTS_SECTION_ENABLED && (
        <div className="flex flex-col gap-6">
          {builder.projects.map((project, index) => (
            // TODO: We are currently using the project id plus the index as the key because there are projects with the same id in the current data.
            // We need to notify the backend team about it and remove the index once the data is fixed.
            // eslint-disable-next-line react/no-array-index-key
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export { BuilderProfile }
