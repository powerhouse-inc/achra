import { FileText } from 'lucide-react'

function MarketplaceHeader() {
  return (
    <div className="border-border flex items-center gap-3 border-b pb-2">
      <div className="flex items-center gap-2">
        <FileText size={24} />
      </div>
      <h1 className="text-xl leading-[120%] font-bold">Powerhouse Genesis OH</h1>
    </div>
  )
}

export { MarketplaceHeader }
