import type { SubmitRequestSlice } from '../types'

export function createSubmitRequestSlice(
  set: (partial: Partial<SubmitRequestSlice>) => void,
): SubmitRequestSlice {
  return {
    requestEntityData: null,
    actions: {
      setRequestEntityData: (requestEntityData) => {
        set({ requestEntityData })
      },
    },
  }
}
