import makeBlockie from 'ethereum-blockies-base64'
import { useMemo, useState } from 'react'
import { addressShortener, calculateTotalBalance } from './utils'
import type { Wallet } from '../../wallets-section'

interface UseWalletsCardProps {
  wallets: Wallet[]
}

export interface ProccesedWallets extends Wallet {
  image: string
  shortAddress: string
}

export function useWalletsCard({ wallets }: UseWalletsCardProps) {
  const [toogleWalletTable, setToogleWalletTable] = useState(true)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null)

  const proccesedWallets: ProccesedWallets[] = useMemo(() => {
    return wallets.map((wallet) => ({
      ...wallet,
      image: makeBlockie(wallet.address),
      shortAddress: addressShortener(wallet.address),
    }))
  }, [wallets])

  const handleCopyMouseEnter = (index: number) => {
    setHoveredRowIndex(index)
    setTooltip('Copy Address.')
  }
  const handleCopyMouseLeave = () => {
    setHoveredRowIndex(null)
    setTooltip(null)
  }

  const handleCopyAddress = async (event: React.MouseEvent<HTMLButtonElement>, address: string) => {
    event.stopPropagation()
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
    proccesedWallets,
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
