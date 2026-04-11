import Link from 'next/link'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'
import type { Metadata, Route } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for the Achra platform — how we collect, use, and protect your data.',
}

// ─── Data ────────────────────────────────────────────────────────────────────

const legalPages = [
  { title: 'Terms of Service', href: '/legal/terms', active: false },
  { title: 'Privacy Policy', href: '/legal/privacy', active: true },
  { title: 'Cookie Policy', href: '/legal/cookies', active: false },
]

const sections = [
  { id: 'overview', title: '1. Overview' },
  { id: 'collection', title: '2. Information We Collect' },
  { id: 'usage', title: '3. How We Use Your Information' },
  { id: 'sharing', title: '4. Information Sharing' },
  { id: 'retention', title: '5. Data Retention' },
  { id: 'rights', title: '6. Your Rights' },
  { id: 'security', title: '7. Security' },
  { id: 'international', title: '8. International Transfers' },
  { id: 'contact', title: '9. Contact Us' },
]

// ─── Page Component ──────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <main>
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className="shrink-0 lg:sticky lg:top-28 lg:w-56 lg:self-start">
              <nav className="flex flex-col gap-6">
                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                    Legal
                  </p>
                  <ul className="flex flex-col gap-1">
                    {legalPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href as Route}
                          className={cn(
                            'block rounded-md px-3 py-1.5 text-sm transition-colors',
                            page.active
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                          )}
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="hidden lg:block">
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                    On This Page
                  </p>
                  <ul className="flex flex-col gap-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-muted-foreground hover:text-foreground block rounded-md px-3 py-1 text-xs transition-colors"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>

            {/* ── Content ──────────────────────────────────────────────── */}
            <article className="min-w-0 flex-1">
              <header className="mb-10">
                <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">Last updated: March 1, 2026</p>
                <p className="text-foreground/80 mt-4 text-base leading-relaxed">
                  At Achra (operated by Powerhouse B.V.), we take your privacy seriously. This
                  Privacy Policy explains how we collect, use, share, and protect your personal
                  information when you use our platform.
                </p>
              </header>

              <div className="text-foreground/80 [&_h2]:text-foreground space-y-10 text-sm leading-relaxed [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:sm:text-2xl">
                <section id="overview">
                  <h2>1. Overview</h2>
                  <p className="mt-3">
                    This policy applies to all users of the Achra platform, including visitors,
                    registered users, and service operators. It covers data collected through our
                    website, applications, and related services.
                  </p>
                  <p className="mt-3">
                    Powerhouse B.V. (Herengracht 182, 1016 BR Amsterdam, The Netherlands) is the
                    data controller responsible for your personal data under the General Data
                    Protection Regulation (GDPR).
                  </p>
                </section>

                <section id="collection">
                  <h2>2. Information We Collect</h2>
                  <p className="mt-3">We collect information in the following categories:</p>
                  <h3 className="text-foreground mt-4 text-base font-semibold">
                    Information you provide
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>Account details: name, email address, organization name</li>
                    <li>Wallet addresses you connect to the platform</li>
                    <li>Communications: messages sent through contact forms or support channels</li>
                    <li>Profile information: bio, avatar, linked social accounts</li>
                  </ul>
                  <h3 className="text-foreground mt-4 text-base font-semibold">
                    Information collected automatically
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-6">
                    <li>Device and browser information (type, operating system, language)</li>
                    <li>IP address and approximate geolocation</li>
                    <li>Usage data: pages visited, features used, time spent, referral source</li>
                    <li>Cookies and similar technologies (see our Cookie Policy)</li>
                  </ul>
                  <h3 className="text-foreground mt-4 text-base font-semibold">Blockchain data</h3>
                  <p className="mt-2">
                    Transactions you perform through the platform are recorded on public
                    blockchains. This data is inherently public and not controlled by us. We may
                    index and display this data as part of the platform&apos;s functionality.
                  </p>
                </section>

                <section id="usage">
                  <h2>3. How We Use Your Information</h2>
                  <p className="mt-3">We use your information to:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>Provide, maintain, and improve the Achra platform</li>
                    <li>Authenticate your identity and manage your account</li>
                    <li>Process transactions and facilitate marketplace interactions</li>
                    <li>
                      Send important notifications about your account, security alerts, and platform
                      updates
                    </li>
                    <li>
                      Analyze usage patterns to improve user experience and develop new features
                    </li>
                    <li>Detect and prevent fraud, abuse, and security threats</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section id="sharing">
                  <h2>4. Information Sharing</h2>
                  <p className="mt-3">
                    We do not sell your personal information. We may share data with:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                      <strong>Service providers:</strong> hosting, analytics, customer support
                      tools, and payment processors that help us operate the platform.
                    </li>
                    <li>
                      <strong>Network operators:</strong> when you interact with a specific
                      governance network, relevant activity data may be visible to that
                      network&apos;s administrators.
                    </li>
                    <li>
                      <strong>Legal authorities:</strong> when required by law, court order, or to
                      protect the rights and safety of our users and the platform.
                    </li>
                    <li>
                      <strong>Business transfers:</strong> in connection with a merger, acquisition,
                      or sale of assets, your information may be transferred to the successor
                      entity.
                    </li>
                  </ul>
                </section>

                <section id="retention">
                  <h2>5. Data Retention</h2>
                  <p className="mt-3">
                    We retain your personal data for as long as your account is active or as needed
                    to provide services. After account deletion, we may retain certain data for up
                    to 36 months to comply with legal obligations, resolve disputes, and enforce our
                    agreements.
                  </p>
                  <p className="mt-3">
                    Usage analytics are aggregated and anonymized after 12 months. Anonymized data
                    may be retained indefinitely for research and statistical purposes.
                  </p>
                </section>

                <section id="rights">
                  <h2>6. Your Rights</h2>
                  <p className="mt-3">
                    Under the GDPR and applicable data protection laws, you have the right to:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                      <strong>Access:</strong> request a copy of the personal data we hold about
                      you.
                    </li>
                    <li>
                      <strong>Rectification:</strong> correct inaccurate or incomplete data.
                    </li>
                    <li>
                      <strong>Erasure:</strong> request deletion of your personal data (&quot;right
                      to be forgotten&quot;).
                    </li>
                    <li>
                      <strong>Portability:</strong> receive your data in a structured,
                      machine-readable format.
                    </li>
                    <li>
                      <strong>Restriction:</strong> limit how we process your data in certain
                      circumstances.
                    </li>
                    <li>
                      <strong>Objection:</strong> object to processing based on legitimate
                      interests.
                    </li>
                    <li>
                      <strong>Withdraw consent:</strong> where processing is based on consent,
                      withdraw it at any time.
                    </li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, contact us at{' '}
                    <a href="mailto:privacy@achra.xyz" className="text-primary hover:underline">
                      privacy@achra.xyz
                    </a>
                    . We will respond within 30 days.
                  </p>
                </section>

                <section id="security">
                  <h2>7. Security</h2>
                  <p className="mt-3">
                    We implement industry-standard security measures including encryption in transit
                    (TLS 1.3), encryption at rest (AES-256), regular security audits, and access
                    controls. However, no system is completely secure, and we cannot guarantee
                    absolute protection of your data.
                  </p>
                  <p className="mt-3">
                    If you discover a security vulnerability, please report it responsibly to{' '}
                    <a href="mailto:security@achra.xyz" className="text-primary hover:underline">
                      security@achra.xyz
                    </a>
                    .
                  </p>
                </section>

                <section id="international">
                  <h2>8. International Transfers</h2>
                  <p className="mt-3">
                    Your data may be processed in countries outside the European Economic Area
                    (EEA). When transferring data internationally, we rely on Standard Contractual
                    Clauses (SCCs) approved by the European Commission or other appropriate
                    safeguards under GDPR Article 46.
                  </p>
                </section>

                <section id="contact">
                  <h2>9. Contact Us</h2>
                  <p className="mt-3">
                    For any privacy-related questions or concerns, contact our Data Protection
                    Officer:
                  </p>
                  <div className="bg-secondary/50 mt-4 rounded-lg border p-4 text-sm">
                    <p className="text-foreground font-medium">Powerhouse B.V. — Data Protection</p>
                    <p className="mt-1">Herengracht 182, 1016 BR Amsterdam</p>
                    <p className="mt-1">
                      Email:{' '}
                      <a href="mailto:privacy@achra.xyz" className="text-primary hover:underline">
                        privacy@achra.xyz
                      </a>
                    </p>
                  </div>
                  <p className="mt-4">
                    You also have the right to lodge a complaint with the Dutch Data Protection
                    Authority (Autoriteit Persoonsgegevens) or your local supervisory authority.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
