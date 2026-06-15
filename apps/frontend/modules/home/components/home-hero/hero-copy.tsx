// Non-breaking space kept inside each word's span (matching BlurText) so the
// flex-wrap layout keeps word gaps without introducing stray flex items.
const NBSP = String.fromCharCode(0xa0)

// Per-word CSS entrance matching BlurText (direction "bottom"): blur 10->0,
// opacity 0->1, translateY 50->0 over 0.7s, staggered by `delay` ms per word.
// This is a SERVER component on purpose: the hero's largest text must paint at
// FCP and stay outside the hero's client hydration boundary, otherwise Lantern
// charges the LCP with the whole subtree's hydration as "render delay".
function AnimatedWords({ text, delayMs }: { text: string; delayMs: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            animation: 'blur-text-in 0.7s linear both',
            animationDelay: `${(index * delayMs) / 1000}s`,
            willChange: 'transform, filter, opacity',
          }}
        >
          {word}
          {index < words.length - 1 ? NBSP : null}
        </span>
      ))}
    </>
  )
}

/**
 * Server-rendered hero heading + subcopy. Passed into the (client) HomeHero as
 * a prop so it renders on the server and is excluded from the hero's client
 * hydration — keeping the LCP headline painted at first paint.
 */
export function HeroCopy() {
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="blur-text text-foreground flex flex-wrap justify-center text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          <AnimatedWords text="The Marketplace For Global Coordination" delayMs={80} />
        </h1>
      </div>
      <p className="blur-text text-foreground/80 mx-auto flex w-full max-w-5xl flex-wrap justify-center text-sm leading-relaxed sm:text-base">
        <AnimatedWords
          text="Achra connects organizations, builders and operators to scale networks across borders."
          delayMs={30}
        />
      </p>
    </div>
  )
}
