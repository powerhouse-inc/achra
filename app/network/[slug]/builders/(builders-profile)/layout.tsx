export default function BuildersProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4">
      {/* TODO: implement the builder header/breadcrumbs */}
      <div className="bg-accent text-accent-foreground container flex h-26 items-center justify-center text-center">
        Builder header
      </div>

      {children}
    </div>
  )
}
