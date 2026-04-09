import { ArrowRight, Check, FileText, Shield, Users, Wallet } from 'lucide-react'

function DashboardCard() {
  return (
    <div className="bg-card text-card-foreground ring-border/60 w-full max-w-[375px] overflow-hidden rounded-2xl shadow-xs ring-1">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <div className="bg-primary flex size-10 items-center justify-center rounded-xl">
          <Shield className="text-primary-foreground size-5" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-foreground text-sm font-semibold">Your Operational Hub</p>
          <p className="text-muted-foreground text-xs">Swiss Association • Active</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full">
          <span className="bg-status-success size-1.5 rounded-full" />
          <span className="text-status-success text-xs font-medium">LIVE</span>
        </div>
      </div>

      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        <div className="bg-secondary flex flex-col items-center rounded-xl px-2 py-2.5">
          <span className="text-foreground text-base font-bold">$47.2k</span>
          <span className="text-foreground/80 text-[10px]">This month</span>
        </div>
        <div className="bg-secondary flex flex-col items-center rounded-xl px-2 py-2.5">
          <span className="text-foreground text-base font-bold">8</span>
          <span className="text-foreground/80 text-[10px]">Contributors</span>
        </div>
        <div className="bg-secondary flex flex-col items-center rounded-xl px-2 py-2.5">
          <span className="text-status-success text-base font-bold">100%</span>
          <span className="text-foreground/80 text-[10px]">Compliant</span>
        </div>
      </div>

      <div className="px-5">
        <p className="text-muted-foreground mb-2.5 text-[10px] font-semibold tracking-[0.08em] uppercase">
          Recent activity
        </p>
        <div className="flex flex-col gap-2">
          <div className="border-border/50 flex items-center gap-3 rounded-xl border p-4">
            <div className="bg-status-success/10 flex size-8 shrink-0 items-center justify-center rounded-full">
              <Check className="text-status-success size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">Invoice #1042 paid</p>
              <p className="text-muted-foreground truncate text-xs">dev@contributor.eth • $4,200</p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">2h ago</span>
          </div>
          <div className="border-border/50 flex items-center gap-3 rounded-xl border p-4">
            <div className="bg-status-progress/10 flex size-8 shrink-0 items-center justify-center rounded-full">
              <FileText className="text-status-progress size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">Agreement signed</p>
              <p className="text-muted-foreground truncate text-xs">New contributor onboarded</p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">5h ago</span>
          </div>
          <div className="border-border/50 flex items-center gap-3 rounded-xl border p-4">
            <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
              <Wallet className="text-primary size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">Payroll processed</p>
              <p className="text-muted-foreground truncate text-xs">8 contributors • $38,400</p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">1d ago</span>
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border-primary/10 mx-5 mt-3 mb-5 flex items-center justify-between rounded-xl border px-4 py-2">
        <div className="flex items-center gap-2.5">
          <Users className="text-primary size-4" />
          <span className="text-foreground text-sm font-medium">Your ops team is handling it</span>
        </div>
        <ArrowRight className="text-primary size-4" />
      </div>
    </div>
  )
}

export { DashboardCard }
