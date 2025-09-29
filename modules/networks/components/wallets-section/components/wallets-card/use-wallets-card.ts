import { useMemo, useState } from 'react'
import { calculateTotalBalance } from './utils'
import type { Wallet } from '../../wallets-section'

interface UseWalletsCardProps {
  wallets: Wallet[]
}

export function useWalletsCard({ wallets }: UseWalletsCardProps) {
  const [toogleWalletTable, setToogleWalletTable] = useState(true)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null)

  const handleCopyMouseEnter = (index: number) => {
    setHoveredRowIndex(index)
    setTooltip('Copy link')
  }
  const handleCopyMouseLeave = () => {
    setHoveredRowIndex(null)
    setTooltip(null)
  }

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setTooltip('Copied!')
    } catch {
      setTooltip('Failed to copy URL')
    }
  }

  const handleToogleWalletTable = () => {
    setToogleWalletTable(!toogleWalletTable)
  }

  const usdsTotalBalance = useMemo(
    () => calculateTotalBalance({ wallets, balanceKey: 'usdsBalance' }),
    [wallets],
  )
  const skyTotalBalance = useMemo(
    () => calculateTotalBalance({ wallets, balanceKey: 'skyBalance' }),
    [wallets],
  )

  return {
    toogleWalletTable,
    usdsTotalBalance,
    skyTotalBalance,
    tooltip,
    hoveredRowIndex,
    handleToogleWalletTable,
    handleCopyAddress,
    handleCopyMouseEnter,
    handleCopyMouseLeave,
  }
}
