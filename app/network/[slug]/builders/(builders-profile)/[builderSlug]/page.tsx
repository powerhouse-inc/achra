import {
  ProfileCardEditContent,
  ProfileFinancesCardContent,
} from '@/modules/expense-reports/components/profile-card-content'
import {
  EditContentDrawer,
  ProfileFinancesDrawer,
} from '@/modules/expense-reports/components/profile-drawers'
import { ProjectCard } from '@/modules/expense-reports/components/project-card'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

const markdown =
  '# **About Us** #\n\nThe new Powerhouse team uses its extensive knowledge and experience from its SES Core Unit and Maker Foundation days to contribute to the development of efficient and scalable decentralized organizations. It aims to work not just for Sky and its subDAOs, but as a fully independent service provider for the wider industry.\n\n### Services Offered ### \nAs an Ecosystem Actor, Powerhouse offers three categories of paid consultancy services. These services span various operational areas, from project management, to finances and transparency reporting, to legal-operational matters.\n\n### Decentralized Org Design and Business Process Analysis ### \nOpen and decentralized organizations are an emerging paradigm that can be difficult to get right at first. Sky has been one of the biggest pioneering experiments so far, achieving some successes but also laying bare the various challenges that these organizations may face.\n\n### Open-Source Software Development ### \nTo be successful, these organizations essentially need to trade traditional management oversight and extensive training programs with automated processes on their operational platform.\n\n### Operational Support and Coordination ### \nOne of the challenges of decentralized organizations is that they can introduce a lot of inefficiencies by forcing the contributor teams to take care of operational overhead tasks outside of their core competencies.\n'

export default function BuildersProfilePage() {
  return (
    <PageContent className="mt-3 flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="w-full">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg leading-[120%] font-bold lg:text-xl">Powerhouse: Who we are</h1>

            <div className="flex items-center gap-4 lg:hidden">
              <EditContentDrawer />
              <ProfileFinancesDrawer />
            </div>
          </div>

          <Markdown>{markdown}</Markdown>
        </div>

        {/* TODO: move the cards to separate components */}
        <div className="sticky top-43.5 hidden h-fit w-full flex-col gap-6 md:w-96 lg:flex xl:w-104 xl:min-w-104">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl leading-[120%] font-bold">Finances</h2>
            <Card className="border-none py-0">
              <CardContent className="p-4">
                <ProfileFinancesCardContent />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl leading-[120%] font-bold">Something Wrong on this Page?</h2>
            <Card className="border-none py-0">
              <CardContent className="flex flex-col p-4">
                <ProfileCardEditContent />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </PageContent>
  )
}
