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
