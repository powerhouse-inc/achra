import Link from 'next/link'
import { type RouteWithDynamicPages } from '@/modules/shared/types/routes'

interface Network {
  id: string
  title: string
  href: RouteWithDynamicPages
  tag: string
  tagColor: string
  bgGradient: string
  description: string
  buttonText: string
}

const networks: Network[] = [
  {
    id: 'powerhouse',
    title: 'POWERHOUSE',
    href: '/network/powerhouse',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    buttonText: 'Explore Powerhouse →',
    bgGradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    id: 'sky',
    title: 'Sky',
    href: '/network/sky',
    tag: 'DeFi',
    tagColor: 'bg-blue-500',
    description:
      'Sky serves as a pivotal hub within the ecosystem, where users can access a wealth of resources and tools. This platform empowers exploration and innovation, enabling seamless interactions and collaboration among various stakeholders.',
    buttonText: 'Explore Sky →',
    bgGradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    id: 'spark',
    title: 'Spark',
    href: '/network/spark',
    tag: 'DeFi',
    tagColor: 'bg-blue-500',
    description:
      "Spark is a dynamic network within the Powerhouse ecosystem, designed to amplify the platform's capabilities. By facilitating seamless interactions and resource sharing, Spark empowers users to innovate and collaborate effectively.",
    buttonText: 'Explore Spark →',
    bgGradient: 'from-green-400/20 to-white/20',
  },
  {
    id: 'grove',
    title: 'Grove',
    href: '/network/grove',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Grove is a vital network within the Powerhouse platform, dedicated to fostering growth and nurturing its builders. By providing essential resources and support, Grove cultivates an environment where innovation thrives.',
    buttonText: 'Explore Grove →',
    bgGradient: 'from-green-600/20 to-emerald-500/20',
  },
  {
    id: 'launch-agent-2',
    title: 'Launch Agent 2',
    href: '/network/launch-agent-2',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Launch Agent 2 is a pivotal network within the Powerhouse ecosystem, designed to enhance connectivity and streamline operations. By utilizing cutting-edge technology, it fosters collaboration among various platforms.',
    buttonText: 'Explore Launch Agent 2 →',
    bgGradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'launch-agent-3',
    title: 'Launch Agent 3',
    href: '/network/launch-agent-3',
    tag: 'DeFi',
    tagColor: 'bg-blue-500',
    description:
      'Launch Agent 3 is a cutting-edge network within the Powerhouse ecosystem, designed to optimize connectivity and streamline operations.',
    buttonText: 'Explore Launch Agent 3 →',
    bgGradient: 'from-sky-400/20 to-blue-300/20',
  },
]

export default function NetworksPage() {
  return (
    <main className="min-h-[calc(100dvh-8rem)] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
          Networks
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {networks.map((network) => (
            <div
              key={network.id}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${network.bgGradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{network.title}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${network.tagColor}`}
                  >
                    {network.tag}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-gray-700">{network.description}</p>

                <Link
                  href={network.href}
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
                >
                  {network.buttonText}
                </Link>
              </div>

              {/* Background overlay for better text readability */}
              <div className="absolute inset-0 bg-white/60 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
