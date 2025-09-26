import { useMemo, useState } from 'react'
import { calculateTotalBalance } from './utils'
import type { Wallet } from '../../wallets-section'

interface UseWalletsCardProps {
  wallets: Wallet[]
}

export function useWalletsCard({ wallets }: UseWalletsCardProps) {
  const [toogleWalletTable, setToogleWalletTable] = useState(true)

  const handleToogleWalletTable = () => {
    setToogleWalletTable(!toogleWalletTable)
  }

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
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
    handleToogleWalletTable,
    handleCopyAddress,
  }
}
