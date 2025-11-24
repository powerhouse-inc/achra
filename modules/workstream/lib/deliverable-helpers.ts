/**
 * Creates a title for a deliverable by concatenating the code and title
 *
 * @param code - The code of the deliverable
 * @param title - The title of the deliverable
 * @returns The title of the deliverable
 */
export function createDeliverableTitle(code: string, title: string): string {
  if (!code && !title) return '-'
  if (!code) return title
  if (!title) return code

  return `${code}: ${title}`
}
