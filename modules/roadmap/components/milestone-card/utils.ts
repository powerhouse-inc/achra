export function formatDateStringToQuarter(targetDate: string): string {
  if (!targetDate) return ''

  try {
    const date = new Date(targetDate)
    const year = date.getUTCFullYear().toString().slice(-2)
    const month = date.getUTCMonth() + 1

    let quarter = 'Q1'
    if (month >= 4 && month <= 6) quarter = 'Q2'
    else if (month >= 7 && month <= 9) quarter = 'Q3'
    else if (month >= 10 && month <= 12) quarter = 'Q4'

    return `${quarter}’${year}`
  } catch {
    return ''
  }
}
