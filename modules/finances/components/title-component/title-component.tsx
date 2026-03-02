import { cn } from '@/shared/lib/utils'
import { IconTitleWithCode } from './icon-title'

interface TitleComponentProps {
  title: string
  description?: string
  icon?: string
  code: string
  levelNumber: number
  networkName: string
}

export function TitleComponent({
  title,
  description,
  icon,
  code,
  levelNumber,
  networkName,
}: Readonly<TitleComponentProps>) {
  return (
    <div className={cn('mt-2 mb-2 flex flex-col sm:mt-0.25 md:-mt-[3px]', 'gap-2')}>
      {levelNumber === 1 ? (
        <h1
          data-slot="first-level-title"
          className="text-foreground m-0 text-lg/[120%] font-bold sm:mt-4 md:mt-0 md:text-xl xl:text-2xl"
        >
          {networkName} Ecosystem Finances
        </h1>
      ) : (
        <h1 data-slot="nth-title-box" className="m-0 sm:mt-4 md:mt-0 md:text-3xl">
          <IconTitleWithCode icon={icon} title={title} code={code} />
        </h1>
      )}
      <div
        data-slot="title-description"
        className={cn(
          'text-muted-foreground m-0 flex flex-col gap-2 text-sm leading-6 font-normal xl:text-base',
          levelNumber === 1 ? 'ml-0' : 'ml-10 md:ml-14',
          '[&_p]:m-0',
        )}
      >
        {levelNumber === 1 ? (
          <p>
            The {networkName} finances section offers a complete breakdown of budget and expenditure
            data for contributor teams contributing to the {networkName} Network.
          </p>
        ) : (
          description
        )}
      </div>
    </div>
  )
}
