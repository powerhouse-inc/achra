import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-6">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-indigo-800 sm:text-5xl">
          Page not found
        </h1>
      </div>
    </main>
  )
}
