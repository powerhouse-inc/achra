'use client'

import { useMutation } from '@tanstack/react-query'

// Mocked mutation: real implementation will provision the user's Connect drive.
async function spinUpDrive(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 3000))
}

function useSpinUpDrive() {
  return useMutation({ mutationFn: spinUpDrive })
}

export { useSpinUpDrive }
