import { ExternalLinkIcon, User } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from '@/modules/expense-reports/components/project-card'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Avatar, AvatarFallback } from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import type { Route } from 'next'

const markdown =
  '# **About Us** #\n\nThe new Powerhouse team uses its extensive knowledge and experience from its SES Core Unit and Maker Foundation days to contribute to the development of efficient and scalable decentralized organizations. It aims to work not just for Sky and its subDAOs, but as a fully independent service provider for the wider industry.\n\n### Services Offered ### \nAs an Ecosystem Actor, Powerhouse offers three categories of paid consultancy services. These services span various operational areas, from project management, to finances and transparency reporting, to legal-operational matters.\n\n### Decentralized Org Design and Business Process Analysis ### \nOpen and decentralized organizations are an emerging paradigm that can be difficult to get right at first. Sky has been one of the biggest pioneering experiments so far, achieving some successes but also laying bare the various challenges that these organizations may face.\n\n### Open-Source Software Development ### \nTo be successful, these organizations essentially need to trade traditional management oversight and extensive training programs with automated processes on their operational platform.\n\n### Operational Support and Coordination ### \nOne of the challenges of decentralized organizations is that they can introduce a lot of inefficiencies by forcing the contributor teams to take care of operational overhead tasks outside of their core competencies.\n'

export default function BuildersProfilePage() {
  return (
    <PageContent className="mt-4 flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="w-full">
          <h1 className="text-xl leading-[120%] font-bold">Powerhouse: Who we are</h1>
          {/* Note: the markdown is duplicated intentionally to test sticky content */}
          <Markdown>{markdown + markdown}</Markdown>
        </div>

        <div className="sticky top-43.5 flex h-fit w-full flex-col gap-6 md:w-96">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl leading-[120%] font-bold">Finances</h2>
            <Card className="border-none py-0">
              <CardContent className="flex flex-col gap-4 p-4">
                <p className="text-foreground/50 text-sm/4.5 font-semibold">
                  View all expenses of the Powerhouse Ecosystem Actor.
                </p>

                <div className="flex gap-4">
                  <InternalLink
                    href={'/network/powerhouse/builders/builder-1/expense-reports' as Route}
                  >
                    Budget Statements
                  </InternalLink>
                  <InternalLink
                    href={'/network/powerhouse/builders/builder-1/expense-reports' as Route}
                  >
                    Finances
                  </InternalLink>
                </div>

                <div className="bg-background relative mt-2 flex flex-wrap gap-6 rounded-lg border p-4">
                  <div className="bg-card text-foreground/30 absolute -top-2.5 left-2 px-2 text-sm/4.5 font-medium">
                    Auditors
                  </div>

                  <div className="flex items-center gap-2 text-base/6 font-semibold">
                    <Avatar className="size-6">
                      <AvatarFallback>
                        <User className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    deniz
                  </div>

                  <div className="flex items-center gap-2 text-base/6 font-semibold">
                    <Avatar className="size-6">
                      <AvatarFallback>
                        <User className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    dumitru
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl leading-[120%] font-bold">Something Wrong on this Page?</h2>
            <Card className="border-none py-0">
              <CardContent className="flex flex-col p-4">
                <div className="text-foreground/50 flex flex-col gap-2 text-sm/4.5 font-semibold">
                  <p>Are you part of this Ecosystem Actor?</p>
                  <p>We are still collecting all the relevant information.</p>
                  <p>
                    If you see something that needs updating, don&apos;t hesitate to contact us.
                  </p>
                </div>

                <div className="-mx-4 mt-5 mb-1">
                  <Separator />
                </div>

                <div className="text-base/6 font-semibold">Important Links</div>
                <div className="mt-4 flex flex-col items-start gap-2">
                  <Button variant="link" size="default" asChild className="text-foreground">
                    <Link href="/" target="_blank">
                      #dashboard-reporting channel <ExternalLinkIcon className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="link" size="default" asChild className="text-foreground">
                    <Link href="/" target="_blank">
                      Fill Typeform <ExternalLinkIcon className="size-4" />
                    </Link>
                  </Button>
                </div>
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
