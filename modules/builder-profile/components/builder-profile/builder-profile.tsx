import { BuilderProfileHeader } from '@/modules/builder-profile/components/builder-profile-header'
import { ProfileFinancesCardContent } from '@/modules/expense-reports/components/profile-card-content'
import { ProfileFinancesDrawer } from '@/modules/expense-reports/components/profile-drawers'
import { ProjectCard } from '@/modules/expense-reports/components/project-card'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import { getBuilderProfile } from '../../services/builder-profile'

interface BuilderProfileProps {
  builderSlug: string
}

export default async function BuilderProfile({ builderSlug }: BuilderProfileProps) {
  const builder = await getBuilderProfile({
    slug: builderSlug,
  })

  if (!builder) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Builder not found</EmptyTitle>
          <EmptyDescription>The builder you are looking for does not exist.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

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
    <>
      <BuilderProfileHeader builder={builder} />
      <div className="mt-3 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="w-full">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="flex items-center justify-between gap-2 sm:w-full">
                <h1 className="text-lg leading-[120%] font-bold lg:text-xl">
                  {`${builder.name}: Who we are`}
                </h1>

                <div className="lg:hidden">
                  <ProfileFinancesDrawer />
                </div>
              </div>

              <div className="sm:w-57 sm:min-w-57 lg:hidden">{connectButton}</div>
            </div>

            <Markdown>{builder.description ?? ''}</Markdown>
          </div>

          <div className="sticky top-43.5 hidden h-fit w-full flex-col gap-6 lg:flex lg:w-96 xl:w-104 xl:min-w-104">
            <div className="flex justify-end">{connectButton}</div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl leading-[120%] font-bold">Finances</h2>
              <Card className="border-none py-0">
                <CardContent className="p-4">
                  <ProfileFinancesCardContent />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {builder.projects.map((project, index) => (
            // TODO: We are currently using the project id plus the index as the key because there are projects with the same id in the current data.
            // We need to notify the backend team about it and remove the index once the data is fixed.
            // eslint-disable-next-line react/no-array-index-key
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </>
  )
}
