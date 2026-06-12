import type { GradientFlowConfig } from './gradient-flow-scene'
import type { CSSProperties } from 'react'

// Artwork palettes for the ambient gradient-flow backgrounds. Like the hero
// aurora shader, these are decorative artwork colors (not UI chrome), so they
// live here as data instead of design tokens. Each preset drives both the
// WebGL scene and a static CSS radial-gradient fallback generated from the
// same blob data (reduced motion / WebGL unavailable / pre-paint state).

function rgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '')
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ]
}

function cssColor([r, g, b]: [number, number, number], alpha: number) {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`
}

function buildFallbackStyle(config: GradientFlowConfig): CSSProperties {
  // CSS paints the first layer on top; the shader blends blobs in order with
  // later blobs over earlier ones, so reverse to approximate the same stack
  const layers = [...config.blobs].reverse().map((blob) => {
    const x = (blob.x * 100).toFixed(1)
    const y = ((1 - blob.y) * 100).toFixed(1)
    const radius = (blob.radius * 100).toFixed(0)
    return `radial-gradient(ellipse ${radius}% ${radius}% at ${x}% ${y}%, ${cssColor(blob.color, blob.strength)} 0%, transparent 100%)`
  })
  return {
    backgroundColor: cssColor(config.base, 1),
    backgroundImage: layers.join(', '),
  }
}

const GRADIENT_FLOW_CONFIGS = {
  // full-bleed dark band behind the Powerhouse Stack section
  powerhouseBand: {
    base: rgb('#0a0c15'),
    blobs: [
      {
        x: 0.12,
        y: 0.78,
        radius: 0.85,
        strength: 0.6,
        color: rgb('#1b1444'),
        drift: [0.05, 0.04],
        speed: 0.1,
      },
      {
        x: 0.78,
        y: 0.7,
        radius: 0.7,
        strength: 0.55,
        color: rgb('#2b4dff'),
        drift: [0.07, 0.05],
        speed: 0.15,
        phase: 1.3,
      },
      {
        x: 0.94,
        y: 0.15,
        radius: 0.62,
        strength: 0.5,
        color: rgb('#6d28d9'),
        drift: [0.05, 0.07],
        speed: 0.19,
        phase: 2.6,
      },
      {
        x: 0.4,
        y: 0.05,
        radius: 0.55,
        strength: 0.3,
        color: rgb('#b85ad6'),
        drift: [0.08, 0.05],
        speed: 0.12,
        phase: 4.4,
      },
      {
        x: 0.3,
        y: 0.4,
        radius: 0.5,
        strength: 0.35,
        color: rgb('#101733'),
        drift: [0.05, 0.06],
        speed: 0.14,
        phase: 5.6,
      },
    ],
  },
  // violet → pink bloom (why-achra payments panel)
  payments: {
    base: rgb('#ffffff'),
    blobs: [
      {
        x: 0.86,
        y: 0.02,
        radius: 0.5,
        strength: 0.55,
        color: rgb('#ddd6fe'),
        drift: [0.05, 0.04],
        speed: 0.14,
        phase: 1.2,
      },
      {
        x: 1.02,
        y: 0.52,
        radius: 0.6,
        strength: 0.8,
        color: rgb('#8b5cf6'),
        drift: [0.04, 0.06],
        speed: 0.18,
      },
      {
        x: 0.8,
        y: 1.02,
        radius: 0.52,
        strength: 0.7,
        color: rgb('#f0a8d8'),
        drift: [0.06, 0.04],
        speed: 0.21,
        phase: 3.1,
      },
    ],
  },
  // blue → violet glow (why-achra AI panel)
  ai: {
    base: rgb('#ffffff'),
    blobs: [
      {
        x: 0.05,
        y: -0.06,
        radius: 0.55,
        strength: 0.75,
        color: rgb('#7cb8fa'),
        drift: [0.06, 0.04],
        speed: 0.17,
      },
      {
        x: 0.4,
        y: -0.1,
        radius: 0.55,
        strength: 0.65,
        color: rgb('#a78bfa'),
        drift: [0.05, 0.05],
        speed: 0.2,
        phase: 2.2,
      },
      {
        x: 0.9,
        y: 0.02,
        radius: 0.45,
        strength: 0.5,
        color: rgb('#f9a8d4'),
        drift: [0.04, 0.06],
        speed: 0.15,
        phase: 4.0,
      },
    ],
  },
  // soft lavender / pink wash (why-achra use-cases panel)
  useCases: {
    base: rgb('#ffffff'),
    blobs: [
      {
        x: 0.3,
        y: -0.05,
        radius: 0.6,
        strength: 0.6,
        color: rgb('#c4b5fd'),
        drift: [0.05, 0.05],
        speed: 0.16,
      },
      {
        x: 0.85,
        y: -0.02,
        radius: 0.55,
        strength: 0.55,
        color: rgb('#fbcfe8'),
        drift: [0.06, 0.04],
        speed: 0.19,
        phase: 2.6,
      },
      {
        x: 1.05,
        y: 0.4,
        radius: 0.36,
        strength: 0.4,
        color: rgb('#bfdbfe'),
        drift: [0.04, 0.05],
        speed: 0.13,
        phase: 4.6,
      },
    ],
  },
  // hero aurora palette over the waitlist card
  waitlist: {
    base: rgb('#f7f6f4'),
    blobs: [
      {
        x: 0.04,
        y: 0.5,
        radius: 0.65,
        strength: 0.85,
        color: rgb('#2b4dff'),
        drift: [0.05, 0.06],
        speed: 0.18,
      },
      {
        x: 0.22,
        y: 0.75,
        radius: 0.7,
        strength: 0.75,
        color: rgb('#7a3aff'),
        drift: [0.07, 0.05],
        speed: 0.15,
        phase: 1.9,
      },
      {
        x: 0.14,
        y: 0.12,
        radius: 0.55,
        strength: 0.65,
        color: rgb('#f59ad0'),
        drift: [0.05, 0.08],
        speed: 0.22,
        phase: 3.4,
      },
      {
        x: 0.95,
        y: 0.35,
        radius: 0.6,
        strength: 0.5,
        color: rgb('#a78bfa'),
        drift: [0.07, 0.06],
        speed: 0.17,
        phase: 5.1,
      },
      {
        x: 1.0,
        y: 0.85,
        radius: 0.45,
        strength: 0.4,
        color: rgb('#f0a8d8'),
        drift: [0.05, 0.05],
        speed: 0.2,
        phase: 0.7,
      },
    ],
  },
  // panel-wide wash: blue glow left, violet→pink bloom right (why-achra)
  valueFlow: {
    base: rgb('#ffffff'),
    blobs: [
      {
        x: 0.06,
        y: -0.08,
        radius: 0.6,
        strength: 0.6,
        color: rgb('#7cb8fa'),
        drift: [0.06, 0.04],
        speed: 0.16,
      },
      {
        x: 0.35,
        y: 1.05,
        radius: 0.5,
        strength: 0.4,
        color: rgb('#ddd6fe'),
        drift: [0.05, 0.05],
        speed: 0.13,
        phase: 1.8,
      },
      {
        x: 1.02,
        y: 0.6,
        radius: 0.62,
        strength: 0.7,
        color: rgb('#8b5cf6'),
        drift: [0.04, 0.06],
        speed: 0.18,
        phase: 3.0,
      },
      {
        x: 0.88,
        y: -0.05,
        radius: 0.5,
        strength: 0.6,
        color: rgb('#f0a8d8'),
        drift: [0.06, 0.04],
        speed: 0.21,
        phase: 4.5,
      },
    ],
  },
  // soft violet glow backdrop (operational hub dashboard)
  hubGlow: {
    base: rgb('#fcfbfb'),
    blobs: [
      {
        x: 0.5,
        y: 0.55,
        radius: 0.55,
        strength: 0.5,
        color: rgb('#c4b5fd'),
        drift: [0.05, 0.05],
        speed: 0.16,
      },
      {
        x: 0.25,
        y: 0.3,
        radius: 0.45,
        strength: 0.4,
        color: rgb('#fbcfe8'),
        drift: [0.06, 0.05],
        speed: 0.19,
        phase: 2.4,
      },
      {
        x: 0.78,
        y: 0.75,
        radius: 0.45,
        strength: 0.4,
        color: rgb('#93c5fd'),
        drift: [0.05, 0.06],
        speed: 0.14,
        phase: 4.1,
      },
    ],
  },
} satisfies Record<string, GradientFlowConfig>

type GradientFlowPresetName = keyof typeof GRADIENT_FLOW_CONFIGS

interface GradientFlowPreset {
  config: GradientFlowConfig
  fallbackStyle: CSSProperties
}

const GRADIENT_FLOW_PRESETS = Object.fromEntries(
  Object.entries(GRADIENT_FLOW_CONFIGS).map(([name, config]) => [
    name,
    { config, fallbackStyle: buildFallbackStyle(config) },
  ]),
) as Record<GradientFlowPresetName, GradientFlowPreset>

export { GRADIENT_FLOW_PRESETS }
export type { GradientFlowPresetName }
