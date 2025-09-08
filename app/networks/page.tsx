import { NetworkCard } from '@/modules/networks/components/network-card'
import {
  PowerhouseLogoIsotype,
  SkyIsotype,
  SparkIsotype,
  GroveIsotype,
} from '@/modules/shared/components/svgs'
import { type RouteWithDynamicPages } from '@/modules/shared/types/routes'

interface Network {
  id: string
  isotype: React.ReactNode
  title: string
  href: RouteWithDynamicPages
  tag: string
  tagColor: string
  bgGradient: string
  description: string
  buttonText: string
  backgroundImage: string
  titleColor: string
}

const networks: Network[] = [
  {
    id: 'powerhouse',
    isotype: <PowerhouseLogoIsotype />,
    title: 'Powerhouse',
    href: '/network/powerhouse',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    buttonText: 'Explore Powerhouse ',
    bgGradient: 'from-purple-500/20 to-blue-500/20',
    titleColor: 'text-foreground',
    backgroundImage: '/network-backgrounds/powerhouse-card-background.png',
  },
  {
    id: 'sky',
    isotype: <SkyIsotype />,
    title: 'Sky',
    href: '/network/sky',
    tag: 'DeFi',
    tagColor: 'bg-status-progress/40',
    description:
      'Sky serves as a pivotal hub within the ecosystem, where users can access a wealth of resources and tools. This platform empowers exploration and innovation, enabling seamless interactions and collaboration among various stakeholders.',
    buttonText: 'Explore Sky ',
    bgGradient: 'from-pink-500/20 to-purple-500/20',
    titleColor: 'text-status-progress',
    backgroundImage: '/network-backgrounds/sky-card-background.png',
  },
  {
    id: 'spark',
    isotype: <SparkIsotype />,
    title: 'Spark',
    href: '/network/spark',
    tag: 'DeFi',
    tagColor: 'bg-status-progress/40',
    description:
      "Spark is a dynamic network within the Powerhouse ecosystem, designed to amplify the platform's capabilities. By facilitating seamless interactions and resource sharing, Spark empowers users to innovate and collaborate effectively.",
    buttonText: 'Explore Spark ',
    bgGradient: 'from-green-400/20 to-white/20',
    titleColor: 'text-status-progress',
    backgroundImage: 'network-backgrounds/spark-card-background.png',
  },
  {
    id: 'grove',
    isotype: <GroveIsotype />,
    title: 'Grove',
    href: '/network/grove',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Grove is a vital network within the Powerhouse platform, dedicated to fostering growth and nurturing its builders. By providing essential resources and support, Grove cultivates an environment where innovation thrives.',
    buttonText: 'Explore Grove ',
    bgGradient: 'from-green-600/20 to-emerald-500/20',
    titleColor: 'text-foreground',
    backgroundImage: 'network-backgrounds/grove-card-background.png',
  },
  {
    id: 'launch-agent-2',
    isotype: <GroveIsotype />,
    title: 'Launch Agent 2',
    href: '/network/launch-agent-2',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Launch Agent 2 is a pivotal network within the Powerhouse ecosystem, designed to enhance connectivity and streamline operations. By utilizing cutting-edge technology, it fosters collaboration among various platforms.',
    buttonText: 'Explore Launch Agent 2 ',
    bgGradient: 'from-orange-500/20 to-red-500/20',
    titleColor: 'text-foreground',
    backgroundImage: 'network-backgrounds/launch-agent-2-card-background.png',
  },
  {
    id: 'launch-agent-3',
    isotype: <GroveIsotype />,
    title: 'Launch Agent 3',
    href: '/network/launch-agent-3',
    tag: 'DeFi',
    tagColor: 'bg-status-progress/40',
    description:
      'Launch Agent 3 is a cutting-edge network within the Powerhouse ecosystem, designed to optimize connectivity and streamline operations.',
    buttonText: 'Explore Launch Agent 3',
    bgGradient: 'from-sky-400/20 to-blue-300/20',
    titleColor: 'text-status-progress',
    backgroundImage: 'network-backgrounds/launch-card-background.png',
  },
]

export default function NetworksPage() {
  return (
    <main>
      <div className="container mx-auto mt-6 mb-8 px-4">
        <h1 className="text-foreground/50 md:text- mb-4 text-3xl font-bold tracking-tight">
          Networks
        </h1>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {networks.map((network) => (
            <NetworkCard
              key={network.id}
              href={network.href}
              backgroundImage={network.backgroundImage}
              isotype={network.isotype}
              title={network.title}
              tag={network.tag}
              tagColor={network.tagColor}
              description={network.description}
              buttonText={network.buttonText}
              titleColor={network.titleColor}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
