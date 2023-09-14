export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum RoundStatus {
  PAST = 'Past',
  LIVE = 'Live',
  NEXT = 'Next',
}

export interface Round {
  epoch: number
  status: RoundStatus
  lockPrice: bigint
  closePrice: bigint

  upAmount: bigint
  downAmount: bigint
  totalAmount: bigint

  lockTimestamp: number
  closeTimestamp: number

  upAddresses: string[]
  downAddresses: string[]
}

export interface RoundsFields {
  id: { id: string }
  rounds: RoundStruct[]
}

export interface RoundStruct {
  type: `0x${string}::prediction::Round`
  fields: {
    closePrice: string
    closeTimestamp: string
    downAmount: string
    downaddress: any // TODO
    downamount: string
    epoch: string
    lockPrice: string
    lockTimestamp: string
    oracleCalled: boolean
    totalAmount: string
    upAmount: string
    upaddress: any // TODO
    upamount: string
    upordown: boolean
  }
}

export interface CurrentEpochFields {
  id: { id: string }
  currentEpoch: string
}

export interface LastTokenPriceStruct {}

export interface LastTokenPriceFields {
  id: { id: string }
  name: number
  value: LastTokenPriceValueStruct
}

export interface LastTokenPriceValueStruct {
  type: string
  fields: LastTokenPriceValueFields
}

export interface LastTokenPriceValueFields {
  value: string
  decimal: number
  round: string
  timestamp: string
}
