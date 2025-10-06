import { ethers } from 'ethers'
import chiefHatABI from '../abi/chiefHatABI.json'
import { ETH_MAINNET_RPC, GOVERNANCE_CHIEF_CONTRACT_MAINNET } from '../constants'

export const getChiefHat = (): string | null => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(ETH_MAINNET_RPC)
    const chief = new ethers.Contract(GOVERNANCE_CHIEF_CONTRACT_MAINNET, chiefHatABI, provider)

    return chief.hat() as string | null
  } catch (_e) {
    return null
  }
}
