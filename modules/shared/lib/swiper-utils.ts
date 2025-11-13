/**
 * Adjusts the height of all elements matching the given className
 * to match the tallest element in the set.
 */
export function adjustElementHeights(className: string): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(className))
  if (elements.length > 0) {
    elements.forEach((element) => {
      element.style.height = 'auto'
      element.style.minHeight = 'auto'
    })

    let maxHeight = 0
    elements.forEach((element) => {
      const height = element.getBoundingClientRect().height
      if (height > maxHeight) {
        maxHeight = height
      }
    })

    if (maxHeight > 0) {
      elements.forEach((element) => {
        element.style.minHeight = `${maxHeight}px`
      })
    }
  }
}
