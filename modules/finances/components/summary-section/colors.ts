/**
 * LimitedColorAssigner class is used to assign colors to a given key
 * It is used to assign colors to the doughnut chart series
 */
export class LimitedColorAssigner {
  private availableColors: string[]
  // map of key -> color index
  private assignedColors: Record<string, number>
  private assignedColorsAmount: number

  constructor(maxAssignedColor: number, handPickedColors: string[] = []) {
    this.assignedColorsAmount = 0
    this.availableColors = this.generateColorPalette(
      handPickedColors.length,
      maxAssignedColor - handPickedColors.length,
      handPickedColors,
    )
    this.assignedColors = {}
  }

  private generateColorPalette = (
    index: number,
    numColors: number,
    existingColors: string[] = [],
  ) => {
    const baseHue = (index * (360 / numColors)) % 360
    const colors = []

    for (let i = 0; i < numColors; i++) {
      let hue = (baseHue + i * (360 / numColors)) % 360
      if (hue < 10 || hue > 350) {
        // skip red hues, make them more orange
        hue = (hue + 30) % 360
      }
      const color = `hsl(${hue}, 70%, 50%)`
      colors.push(color)
    }

    return [...existingColors, ...colors]
  }

  private hashIndex(key: string) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i)
      hash = (hash * 31 + charCode) % this.availableColors.length
    }
    return hash
  }

  getColor = (key: string): string => {
    if (typeof this.assignedColors[key] === 'number') {
      return this.availableColors[this.assignedColors[key]]
    }

    if (this.assignedColorsAmount >= this.availableColors.length) {
      throw Error('No more colors available')
    }

    let index = this.hashIndex(key)
    const takenIndexes = Object.values(this.assignedColors)
    while (takenIndexes.includes(index)) {
      index = (index + 1) % this.availableColors.length
    }

    this.assignedColors[key] = index
    this.assignedColorsAmount += 1
    return this.availableColors[index]
  }
}

export const getColorForString = (value: string): string => {
  let hash = 0
  let i

  for (i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}
