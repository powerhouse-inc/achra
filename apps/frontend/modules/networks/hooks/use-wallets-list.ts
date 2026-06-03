export function useWalletsList() {
  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>, address: string) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
      window.open(`https://etherscan.io/address/${address}`, '_blank')
    }
  }

  return { handleItemClick }
}
