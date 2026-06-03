import { useState } from 'react'

export function useBuildersHeader() {
  const [toogleBuildersHeader, setToogleBuildersHeader] = useState(true)

  return {
    toogleBuildersHeader,
    setToogleBuildersHeader,
  }
}
