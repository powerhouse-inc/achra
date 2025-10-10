export const formatNumberWithSuffix = (num: number, showNegative = false) => {
  const isNegative = num < 0
  const mathAbsolute = Math.abs(num)

  let result

  if (mathAbsolute < 1000) {
    result = mathAbsolute.toString()
  } else if (mathAbsolute < 1000000) {
    result = `${(mathAbsolute / 1000).toFixed(1).replace(/\.?0+$/g, '')}K`
  } else if (mathAbsolute < 1000000000) {
    result = `${(mathAbsolute / 1000000).toFixed(1).replace(/\.?0+$/g, '')}M`
  } else if (mathAbsolute < 1000000000000) {
    result = `${(mathAbsolute / 1000000000).toFixed(1).replace(/\.?0+$/g, '')}B`
  } else if (mathAbsolute < 1000000000000000) {
    result = `${(mathAbsolute / 1000000000000).toFixed(1).replace(/\.?0+$/g, '')}T`
  } else {
    result = mathAbsolute.toString()
  }

  return showNegative && isNegative ? `-${result}` : result
}
