import { Mesh, Program, Renderer, Triangle } from 'ogl'

// Gradients are soft, so the scene renders below display resolution and at a
// capped frame rate without visible loss (a slight CSS blur covers the rest).
const MAX_PIXEL_RATIO = 1.5
const RESOLUTION_SCALE = 0.75
const FRAME_INTERVAL_MS = 1000 / 30
// Offset into the animation timeline whose composition works best as the
// first thing visitors see (picked visually).
const START_TIME_OFFSET_S = 2
// Cursor ripples ("stick in water"): how many live at once and for how long.
// MAX_RIPPLES must match the uRipples array size in the fragment shader.
// Ripples are never evicted early — each wave runs its full life so the
// motion stays continuous; new spawns are simply skipped while full.
const MAX_RIPPLES = 8
const RIPPLE_MAX_AGE_S = 2.5
const RIPPLE_SPAWN_INTERVAL_MS = 70
const RIPPLE_MIN_TRAVEL_PX = 24
// How much silk survives inside the measured content box (0 = fully cleared).
// The box is fed to uClearance so the headline keeps contrast wherever the
// folds drift; outside the feather the scene is untouched. Keep enough silk
// that the cleared zone reads as a thinning, not a white hole.
const CONTENT_CLEARANCE_MIN = 0.28

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Recreates the retired hero background video: silk-like curtain folds of
// blue -> violet -> pink on the right (with vertical glass-panel seams, thin
// crease highlights and a patchy mesh/grid shimmer) plus two tapered "sail"
// wisps on the left, all slowly morphing over a transparent background.
const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  // cursor ripples: xy = origin in uv, z = age in seconds (< 0 inactive)
  uniform vec3 uRipples[8];
  // content clearance box: xy = center in uv, zw = half extents in uv
  uniform vec4 uClearance;
  // remaining silk intensity inside the box (1.0 disables the clearance)
  uniform float uClearanceMin;

  const vec3 BLUE = vec3(0.122, 0.310, 0.960);
  const vec3 VIOLET = vec3(0.478, 0.227, 1.000);
  const vec3 PINK = vec3(0.973, 0.604, 0.812);
  const vec3 LAVENDER = vec3(0.835, 0.820, 0.945);

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float hash1(float n) {
    return fract(sin(n) * 43758.5453);
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
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + 10.0;
      a *= 0.45;
    }
    return v;
  }

  // tapered, gently curved "silk sail" with parallel line texture; rel in uv
  // units. axis points from base to tip; len/wid are half-extents; bend curves
  // the sail into a crescent. local returns (along, across) so callers can
  // texture the sail in its own curved frame.
  float wispShape(vec2 rel, vec2 axis, float len, float wid, float bend, float lineWarp, out vec2 local) {
    vec2 dir = normalize(axis);
    vec2 perp = vec2(-dir.y, dir.x);
    float along = dot(rel, dir) / len;
    float across = dot(rel, perp) / wid + bend * along * along;
    local = vec2(along, across);
    float width = mix(1.0, 0.12, smoothstep(-1.0, 1.0, along));
    float body = smoothstep(1.0, 0.35, abs(across) / width)
               * smoothstep(-1.1, -0.45, along)
               * smoothstep(1.05, 0.5, along);
    // filaments parallel to the spine, waving like a flag
    float wavy = across + sin(along * 2.5 + lineWarp) * 0.25;
    float lines = 0.55 + 0.45 * sin(wavy * 8.0);
    return body * lines;
  }

  // thin bright lines on the cell borders of a deformed grid
  float gridLineAt(vec2 g) {
    vec2 f = abs(fract(g) - 0.5);
    return smoothstep(0.38, 0.5, max(f.x, f.y));
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
      // each wave eases in at birth and decays out — no popping
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
    float t = uTime * 0.06;

    // shared flow field (domain warp)
    vec2 q = vec2(
      fbm(p * 0.9 + vec2(0.0, t * 0.8)),
      fbm(p * 0.9 + vec2(5.2, -t * 0.6))
    );
    vec2 r = vec2(
      fbm(p * 1.2 + 2.8 * q + vec2(1.7, 9.2) + t * 0.3),
      fbm(p * 1.2 + 2.8 * q + vec2(8.3, 2.8) - t * 0.2)
    );

    // feathered clearance around the hero copy: distance to the measured
    // content box (aspect-corrected so the falloff is round in pixels), with
    // a touch of flow-field noise so the dimmed edge stays organic
    vec2 cOver = max(abs(vUv - uClearance.xy) - uClearance.zw, vec2(0.0));
    cOver.x *= uAspect;
    float cDist = length(cOver) + (r.y - 0.5) * 0.05;
    float clearance = mix(uClearanceMin, 1.0, smoothstep(0.0, 0.15, cDist));

    // silk pleats: slanted, vertically-elongated folds
    float pleats = fbm(vec2(
      p.x * 1.5 + p.y * 0.35 + r.x * 2.2,
      p.y * 0.4 + r.y * 1.3 + t * 0.4 + sin(p.x * 2.2 - uTime * 0.30) * 0.06
    ));

    // main form on the right; boundary wobbles with the flow field, but
    // leftward growth is compressed so it stays right and only breathes a bit
    float wobble = (q.x - 0.5) * 0.55 + (r.y - 0.5) * 0.30;
    float over = max(wobble - 0.08, 0.0);
    wobble -= over * 0.75;
    float edge = uv.x + wobble;
    float mainMask = smoothstep(0.52, 0.66, edge);
    float rightBias = 0.16 * smoothstep(0.72, 1.0, uv.x + (q.y - 0.5) * 0.2);

    // glass-panel seams: near-vertical but gently curved and drifting
    float seamCurve = (uv.y - 0.5) * (uv.y - 0.5) * 0.5
      + sin(uv.y * 2.6 + uTime * 0.25) * 0.06
      + (r.y - 0.5) * 0.06;
    float panelCoord = (uv.x + seamCurve) * 8.5 + sin(t * 0.7) * 0.35;
    float panelId = floor(panelCoord);
    float panelShift = hash1(panelId * 17.31) - 0.5;
    // brighten right after each seam, like overlapping translucent sheets
    float seamFade = smoothstep(0.0, 0.45, fract(panelCoord));

    // two "silk sail" wisps on the left, breathing slowly
    float warp1 = r.x * 4.0 + uTime * 0.35;
    float warp2 = r.y * 4.0 - uTime * 0.30;
    vec2 local1;
    // top wisp: broad at top, tip sweeping down-left (as in the video)
    float wisp1 = wispShape(
      uv - vec2(0.13, 0.76) - (q - 0.5) * 0.05,
      vec2(-0.35 + sin(t * 1.3) * 0.10, -1.0),
      0.16, 0.055, 0.7 + 0.4 * sin(t * 0.9), warp1, local1
    ) * (0.72 + 0.28 * sin(uTime * 0.10 + 1.0));
    vec2 local2;
    // bottom wisp: long wing arching upward, sweeping right
    float wisp2 = wispShape(
      uv - vec2(0.18, 0.17) - (r - 0.5) * 0.05,
      vec2(1.0, 0.15 + cos(t * 1.1) * 0.10),
      0.21, 0.04, 0.55 + 0.30 * cos(t * 0.8), warp2, local2
    ) * (0.72 + 0.28 * cos(uTime * 0.085));
    float wsum = clamp(wisp1 + wisp2, 0.0, 1.0);

    // faint lavender haze cloud drifting left of the main form
    vec2 c3 = vec2(0.62, 0.52);
    vec2 d3 = (uv - c3 + (q - 0.5) * 0.3) * vec2(3.4, 2.6);
    float haze = smoothstep(1.0, 0.25, length(d3)) * (0.5 + 0.5 * q.y) * 0.28;

    // white slashes between pleats (vertically elongated cuts)
    float cut = fbm(vec2(
      p.x * 4.0 - p.y * 0.4 + r.y * 1.8,
      p.y * 0.55 + r.x * 0.9 - t * 0.3
    ));
    float whiteCut = smoothstep(0.44, 0.58, cut);

    // intensity: bold folds carve background-colored gaps
    float structure = smoothstep(0.36, 0.56, pleats + rightBias);
    structure *= 1.0 - whiteCut;
    // panel seams modulate the form like overlapping translucent sheets
    structure *= 0.74 + 0.26 * seamFade + 0.08 * panelShift;
    float intensity = mainMask * structure * 1.3 + wisp1 * 1.0 + wisp2 * 0.95;
    intensity = clamp(intensity, 0.0, 1.0) * clearance;

    // color: spectral mapping blue -> violet -> pink, biased by position
    float h = fbm(p * 0.7 + r * 1.0 + vec2(t * 0.4, 0.0));
    h = h * 0.65 + (uv.x - 0.40) * 0.45 + (0.7 - uv.y) * 0.12 + (pleats - 0.5) * 0.45 - 0.12
      + smoothstep(0.78, 1.05, uv.x + (q.x - 0.5) * 0.3) * 0.30
      + panelShift * 0.16 * mainMask;
    vec3 col = mix(BLUE, VIOLET, smoothstep(0.30, 0.50, h));
    col = mix(col, PINK, smoothstep(0.50, 0.66, h));
    // wisps shade pink on one flank into a light blue on the other
    vec3 wispBlue = vec3(0.30, 0.52, 0.98);
    vec3 wispCol1 = mix(PINK, wispBlue, clamp(local1.y * 0.5 + 0.5, 0.0, 1.0));
    vec3 wispCol2 = mix(wispBlue, PINK, clamp(local2.y * 0.5 + 0.5, 0.0, 1.0));
    col = mix(col, wispCol1, clamp(wisp1, 0.0, 1.0) * 0.85);
    col = mix(col, wispCol2, clamp(wisp2, 0.0, 1.0) * 0.85);

    // thin bright crease lines along the folds
    float crease = smoothstep(0.46, 0.50, pleats) * smoothstep(0.54, 0.50, pleats);
    col = mix(col, vec3(0.95, 0.97, 1.0), crease * 0.35 * mainMask);

    // fine mesh woven into the silk: the grid is carried by the same warp and
    // wave fields as the fabric, so cells bend, breathe and travel with the
    // folds (3D draped-wireframe effect) instead of sitting as a flat overlay
    vec2 meshUv = p
      + (r - 0.5) * 0.30
      + vec2(seamCurve * 0.5, sin(p.x * 2.2 - uTime * 0.30) * 0.06);
    // cells compress in the folds and stretch on the crests
    meshUv *= 1.0 + (pleats - 0.5) * 0.15;
    float formMesh = gridLineAt(meshUv * 110.0);
    // each wisp carries its mesh in its own curved, flag-waving frame
    float wispMesh1 = gridLineAt(vec2(
      local1.x * 0.16,
      (local1.y + sin(local1.x * 2.5 + warp1) * 0.25) * 0.055
    ) * 110.0);
    float wispMesh2 = gridLineAt(vec2(
      local2.x * 0.21,
      (local2.y + sin(local2.x * 2.5 + warp2) * 0.25) * 0.04
    ) * 110.0);
    float gridPatch = smoothstep(0.50, 0.68, fbm(p * 1.4 + vec2(7.7, 3.1) - t * 0.8));
    float meshShine = formMesh * mainMask * gridPatch * smoothstep(0.15, 0.5, intensity)
      + wispMesh1 * clamp(wisp1, 0.0, 1.0) * 1.1
      + wispMesh2 * clamp(wisp2, 0.0, 1.0) * 1.1;
    col = mix(col, vec3(1.0), clamp(meshShine, 0.0, 1.0) * 0.22);

    // lavender haze on the faint outer regions
    col = mix(LAVENDER, col, smoothstep(0.05, 0.45, intensity));

    intensity = max(intensity, haze * (1.0 - mainMask) * clearance);
    // faint water-glint so the ripple rings also read on the bare canvas
    float rippleGlow = clamp(length(rippleDisp) * 40.0, 0.0, 1.0);
    intensity = clamp(intensity + rippleGlow * 0.09, 0.0, 1.0);
    // dissolve before the bottom edge so the silk never touches the canvas
    // boundary — otherwise it hard-cuts where the hero overlay ends
    intensity *= smoothstep(0.0, 0.18, vUv.y);
    float alpha = pow(smoothstep(0.045, 1.0, intensity), 0.9);
    gl_FragColor = vec4(col * alpha, alpha);
  }
`

export interface AuroraSceneHandle {
  start: () => void
  stop: () => void
  dispose: () => void
}

export interface AuroraSceneOptions {
  onFirstFrame?: () => void
  /**
   * Element the silk should clear out of (the hero copy). Its box is measured
   * against the container and fed to the shader, which dims the aurora inside
   * a feathered zone around it so text on top keeps contrast.
   */
  clearanceElement?: HTMLElement | null
}

export function createAuroraScene(
  container: HTMLElement,
  options: AuroraSceneOptions = {},
): AuroraSceneHandle | null {
  const { onFirstFrame, clearanceElement } = options
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
    // WebGL unavailable — callers fall back to the static poster
    return null
  }
  const gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)

  const uTime = { value: START_TIME_OFFSET_S }
  const uAspect = { value: 1 }
  // flat [x, y, age, ...] vec3 array; age < 0 marks a free slot.
  // Must be a plain Array — ogl's uniform lookup rejects typed arrays for
  // array uniforms (Array.isArray check), silently skipping the upload.
  const rippleData: number[] = new Array<number>(MAX_RIPPLES * 3).fill(-1)
  const uRipples = { value: rippleData }
  // zero half-extents + min 1.0 keep the clearance a no-op until measured
  const uClearance = { value: [0.5, 0.5, 0, 0] }
  const uClearanceMin = { value: 1 }
  const program = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: { uTime, uAspect, uRipples, uClearance, uClearanceMin },
  })
  program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

  const geometry = new Triangle(gl)
  const mesh = new Mesh(gl, { geometry, program })

  function measureClearance() {
    if (!clearanceElement) return
    const containerRect = container.getBoundingClientRect()
    const contentRect = clearanceElement.getBoundingClientRect()
    if (containerRect.width === 0 || containerRect.height === 0) return
    const centerX = contentRect.left + contentRect.width / 2 - containerRect.left
    const centerY = contentRect.top + contentRect.height / 2 - containerRect.top
    uClearance.value = [
      centerX / containerRect.width,
      1 - centerY / containerRect.height,
      contentRect.width / 2 / containerRect.width,
      contentRect.height / 2 / containerRect.height,
    ]
    uClearanceMin.value = CONTENT_CLEARANCE_MIN
  }

  function resize() {
    const { clientWidth, clientHeight } = container
    if (clientWidth === 0 || clientHeight === 0) return
    renderer.setSize(clientWidth, clientHeight)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    uAspect.value = clientWidth / clientHeight
    measureClearance()
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  if (clearanceElement) resizeObserver.observe(clearanceElement)

  // spawn ripples along the cursor path; events arrive on the hero section
  // because the canvas itself sits in a pointer-events-none layer
  const ripples: Array<{ x: number; y: number; born: number }> = []
  let lastSpawnTime = 0
  let lastSpawnX = Infinity
  let lastSpawnY = Infinity
  function onPointerMove(event: Event) {
    const { clientX, clientY } = event as PointerEvent
    const now = performance.now()
    if (ripples.length >= MAX_RIPPLES) return
    if (now - lastSpawnTime < RIPPLE_SPAWN_INTERVAL_MS) return
    // ignore jitter: the cursor must travel before it stirs a new wave
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
