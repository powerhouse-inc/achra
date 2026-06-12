import { Mesh, Program, Renderer, Triangle } from 'ogl'

// Ambient mesh-gradient flow: a handful of soft color blobs drifting over a
// base color, with an fbm wobble so edges morph organically. Used as animated
// card/section backgrounds (the WebGL twin of a static radial-gradient mesh).
// Gradients are extremely soft, so the scene renders far below display
// resolution at a low frame rate without visible loss.
const MAX_PIXEL_RATIO = 1.5
const RESOLUTION_SCALE = 0.5
const FRAME_INTERVAL_MS = 1000 / 24
export const MAX_FLOW_BLOBS = 5

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uBase;
  // xy = center in uv, z = radius in uv y-units, w = strength (0 disables)
  uniform vec4 uBlobs[5];
  uniform vec3 uBlobColors[5];
  // xy = drift amplitude in uv, z = drift speed, w = phase offset
  uniform vec4 uBlobMotion[5];

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = noise(p) * 0.6;
    v += noise(p * 2.1 + 7.3) * 0.4;
    return v;
  }

  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime;
    // shared wobble field keeps every blob edge morphing in sync
    float wobble = fbm(p * 1.6 + vec2(t * 0.05, -t * 0.04));

    vec3 col = uBase;
    for (int i = 0; i < 5; i++) {
      vec4 blob = uBlobs[i];
      vec4 m = uBlobMotion[i];
      vec2 center = blob.xy
        + vec2(sin(t * m.z + m.w), cos(t * m.z * 0.8 + m.w * 1.7)) * m.xy;
      vec2 cp = vec2(center.x * uAspect, center.y);
      float d = length(p - cp) / max(blob.z, 1e-4);
      d += (wobble - 0.5) * 0.4;
      float w = (1.0 - smoothstep(0.0, 1.0, d)) * blob.w;
      col = mix(col, uBlobColors[i], clamp(w, 0.0, 1.0));
    }

    // fine animated grain hides banding in the wide soft ramps
    col += (hash(vUv * 913.7 + fract(t)) - 0.5) * 0.015;
    gl_FragColor = vec4(col, 1.0);
  }
`

export interface GradientFlowBlob {
  /** Center in unit coords; x from left, y from bottom (GL convention) */
  x: number
  y: number
  /** Radius in units of container height */
  radius: number
  /** Blend strength at the blob center, 0–1 */
  strength: number
  /** [r, g, b] in 0–1 */
  color: [number, number, number]
  /** Drift amplitude in unit coords */
  drift?: [number, number]
  /** Drift speed (radians per second-ish; keep ≤ 0.3 for ambient motion) */
  speed?: number
  /** Phase offset so blobs don't move in lockstep */
  phase?: number
}

export interface GradientFlowConfig {
  /** Base [r, g, b] in 0–1 */
  base: [number, number, number]
  blobs: GradientFlowBlob[]
  /** Global time multiplier (1 = default ambient pace) */
  speed?: number
}

export interface GradientFlowSceneHandle {
  start: () => void
  stop: () => void
  dispose: () => void
}

export function createGradientFlowScene(
  container: HTMLElement,
  config: GradientFlowConfig,
  onFirstFrame?: () => void,
): GradientFlowSceneHandle | null {
  let renderer: Renderer
  try {
    renderer = new Renderer({
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      dpr: Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO) * RESOLUTION_SCALE,
    })
  } catch {
    // WebGL unavailable — callers keep the static gradient fallback
    return null
  }
  const gl = renderer.gl

  // flat plain arrays: ogl's uniform lookup rejects typed arrays for array
  // uniforms (Array.isArray check), silently skipping the upload
  const blobData: number[] = new Array<number>(MAX_FLOW_BLOBS * 4).fill(0)
  const colorData: number[] = new Array<number>(MAX_FLOW_BLOBS * 3).fill(0)
  const motionData: number[] = new Array<number>(MAX_FLOW_BLOBS * 4).fill(0)
  config.blobs.slice(0, MAX_FLOW_BLOBS).forEach((blob, i) => {
    blobData[i * 4] = blob.x
    blobData[i * 4 + 1] = blob.y
    blobData[i * 4 + 2] = blob.radius
    blobData[i * 4 + 3] = blob.strength
    colorData[i * 3] = blob.color[0]
    colorData[i * 3 + 1] = blob.color[1]
    colorData[i * 3 + 2] = blob.color[2]
    motionData[i * 4] = blob.drift?.[0] ?? 0.04
    motionData[i * 4 + 1] = blob.drift?.[1] ?? 0.05
    motionData[i * 4 + 2] = blob.speed ?? 0.18
    motionData[i * 4 + 3] = blob.phase ?? i * 2.1
  })

  const uTime = { value: 0 }
  const uAspect = { value: 1 }
  const speed = config.speed ?? 1
  const program = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTime,
      uAspect,
      uBase: { value: [...config.base] },
      uBlobs: { value: blobData },
      uBlobColors: { value: colorData },
      uBlobMotion: { value: motionData },
    },
  })

  const geometry = new Triangle(gl)
  const mesh = new Mesh(gl, { geometry, program })

  function resize() {
    const { clientWidth, clientHeight } = container
    if (clientWidth === 0 || clientHeight === 0) return
    renderer.setSize(clientWidth, clientHeight)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    uAspect.value = clientWidth / clientHeight
    // setSize clears the drawing buffer; repaint synchronously so the canvas
    // never shows a cleared (black/transparent) frame while resizing
    renderer.render({ scene: mesh })
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  let rafId = 0
  let running = false
  let firstFrameRendered = false
  let lastFrameTime = 0
  function renderLoop(time: number) {
    if (!running) return
    rafId = requestAnimationFrame(renderLoop)
    if (time - lastFrameTime < FRAME_INTERVAL_MS) return
    lastFrameTime = time
    uTime.value = (time / 1000) * speed
    renderer.render({ scene: mesh })
    if (!firstFrameRendered) {
      firstFrameRendered = true
      onFirstFrame?.()
    }
  }

  container.appendChild(gl.canvas)
  resize()

  function stop() {
    running = false
    cancelAnimationFrame(rafId)
  }

  return {
    start: () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(renderLoop)
    },
    stop,
    dispose: () => {
      stop()
      resizeObserver.disconnect()
      geometry.remove()
      program.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    },
  }
}
