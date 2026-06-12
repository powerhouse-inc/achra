import { Mesh, Program, Renderer, Triangle } from 'ogl'

// Powerhouse-brand light beams: two grainy light streaks — cyan sweeping in
// from the upper-left, magenta rising to the upper-right — converging near
// the lower center of a near-black field, like the powerhouse.io hero.
const MAX_PIXEL_RATIO = 1.5
const RESOLUTION_SCALE = 0.75
const FRAME_INTERVAL_MS = 1000 / 24

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

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // light trace anchored at the convergence point: a thin tip that widens
  // quadratically away from it, following an S-curved path (envelope-anchored
  // wave with a slow-drifting harmonic), with slow-sliding speckle
  float beam(vec2 p, vec2 meet, vec2 target, float baseWidth, float bend, float wiggle, float seed) {
    vec2 span = target - meet;
    float len = length(span);
    vec2 dir = span / len;
    vec2 perp = vec2(-dir.y, dir.x);
    vec2 rel = p - meet;
    float t = clamp(dot(rel, dir), 0.0, len);
    float along = t / len;
    // both curve terms vanish at the ends so the tips stay anchored
    float env = along * (1.0 - along) * 4.0;
    float trace = bend * env
      + wiggle * env * sin(along * 9.0 + seed * 2.1 + uTime * 0.1)
      + wiggle * 0.5 * env * sin(along * 15.0 - seed * 1.3 - uTime * 0.07);
    float side = dot(rel - dir * t, perp) - trace;
    float width = baseWidth * (0.04 + along * 0.25 + along * along * 1.8);
    float core = exp(-(side * side) / (width * width));
    float tip = smoothstep(0.0, 0.05, along);
    float bright = 0.55 + along * 0.75;
    float grain = 0.72 + 0.56 * hash(floor(vec2(t + uTime * 0.015, side) * 240.0) + seed);
    return core * tip * bright * grain;
  }

  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float sway = sin(uTime * 0.1) * 0.02;

    // beams converge near the lower center, tracing up and out
    vec2 meet = vec2(0.45 * uAspect, 0.14);
    float cyanGlow = beam(p, meet, vec2(-0.06 * uAspect, 1.25 + sway), 0.07, 0.06, 0.05, 0.0);
    float magentaGlow = beam(p, meet, vec2(1.08 * uAspect, 1.3 - sway), 0.065, -0.06, 0.055, 3.7);

    vec3 col = vec3(0.012, 0.016, 0.03);
    col += vec3(0.18, 0.75, 1.0) * cyanGlow * 1.05;
    col += vec3(0.78, 0.35, 1.0) * magentaGlow * 1.1;
    // white-hot cores
    col += vec3(1.0) * (pow(cyanGlow, 3.0) * 0.8 + pow(magentaGlow, 3.0) * 0.8);
    // faint grain over the dark field hides banding
    col += (hash(vUv * 719.3 + fract(uTime)) - 0.5) * 0.02;
    gl_FragColor = vec4(col, 1.0);
  }
`

export interface LightBeamsSceneHandle {
  start: () => void
  stop: () => void
  dispose: () => void
}

export function createLightBeamsScene(
  container: HTMLElement,
  onFirstFrame?: () => void,
): LightBeamsSceneHandle | null {
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
    // WebGL unavailable — callers keep the static fallback
    return null
  }
  const gl = renderer.gl

  const uTime = { value: 0 }
  const uAspect = { value: 1 }
  const program = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    depthTest: false,
    depthWrite: false,
    uniforms: { uTime, uAspect },
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
    uTime.value = time / 1000
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
