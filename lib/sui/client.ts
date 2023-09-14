import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'

import { ROUNDS_ID } from '@/constants'

export const suiRpcUrl = getFullnodeUrl('mainnet')

export const suiClient = new SuiClient({ url: suiRpcUrl })

export function getRoundsObj() {
  return suiClient.getObject({ id: ROUNDS_ID })
}
