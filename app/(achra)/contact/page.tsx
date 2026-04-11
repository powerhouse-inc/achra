'use client'

import {
  ArrowRight,
  Briefcase,
  Building,
  Clock,
  Code,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Label } from '@/modules/shared/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { Textarea } from '@/modules/shared/components/ui/textarea'
import type { Route } from 'next'

// ─── Mock Data ───────────────────────────────────────────────────────────────

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@achra.xyz',
    href: 'mailto:hello@achra.xyz',
    description: 'Best for general inquiries',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+31 20 123 4567',
    href: 'tel:+31201234567',
    description: 'Mon–Fri, 9 AM – 6 PM CET',
  },
  {
    icon: Building,
    label: 'Office',
    value: 'Amsterdam, Netherlands',
    href: 'https://maps.google.com',
    description: 'Herengracht 182, 1016 BR',
  },
]

const socialLinks = [
  { icon: Globe, label: 'Twitter / X', href: '#' },
  { icon: Code, label: 'GitHub', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
  { icon: MessageSquare, label: 'Discord', href: '#' },
]

const faqItems = [
  {
    question: 'What is your typical response time?',
    answer:
      'We aim to respond to all inquiries within 24 hours on business days. For urgent matters, please reach out by phone during business hours.',
  },
  {
    question: 'Do you offer enterprise solutions?',
    answer:
      'Yes. We provide custom governance solutions for organizations of all sizes. Select "Enterprise" as your inquiry type in the form and we\'ll connect you with our enterprise team.',
  },
  {
    question: 'How can I report a security vulnerability?',
    answer:
      'Please email security@achra.xyz with details. Do not disclose vulnerabilities publicly. We follow responsible disclosure practices and offer a bug bounty program.',
  },
  {
    question: 'Can I schedule a product demo?',
    answer:
      'Absolutely. Choose "Partnership" or "Enterprise" in the contact form and mention you\'d like a demo. Our team will set up a personalized walkthrough.',
  },
  {
    question: 'Where can I find developer documentation?',
    answer:
      'Our developer docs are available at docs.achra.xyz. For specific technical questions, feel free to reach out via the contact form or join our Discord community.',
  },
]

const subjects = [
  'General Inquiry',
  'Partnership',
  'Enterprise',
  'Technical Support',
  'Press & Media',
  'Careers',
] as const

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24 hours.",
      })
      ;(e.target as HTMLFormElement).reset()
    }, 1200)
  }

  return (
    <main>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="container">
          <header className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase">
              Contact Us
            </p>
            <h1 className="text-foreground mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              Whether you have a question about our platform, want to explore a partnership, or just
              want to say hello — we&apos;d love to hear from you.
            </p>
          </header>

          {/* ── Contact Methods Row ─────────────────────────────────────── */}
          <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                className="group"
                target={method.label === 'Office' ? '_blank' : undefined}
                rel={method.label === 'Office' ? 'noopener noreferrer' : undefined}
              >
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  <CardContent className="flex items-start gap-4">
                    <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <method.icon className="text-primary size-5" />
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-semibold">{method.label}</p>
                      <p className="text-primary mt-0.5 text-sm group-hover:underline">
                        {method.value}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">{method.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* ── Form + Info ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Form Column */}
            <Card className="lg:col-span-3">
              <CardContent>
                <h2 className="text-foreground text-xl font-semibold">Send Us a Message</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Fill out the form below and we&apos;ll get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input id="name" placeholder="Jane Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input id="email" type="email" placeholder="jane@example.com" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc. (optional)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-destructive">*</span>
                      </Label>
                      <Select required>
                        <SelectTrigger id="subject" className="w-full">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar Info Column */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Working Hours */}
              <Card>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="bg-status-progress/10 flex size-9 items-center justify-center rounded-lg">
                      <Clock className="text-status-progress size-4" />
                    </div>
                    <h3 className="text-foreground font-semibold">Working Hours</h3>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday – Friday</span>
                      <span className="text-foreground font-medium">9:00 AM – 6:00 PM CET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="text-foreground font-medium">10:00 AM – 2:00 PM CET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent>
                  <h3 className="text-foreground font-semibold">Follow Us</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Stay connected through our social channels.
                  </p>
                  <div className="mt-4 flex gap-2">
                    {socialLinks.map((social) => (
                      <Button key={social.label} variant="outline" size="icon" asChild>
                        <a
                          href={social.href}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <social.icon className="size-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardContent>
                  <h3 className="text-foreground font-semibold">Quick Links</h3>
                  <div className="mt-3 flex flex-col gap-2">
                    {[
                      { label: 'Careers', href: '/careers' as Route },
                      { label: 'Documentation', href: '#' as Route },
                      { label: 'Status Page', href: '#' as Route },
                    ].map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-primary flex items-center gap-2 text-sm hover:underline"
                      >
                        <ArrowRight className="size-3" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-secondary/30 w-full border-t py-16 sm:py-20 lg:py-24">
        <div className="container">
          <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              Quick answers to common questions.
            </p>
          </header>

          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  )
}
