export const pascalCaseToNormalString = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1 $2')

export const toKebabCase = (str: string): string =>
  str
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camel case to kebab case
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^a-zA-Z0-9-]/g, '') // Remove any non-alphanumeric characters (except hyphens)
    .toLowerCase() // Convert all characters to lowercase

export const formatNumber = (number: number) =>
  number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  })

export const capitalizeWord = (word: string) =>
  word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase())

export const capitalizeSentence = (sentence: string) => {
  const words = sentence.split(' ')

  return words.map((w) => capitalizeWord(w)).join(' ')
}

export const formatAddressForOutput = (
  address: string | undefined,
  startChars = 5,
  endChars = 5,
  divider = '..',
) => {
  if (!address) {
    return ''
  }
  return `${address.slice(0, startChars)}${divider}${address.slice(address.length - endChars, address.length)}`
}
