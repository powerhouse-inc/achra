import { ExternalLinkIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { Links } from '@/modules/builders/components/builders/components/links/links'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip/builders-skills-chip'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import { BuilderProfileHeaderDescription } from './builder-profile-header-description'

interface BuilderProfileHeaderProps {
  builder: BuilderProfileState
}

function BuilderProfileHeader({ builder }: BuilderProfileHeaderProps) {
  const parsedDate = useMemo(() => {
    if (!builder.lastModified) return undefined
    const date = DateTime.fromISO(builder.lastModified)
    return date.isValid ? date : undefined
  }, [builder.lastModified])

  const formattedDate = useMemo(() => {
    if (parsedDate?.isValid) {
      return parsedDate.toUTC().toFormat('dd-MMM-yyyy').toUpperCase()
    }
    return 'No data'
  }, [parsedDate])
  return (
    <div className="border-input mt-16 w-full border-b">
      <div className="relative container flex flex-col gap-2 pt-3 pb-2 md:gap-6 xl:gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex w-full gap-2 lg:gap-4">
            <Avatar className="size-12 md:size-14">
              <AvatarImage src={builder.icon} alt={builder.name ?? ''} />
              <AvatarFallback>{builder.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
            </Avatar>

            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col sm:gap-1 md:flex-row md:gap-4">
                {/* builder name */}
                <div className="flex items-center gap-1 sm:items-baseline md:items-start">
                  <div className="text-foreground/30 text-base/6 font-semibold uppercase sm:text-sm/5.5 md:text-base/6">
                    {builder.code}
                  </div>
                  <div className="text-foreground text-base/6 font-semibold md:text-lg md:leading-[120%] md:font-bold">
                    {builder.name}
                  </div>
                </div>

                {/* builder status */}
                <div className="flex flex-col gap-1 sm:flex-row">
                  <BuildersStatusChip status={builder.status} />

                  <Button variant="ghost" className="max-w-fit sm:h-6">
                    Since {formattedDate} <ExternalLinkIcon />
                  </Button>
                </div>
              </div>

              <div className="hidden gap-2 md:flex">
                {/* NOTE: There is a misspelling of skills in the builder profile state. The backend
                team is aware of this issue. */}
                {builder.skils.map((skill) => (
                  <BuildersSkillsChip key={`${skill}-mobile`} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-15 right-4 sm:top-2 sm:right-6 md:top-9.5 md:right-8 xl:top-2 xl:right-0">
            {builder.links.length > 0 && <Links links={builder.links} />}
          </div>
        </div>

        <div className="block md:hidden">
          {builder.skils.map((skill) => (
            <BuildersSkillsChip key={`${skill}-desktop`} skill={skill} />
          ))}
        </div>

        <BuilderProfileHeaderDescription description={builder.description} />
      </div>
    </div>
  )
}

export { BuilderProfileHeader }
