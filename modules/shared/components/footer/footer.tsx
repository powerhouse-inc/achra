'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import AchraImagotipo from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import type { Route } from 'next'

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { label: 'Explore Achra', href: '/' },
      { label: 'Explore Vetra', href: 'https://vetra.io' },
      { label: 'Use Cases', href: '/cases' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About us', href: 'https://powerhouse.io' },
      { label: 'Academy', href: 'https://academy.vetra.io' },
    ],
  },
}

type LlmKey = 'chatgpt' | 'claude' | 'grok'

const llmConversations: Record<LlmKey, Array<{ label: string; href: string }>> = {
  chatgpt: [
    {
      label: 'What Is Achra?',
      href: 'https://chatgpt.com/share/696e8ea2-5390-8003-8bdb-c08e815452cf',
    },
    {
      label: 'Achra Operational Hub',
      href: 'https://chatgpt.com/share/6970f495-b9ec-800d-aac5-7c433607681c',
    },
    {
      label: 'Achra and Automation',
      href: 'https://chatgpt.com/share/6970f4c8-2c28-800d-a658-6195737ebbfa',
    },
  ],
  claude: [
    {
      label: 'Tell me about Achra',
      href: 'https://claude.ai/share/d193b0fa-0759-4c24-bf5a-d499b9e3458f',
    },
    {
      label: 'The Future of Work',
      href: 'https://claude.ai/share/d0cf7eb1-6753-4556-928b-6e4525769f17',
    },
  ],
  grok: [
    {
      label: 'Tell me About Achra',
      href: 'https://x.com/i/grok/share/eeeb0028d4de4406a2491233ba0813a1',
    },
    {
      label: 'Achra Benefits',
      href: 'https://x.com/i/grok/share/af97077264dc430a9eadef0b8d94e237',
    },
    {
      label: 'Operational Hub Benefits',
      href: 'https://x.com/i/grok/share/64cb0afcd8f545eb9744cfb092d0cccc',
    },
  ],
}

const llmLabels: Record<LlmKey, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  grok: 'Grok',
}

const llmIcons: Record<LlmKey, React.ReactNode> = {
  chatgpt: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  claude: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
    </svg>
  ),
  grok: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd">
      <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" />
    </svg>
  ),
}

const llmKeys: LlmKey[] = ['chatgpt', 'claude', 'grok']

function LlmSection() {
  const [activeLlm, setActiveLlm] = useState<LlmKey | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleLlmHover = (key: LlmKey) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setActiveLlm(key)
  }

  const handleCardMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveLlm(null)
    }, 100)
  }

  return (
    <div ref={containerRef} className="relative" onMouseLeave={handleCardMouseLeave}>
      {/* Card — absolutely positioned above the icons */}
      <AnimatePresence>
        {activeLlm && (
          <div className="absolute -bottom-8 -left-9 w-[342px] overflow-hidden px-4 pb-4">
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.97 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-card border-border origin-bottom overflow-hidden rounded-xl border pb-16 shadow-lg"
            >
              {/* Links area */}
              <div className="px-5 pt-1">
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={activeLlm}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    {llmConversations[activeLlm].map((conv) => (
                      <li key={conv.href}>
                        <a
                          href={conv.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary group/link flex items-center justify-between gap-4 py-2.5 transition-colors"
                        >
                          <span className="flex items-center gap-2 text-sm font-medium">
                            {conv.label}
                            <svg
                              className="h-3.5 w-3.5 opacity-60"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </span>
                          <span className="border-border text-foreground/70 rounded-md border px-3 py-1 text-xs font-medium">
                            {llmLabels[activeLlm]}
                          </span>
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LLM icons — always in place, on top of the card */}
      <div
        className={`relative z-10 flex items-center gap-6 border-t pt-3 ${activeLlm ? 'border-border' : 'border-transparent'}`}
      >
        {llmKeys.map((key) => (
          <button
            key={key}
            type="button"
            onMouseEnter={() => {
              handleLlmHover(key)
            }}
            className={`flex cursor-pointer items-center gap-2 text-sm transition-colors ${
              activeLlm === key
                ? 'text-foreground'
                : activeLlm
                  ? 'text-muted-foreground/50 hover:text-muted-foreground'
                  : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {llmIcons[key]}
            {llmLabels[key]}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-border bg-card border-t">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left side — logo, LLM text, icons */}
          <div className="space-y-6">
            <a
              href="https://achra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
              aria-label="Achra"
            >
              <AchraImagotipo
                className="text-primary [&_path[data-type='text']]:fill-foreground flex h-9 w-42"
                aria-hidden
              />
            </a>
            <p className="text-card-foreground/80 mt-8 text-sm">
              Learn more about Achra with your LLM.
            </p>
            <LlmSection />
          </div>

          {/* Right side — link columns + Powerhouse badge */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-16">
              {Object.values(footerLinks).map((section) => (
                <div key={section.title}>
                  <h3 className="text-foreground mb-3 text-sm font-semibold">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith('http') ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/80 hover:text-primary text-sm transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href as Route}
                            className="text-foreground/80 hover:text-primary text-sm transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Powered by Powerhouse badge */}
            <div className="flex justify-end">
              <a
                href="https://powerhouse.io"
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-background hover:border-foreground/30 group inline-flex items-center gap-3 rounded-md border px-5 py-2.5 transition-colors"
              >
                <span className="text-foreground/50 group-hover:text-foreground text-sm leading-normal font-medium transition-colors">
                  Powered by
                </span>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="text-foreground/50 group-hover:text-foreground h-4 w-4 transition-colors"
                    viewBox="0 0 27 27"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.8849 0L5.7651 9.20777C4.13402 10.5584 4.0154 13.0182 5.50895 14.5195L9.35592 18.3865C10.4846 19.521 10.7288 21.2645 9.95531 22.6655L7.56213 27H3.6C1.61177 27 0 25.3882 0 23.4V3.6C0 1.61177 1.61178 0 3.6 0H16.8849ZM18.9736 0L16.8966 3.78374C16.1308 5.17879 16.3718 6.91114 17.4894 8.04414L21.5704 12.1815C23.0607 13.6924 22.9274 16.158 21.2828 17.4993L9.6343 27H23.4C25.3882 27 27 25.3882 27 23.4V3.6C27 1.61178 25.3882 0 23.4 0H18.9736Z"
                    />
                  </svg>
                  <svg
                    className="text-foreground/50 group-hover:text-foreground h-2.75 w-auto transition-colors"
                    viewBox="34 0 199 27"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M39.5093 23.0013V17.4732H42.6192C47.5172 17.4732 50.5752 14.8155 50.5752 10.7226C50.5752 6.62971 47.5431 3.972 42.671 3.972H34.067V23.0013H39.5093ZM39.5093 8.01173H42.049C43.889 8.01173 45.1071 9.07481 45.1071 10.7226C45.1071 12.3704 43.889 13.4335 42.049 13.4335H39.5093V8.01173Z" />
                    <path d="M61.7408 23.3999C67.9346 23.3999 72.1329 19.5462 72.1329 13.4866C72.1329 7.42703 67.9346 3.59991 61.7408 3.59991C55.5211 3.59991 51.3227 7.42703 51.3227 13.4866C51.3227 19.5462 55.5211 23.3999 61.7408 23.3999ZM61.7408 18.8021C58.8123 18.8021 56.7909 16.7025 56.7909 13.4866C56.7909 10.2974 58.8123 8.17119 61.7408 8.17119C64.6693 8.17119 66.6648 10.2974 66.6648 13.4866C66.6648 16.7025 64.6693 18.8021 61.7408 18.8021Z" />
                    <path d="M84.6275 23.0013L87.219 11.4668H87.4782L90.0698 23.0013H97.6889L102.691 3.972H97.2225L93.7757 17.925H93.5165L90.0698 3.972H84.6275L81.2066 17.925H80.9475L77.4748 3.972H72.0066L77.0083 23.0013H84.6275Z" />
                    <path d="M118.672 23.0013V18.5894H109.42V15.2141H116.301V11.5731H109.42V8.38381H118.413V3.972H104.134V23.0013H118.672Z" />
                    <path d="M125.863 23.0013V16.729H127.185L131.797 23.0013H137.888L132.419 16.3038L132.627 16.2507C135.322 15.7457 137.292 13.5664 137.292 10.4568C137.292 6.57656 134.285 3.972 129.75 3.972H120.395V23.0013H125.863ZM125.863 8.01173H128.791C130.528 8.01173 131.823 8.96851 131.823 10.5366C131.823 12.1312 130.528 13.088 128.791 13.088H125.863V8.01173Z" />
                    <path d="M144.579 23.0013V15.3736H150.928V23.0013H156.396V3.972H150.928V10.9884H144.579V3.972H139.111V23.0013H144.579Z" />
                    <path d="M168.531 23.3999C174.725 23.3999 178.923 19.5462 178.923 13.4866C178.923 7.42703 174.725 3.59991 168.531 3.59991C162.311 3.59991 158.113 7.42703 158.113 13.4866C158.113 19.5462 162.311 23.3999 168.531 23.3999ZM168.531 18.8021C165.603 18.8021 163.581 16.7025 163.581 13.4866C163.581 10.2974 165.603 8.17119 168.531 8.17119C171.46 8.17119 173.455 10.2974 173.455 13.4866C173.455 16.7025 171.46 18.8021 168.531 18.8021Z" />
                    <path d="M189.246 23.3999C194.429 23.3999 197.953 20.2107 197.953 15.1876V3.972H192.485V15.0015C192.485 17.2872 191.189 18.8021 189.246 18.8021C187.276 18.8021 186.006 17.3137 186.006 15.0015V3.972L180.538 7.272V15.1876C180.538 20.2107 184.062 23.3999 189.246 23.3999Z" />
                    <path d="M208.07 23.3999C213.253 23.3999 216.648 20.9548 216.648 17.1809C216.648 12.583 212.372 11.892 209.21 11.4136C207.059 11.0947 205.219 10.8555 205.219 9.42032C205.219 8.35723 206.256 7.61307 207.992 7.61307C209.858 7.61307 211.076 8.56985 211.076 10.2442H216.026C216.026 6.31079 212.735 3.59991 207.811 3.59991C202.913 3.59991 199.751 6.04502 199.751 9.81897C199.751 14.7092 204.571 15.1078 207.759 15.5596C209.651 15.8254 211.18 16.1443 211.18 17.5264C211.18 18.6958 210.039 19.3602 208.277 19.3602C206.048 19.3602 204.779 18.3237 204.753 16.729H199.621C199.621 20.6625 202.99 23.3999 208.07 23.3999Z" />
                    <path d="M232.967 23.0013V18.5894H223.715V15.2141H230.596V11.5731H223.715V8.38381H232.708V3.972H218.428V23.0013H232.967Z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
