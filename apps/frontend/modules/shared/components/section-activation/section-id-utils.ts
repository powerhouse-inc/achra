const SECTION_ENCODING_PREFIX = '___SECTION___'

/**
 * Encode a section ID to a string that can be used as a hash, prefixing it
 * to prevent it to match with the actual section ID so the browser doesn't scroll to it
 *
 * @param sectionId - The section ID to encode
 * @returns The encoded section ID
 */
export function encodeSectionId(sectionId: string) {
  return `${SECTION_ENCODING_PREFIX}${sectionId}`
}

/**
 * Decode a section ID from a string that can be used as a hash
 *
 * @param sectionId - The section ID to decode
 * @returns The decoded section ID
 */
export function decodeSectionId(sectionId: string) {
  return sectionId.replace(SECTION_ENCODING_PREFIX, '')
}

/**
 * Scroll to a section by its ID with smooth behavior.
 * This is useful for anchor links that need to work even when the hash is already in the URL.
 *
 * @param sectionId - The section ID to scroll to
 */
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
