import { ConnectLink } from '@/modules/shared/components/connect-link'

function ProfileCardEditContent() {
  return (
    <div>
      <div className="text-foreground/50 flex flex-col gap-2 text-sm/4.5 font-semibold">
        <p>Are you part of this Ecosystem Actor?</p>
        <p>We are still collecting all the relevant information.</p>
        <p>If you see something that needs updating, don&apos;t hesitate to contact us.</p>
      </div>

      <div className="mt-4 flex flex-col items-start gap-2">
        <ConnectLink
          action="edit"
          href="https://connect.sky.org/d/dashboard-reporting"
          driveName="Sky Network Admin"
          className="w-full sm:w-fit"
        />
      </div>
    </div>
  )
}

export { ProfileCardEditContent }
