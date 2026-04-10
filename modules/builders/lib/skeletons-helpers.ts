const LCG_MODULUS = 0x7fffffff
export const MAX_ROWS = 9

// Deterministic linear congruential generator to avoid impure randomness at render time.
function createLcg(seed: number) {
  let state = seed || 1
  return () => {
    state = (state * 48271) % LCG_MODULUS
    return state
  }
}

// Precompute pseudo-random widths within a range to vary the skeleton without runtime randomness.
export function buildWidths({ min, max, seed }: { min: number; max: number; seed: number }) {
  const next = createLcg(seed)
  return Array.from({ length: MAX_ROWS }, () => {
    const rand01 = next() / LCG_MODULUS
    return rand01 * (max - min) + min
  })
}
