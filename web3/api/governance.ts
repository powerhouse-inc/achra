import { ethers } from 'ethers'
import chiefHatABI from '../abi/chiefHatABI.json'
import { ETH_MAINNET_RPC, GOVERNANCE_CHIEF_CONTRACT_MAINNET } from '../constants'

export const getChiefHat = async (): Promise<string | null> => {
  try {
    // In ethers v6, use JsonRpcProvider instead of providers.JsonRpcProvider
    const provider = new ethers.JsonRpcProvider(ETH_MAINNET_RPC)
    const chief = new ethers.Contract(GOVERNANCE_CHIEF_CONTRACT_MAINNET, chiefHatABI, provider)

    // In ethers v6, contract calls are async by default
    const hat = await chief.hat()
    return hat as string | null
  } catch (_e) {
    return null
  }
}
