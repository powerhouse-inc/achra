import { Mesh, Program, Renderer, Triangle } from 'ogl'

// Card-scale sibling of the hero aurora (hero-aurora-scene.ts): same silk
// palette, waves and cursor ripples, but composed for small, wide surfaces —
// a few large, slow folds in two balanced lobes that hug the left and right
// edges and keep the center clear for the card copy. The hero's fine detail
// (mesh shimmer, panel seams, dense pleats) is deliberately absent: at card
// size it reads as noise.
const MAX_PIXEL_RATIO = 1.5
const RESOLUTION_SCALE = 0.75
const FRAME_INTERVAL_MS = 1000 / 30
const START_TIME_OFFSET_S = 3
// Cursor ripples: identical mechanics to the hero scene.
const MAX_RIPPLES = 8
const RIPPLE_MAX_AGE_S = 2.5
const RIPPLE_SPAWN_INTERVAL_MS = 70
const RIPPLE_MIN_TRAVEL_PX = 24

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
  // cursor ripples: xy = origin in uv, z = age in seconds (< 0 inactive)
  uniform vec3 uRipples[8];

  const vec3 BLUE = vec3(0.122, 0.310, 0.960);
  const vec3 VIOLET = vec3(0.478, 0.227, 1.000);
  const vec3 PINK = vec3(0.973, 0.604, 0.812);
  const vec3 LAVENDER = vec3(0.835, 0.820, 0.945);

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
    float v = 0.0;
    float a = 0.55;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + 10.0;
      a *= 0.45;
    }
    return v;
  }

  // radial displacement from the cursor ripples: each one is an expanding,
  // decaying ring that refracts the silk like water stirred by a stick
  vec2 rippleDisplacement(vec2 uv) {
    vec2 disp = vec2(0.0);
    for (int i = 0; i < 8; i++) {
      vec3 rp = uRipples[i];
      float active = step(0.0, rp.z);
      vec2 d = vec2((uv.x - rp.x) * uAspect, uv.y - rp.y);
      float dist = max(length(d), 1e-4);
      float band = dist - rp.z * 0.28;
      float ring = sin(band * 45.0) * exp(-band * band * 130.0);
      float grow = smoothstep(0.0, 0.3, rp.z);
      float fade = exp(-rp.z * 1.8);
      disp += (d / dist) * ring * grow * fade * active * 0.02;
    }
    return disp;
  }

  void main() {
    vec2 rippleDisp = rippleDisplacement(vUv);
    vec2 uv = vUv + rippleDisp;
    vec2 p = vec2(uv.x * uAspect, uv.y);
    float t = uTime * 0.05;

    // slow, low-frequency flow so the silk reads as a few large waves
    vec2 q = vec2(
      fbm(p * 0.45 + vec2(0.0, t * 0.9)),
      fbm(p * 0.45 + vec2(4.1, -t * 0.7))
    );

    // large soft folds carried by the flow
    float folds = fbm(vec2(p.x * 0.7 + q.x * 1.4, uv.y * 0.8 + q.y * 1.1 + t * 0.6));

    // two breathing lobes hugging the edges; the center stays clear
    float lobeR = smoothstep(0.60, 0.92, uv.x + (q.x - 0.5) * 0.4);
    float lobeL = smoothstep(0.60, 0.92, 1.0 - uv.x + (q.y - 0.5) * 0.4);
    float lobes = max(lobeR, lobeL);

    float structure = smoothstep(0.32, 0.62, folds + 0.1);
    float intensity = lobes * structure * 1.15;

    // thin bright crease along the fold ridges — just enough silk character
    float crease = smoothstep(0.46, 0.5, folds) * smoothstep(0.54, 0.5, folds);

    // color: blue on the left sweeping to violet / pink on the right
    float h = folds * 0.45 + uv.x * 0.5 + (q.x - 0.5) * 0.25 - 0.08;
    vec3 col = mix(BLUE, VIOLET, smoothstep(0.28, 0.55, h));
    col = mix(col, PINK, smoothstep(0.55, 0.72, h));
    col = mix(col, vec3(0.95, 0.97, 1.0), crease * 0.3 * lobes);
    col = mix(LAVENDER, col, smoothstep(0.05, 0.45, intensity));

    // faint water-glint so the ripple rings also read on the bare canvas
    float rippleGlow = clamp(length(rippleDisp) * 40.0, 0.0, 1.0);
    intensity = clamp(intensity + rippleGlow * 0.08, 0.0, 1.0);

    float alpha = pow(smoothstep(0.04, 1.0, intensity), 0.9);
    gl_FragColor = vec4(col * alpha, alpha);
  }
`

export interface CardAuroraSceneHandle {
  start: () => void
  stop: () => void
  dispose: () => void
}

export function createCardAuroraScene(
  container: HTMLElement,
  onFirstFrame?: () => void,
): CardAuroraSceneHandle | null {
  let renderer: Renderer
  try {
    renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
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
  gl.clearColor(0, 0, 0, 0)

  const uTime = { value: START_TIME_OFFSET_S }
  const uAspect = { value: 1 }
  // flat [x, y, age, ...] vec3 array; age < 0 marks a free slot. Must be a
  // plain Array — ogl's uniform lookup rejects typed arrays for array uniforms.
  const rippleData: number[] = new Array<number>(MAX_RIPPLES * 3).fill(-1)
  const uRipples = { value: rippleData }
  const program = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: { uTime, uAspect, uRipples },
  })
  program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

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

  // spawn ripples along the cursor path; events arrive on the enclosing
  // section because the canvas itself sits in a pointer-events-none layer
  const ripples: Array<{ x: number; y: number; born: number }> = []
  let lastSpawnTime = 0
  let lastSpawnX = Infinity
  let lastSpawnY = Infinity
  function onPointerMove(event: Event) {
    const { clientX, clientY } = event as PointerEvent
    const now = performance.now()
    if (ripples.length >= MAX_RIPPLES) return
    if (now - lastSpawnTime < RIPPLE_SPAWN_INTERVAL_MS) return
    if (Math.hypot(clientX - lastSpawnX, clientY - lastSpawnY) < RIPPLE_MIN_TRAVEL_PX) return
    const rect = container.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const x = (clientX - rect.left) / rect.width
    const y = 1 - (clientY - rect.top) / rect.height
    if (x < 0 || x > 1 || y < 0 || y > 1) return
    lastSpawnTime = now
    lastSpawnX = clientX
    lastSpawnY = clientY
    ripples.push({ x, y, born: now })
  }
  const pointerTarget = container.closest('section') ?? container
  pointerTarget.addEventListener('pointermove', onPointerMove, { passive: true })

  function updateRipples(time: number) {
    while (ripples.length > 0 && (time - ripples[0].born) / 1000 > RIPPLE_MAX_AGE_S) {
      ripples.shift()
    }
    for (let i = 0; i < MAX_RIPPLES; i++) {
      const base = i * 3
      if (i < ripples.length) {
        const ripple = ripples[i]
        rippleData[base] = ripple.x
        rippleData[base + 1] = ripple.y
        rippleData[base + 2] = (time - ripple.born) / 1000
      } else {
        rippleData[base + 2] = -1
      }
    }
  }

  let rafId = 0
  let running = false
  let firstFrameRendered = false
  let lastFrameTime = 0
  function renderLoop(time: number) {
    if (!running) return
    rafId = requestAnimationFrame(renderLoop)
    // ripples move fast — render at full frame rate while any are live
    if (ripples.length === 0 && time - lastFrameTime < FRAME_INTERVAL_MS) return
    lastFrameTime = time
    updateRipples(time)
    uTime.value = time / 1000 + START_TIME_OFFSET_S
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
      pointerTarget.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      geometry.remove()
      program.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    },
  }
}
