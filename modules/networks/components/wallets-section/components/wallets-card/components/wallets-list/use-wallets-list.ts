export function useWalletsList() {
  const handleItemClick = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank')
  }

  return { handleItemClick }
}
