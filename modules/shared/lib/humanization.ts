export const usLocalizedNumber = (num: number, decimalPlace = 0): string => {
  const value = num.toLocaleString('en-US', {
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace,
  })

  return value === '-0' ? '0' : value
}

export const formatValueScientificNotation = (value: number) => {
  // Truncate to 3 significant digits without rounding up
  const multiplier = Math.pow(10, 2 - Math.floor(Math.log10(Math.abs(value))))
  const truncated = Math.floor(value * multiplier) / multiplier

  if (truncated >= 100) {
    return Math.floor(truncated).toString()
  } else if (truncated >= 10) {
    return truncated.toFixed(1)
  } else {
    return truncated.toFixed(2)
  }
}

export const threeDigitsPrecisionHumanization = (num = 0, isHasAbsoluteValue = false) => {
  const absNum = isHasAbsoluteValue ? Math.abs(num) : num
  let value, suffix

  if (absNum >= 1_000_000_000_000_000) {
    value = num / 1_000_000_000_000_000
    suffix = 'Q'
  } else if (absNum >= 1_000_000_000_000) {
    value = num / 1_000_000_000_000
    suffix = 'T'
  } else if (absNum >= 1_000_000_000) {
    value = num / 1_000_000_000
    suffix = 'B'
  } else if (absNum >= 1_000_000) {
    value = num / 1_000_000
    suffix = 'M'
  } else if (absNum >= 1_000) {
    value = num / 1_000
    suffix = 'K'
  } else {
    value = num
    suffix = ''
  }

  // Formatter values for scientific notation
  const formattedValue = formatValueScientificNotation(value)

  return {
    value: formattedValue,
    suffix,
  }
}
