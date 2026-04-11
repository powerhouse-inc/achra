import Link from 'next/link'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'
import type { Metadata, Route } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the Achra platform — the marketplace for global coordination.',
}

// ─── Data ────────────────────────────────────────────────────────────────────

const legalPages = [
  { title: 'Terms of Service', href: '/legal/terms', active: true },
  { title: 'Privacy Policy', href: '/legal/privacy', active: false },
  { title: 'Cookie Policy', href: '/legal/cookies', active: false },
]

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'eligibility', title: '2. Eligibility' },
  { id: 'accounts', title: '3. Accounts & Access' },
  { id: 'services', title: '4. Platform Services' },
  { id: 'conduct', title: '5. User Conduct' },
  { id: 'ip', title: '6. Intellectual Property' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'termination', title: '8. Termination' },
  { id: 'governing', title: '9. Governing Law' },
  { id: 'changes', title: '10. Changes to Terms' },
]

// ─── Page Component ──────────────────────────────────────────────────────────

export default function TermsPage() {
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
                  Terms of Service
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">Last updated: March 1, 2026</p>
                <p className="text-foreground/80 mt-4 text-base leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
                  Achra platform, operated by Powerhouse B.V. (&quot;we&quot;, &quot;us&quot;, or
                  &quot;the Company&quot;). By accessing or using our services, you agree to be
                  bound by these Terms.
                </p>
              </header>

              <div className="text-foreground/80 [&_h2]:text-foreground space-y-10 text-sm leading-relaxed [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:sm:text-2xl">
                <section id="acceptance">
                  <h2>1. Acceptance of Terms</h2>
                  <p className="mt-3">
                    By creating an account, connecting a wallet, or otherwise accessing the Achra
                    platform, you acknowledge that you have read, understood, and agree to be bound
                    by these Terms and our Privacy Policy. If you do not agree, you must not use the
                    platform.
                  </p>
                  <p className="mt-3">
                    We may update these Terms from time to time. Continued use of the platform after
                    changes constitutes acceptance of the revised Terms.
                  </p>
                </section>

                <section id="eligibility">
                  <h2>2. Eligibility</h2>
                  <p className="mt-3">
                    You must be at least 18 years old and capable of forming a binding contract
                    under applicable law. By using Achra, you represent and warrant that you meet
                    these requirements.
                  </p>
                  <p className="mt-3">
                    If you are using the platform on behalf of an organization, you represent that
                    you have the authority to bind that organization to these Terms.
                  </p>
                </section>

                <section id="accounts">
                  <h2>3. Accounts & Access</h2>
                  <p className="mt-3">
                    You are responsible for safeguarding your account credentials and wallet keys.
                    You agree to notify us immediately of any unauthorized access or security
                    breach.
                  </p>
                  <p className="mt-3">
                    We reserve the right to suspend or terminate accounts that violate these Terms,
                    engage in fraudulent activity, or pose a security risk to the platform.
                  </p>
                </section>

                <section id="services">
                  <h2>4. Platform Services</h2>
                  <p className="mt-3">
                    Achra provides a marketplace for governance services, including but not limited
                    to: network management tools, workstream coordination, builder discovery,
                    financial reporting, and proposal management.
                  </p>
                  <p className="mt-3">
                    We do not guarantee uninterrupted availability of the platform. Scheduled
                    maintenance and emergency updates may temporarily limit access to certain
                    features.
                  </p>
                </section>

                <section id="conduct">
                  <h2>5. User Conduct</h2>
                  <p className="mt-3">You agree not to:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                      Use the platform for unlawful purposes or in violation of any applicable
                      regulations.
                    </li>
                    <li>
                      Attempt to gain unauthorized access to other users&apos; accounts or the
                      platform&apos;s infrastructure.
                    </li>
                    <li>
                      Upload malicious code, spam, or content that infringes on third-party
                      intellectual property.
                    </li>
                    <li>
                      Manipulate governance votes, proposals, or any on-chain actions through
                      deceptive means.
                    </li>
                    <li>
                      Interfere with or disrupt the platform&apos;s operation or other users&apos;
                      experience.
                    </li>
                  </ul>
                </section>

                <section id="ip">
                  <h2>6. Intellectual Property</h2>
                  <p className="mt-3">
                    All content, trademarks, logos, and software on the Achra platform are owned by
                    Powerhouse B.V. or its licensors. You may not reproduce, distribute, or create
                    derivative works without prior written consent.
                  </p>
                  <p className="mt-3">
                    Content you create or submit through the platform remains yours. By posting, you
                    grant us a non-exclusive, royalty-free, worldwide license to display and
                    distribute that content as part of the platform&apos;s operation.
                  </p>
                </section>

                <section id="liability">
                  <h2>7. Limitation of Liability</h2>
                  <p className="mt-3">
                    To the maximum extent permitted by law, Powerhouse B.V. shall not be liable for
                    any indirect, incidental, special, or consequential damages arising from your
                    use of or inability to use the platform.
                  </p>
                  <p className="mt-3">
                    The platform interacts with decentralized protocols and blockchain networks. We
                    are not responsible for losses resulting from smart contract vulnerabilities,
                    network failures, or third-party service disruptions.
                  </p>
                </section>

                <section id="termination">
                  <h2>8. Termination</h2>
                  <p className="mt-3">
                    You may close your account at any time by contacting us at legal@achra.xyz. We
                    may terminate or suspend your access without notice if you breach these Terms.
                  </p>
                  <p className="mt-3">
                    Upon termination, your right to use the platform ceases immediately. Provisions
                    that by their nature should survive (including liability limitations and dispute
                    resolution) will remain in effect.
                  </p>
                </section>

                <section id="governing">
                  <h2>9. Governing Law</h2>
                  <p className="mt-3">
                    These Terms are governed by the laws of the Netherlands. Any disputes will be
                    resolved in the courts of Amsterdam, unless otherwise required by applicable
                    consumer protection laws.
                  </p>
                </section>

                <section id="changes">
                  <h2>10. Changes to Terms</h2>
                  <p className="mt-3">
                    We reserve the right to modify these Terms at any time. We will provide notice
                    of material changes via email or prominent platform notification at least 30
                    days before the changes take effect.
                  </p>
                  <p className="mt-3">
                    If you have questions about these Terms, please contact us at{' '}
                    <a href="mailto:legal@achra.xyz" className="text-primary hover:underline">
                      legal@achra.xyz
                    </a>
                    .
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
