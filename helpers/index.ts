import memoize from 'lodash/memoize'
import BigNumber from 'bignumber.js'

import { BetPosition } from '@/types'

const BIG_NUMBER_ZERO = BigNumber(0)

const abs = (n: bigint) => (n === -0n || n < 0n ? -n : n)

const calculateMinDisplayed = memoize(
  (decimals: number, displayedDecimals: number): bigint => {
    return 10n ** BigInt(decimals) / 10n ** BigInt(displayedDecimals)
  },
  (decimals, displayedDecimals) => `${decimals}#${displayedDecimals}`,
)

export function getPriceDifference(price: bigint, lockPrice: bigint) {
  if (!price || !lockPrice) return 0n
  return price - lockPrice
}

export interface Amount {
  value: bigint
  decimals: number
}

type FormatPriceDifferenceParams = {
  amount: { value: bigint; decimals: number }
  unitPrefix: string
  minDisplayed: bigint
  displayedDecimals: number
}

function formatPriceDifference({
  amount,
  unitPrefix,
  minDisplayed,
  displayedDecimals,
}: FormatPriceDifferenceParams) {
  if (abs(amount.value) < minDisplayed) {
    const sign = amount.value < 0n ? -1n : 1n
    const signedPriceToFormat = minDisplayed * sign
    return `<${unitPrefix}${formatAmount(
      { value: signedPriceToFormat, decimals: amount.decimals },
      displayedDecimals,
    )}`
  }
  return `${unitPrefix}${formatAmount(amount, displayedDecimals)}`
}

export function formatUsd(amount: Amount, displayedDecimals: number) {
  return formatPriceDifference({
    amount,
    minDisplayed: calculateMinDisplayed(amount.decimals, displayedDecimals),
    unitPrefix: '$',
    displayedDecimals,
  })
}

export function formatToken(amount: Amount, displayedDecimals: number) {
  return formatPriceDifference({
    amount,
    minDisplayed: calculateMinDisplayed(amount.decimals, displayedDecimals),
    unitPrefix: '',
    displayedDecimals,
  })
}

export function formatAmount(amount: Amount, displayedDecimals = 4) {
  return new BigNumber(amount.value.toString())
    .div(10 ** amount.decimals)
    .toFixed(displayedDecimals)
}

export const getMultiplier = (total: bigint, amount: bigint) => {
  if (!total) return BIG_NUMBER_ZERO

  if (total === 0n || amount === 0n) return BIG_NUMBER_ZERO

  const rewardAmountFixed = new BigNumber(total.toString())
  const multiplierAmountFixed = new BigNumber(amount.toString())

  return rewardAmountFixed.div(multiplierAmountFixed)
}

export const getRoundPosition = (lockPrice: bigint, closePrice: bigint) => {
  if (!closePrice) return null

  if (closePrice === lockPrice) return BetPosition.HOUSE

  return closePrice > lockPrice ? BetPosition.BULL : BetPosition.BEAR
}
