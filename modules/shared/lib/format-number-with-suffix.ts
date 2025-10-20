export const formatNumberWithSuffix = (num: number, showNegative = false) => {
  const isNegative = num < 0
  const mathAbsolute = Math.abs(num)

  let result

  const formatTruncated = (value: number) => {
    const truncated = Math.floor(value * 100) / 100
    return truncated.toFixed(2).replace(/\.?0+$/g, '')
  }

  if (mathAbsolute < 1000) {
    result = mathAbsolute.toString()
  } else if (mathAbsolute < 1000000) {
    result = `${formatTruncated(mathAbsolute / 1000)}K`
  } else if (mathAbsolute < 1000000000) {
    result = `${formatTruncated(mathAbsolute / 1000000)}M`
  } else if (mathAbsolute < 1000000000000) {
    result = `${formatTruncated(mathAbsolute / 1000000000)}B`
  } else if (mathAbsolute < 1000000000000000) {
    result = `${formatTruncated(mathAbsolute / 1000000000000)}T`
  } else if (mathAbsolute < 1000000000000000000) {
    result = `${formatTruncated(mathAbsolute / 1000000000000000)}Q`
  } else {
    result = mathAbsolute.toString()
  }

  return showNegative && isNegative ? `-${result}` : result
}
