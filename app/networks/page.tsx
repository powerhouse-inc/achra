import { NetworkCard } from '@/modules/networks/components/network-card'
import { type ChipVariant } from '@/modules/networks/types'
import {
  PowerhouseLogoIsotype,
  SkyIsotype,
  SparkIsotype,
  GroveIsotype,
  PowerhouseLogotype,
  SkyLogotype,
  SparkLogotype,
  InstagramIsotype,
} from '@/modules/shared/components/svgs'
import { type RouteWithDynamicPages } from '@/modules/shared/types/routes'

interface Network {
  id: string
  isotype: React.ReactNode
  title?: string
  href: RouteWithDynamicPages
  tag: string
  description: string
  buttonText: string
  backgroundImage: string
  variant: ChipVariant
}

const networks: Network[] = [
  {
    id: 'powerhouse',
    isotype: (
      <div className="flex items-center gap-2">
        <PowerhouseLogoIsotype className="h-6 w-6" />
        <PowerhouseLogotype className="w-40" />
      </div>
    ),
    href: '/network/powerhouse',
    tag: 'OSS',

    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    buttonText: 'Explore Powerhouse ',
    variant: 'oss',
    backgroundImage: '/network-backgrounds/powerhouse-card-background.png',
  },
  {
    id: 'sky',
    isotype: (
      <div className="flex items-center gap-2">
        <SkyIsotype className="h-6 w-6" />
        <SkyLogotype className="h-8" />
      </div>
    ),
    href: '/network/sky',
    tag: 'DeFi',
    description:
      'Sky serves as a pivotal hub within the ecosystem, where users can access a wealth of resources and tools. This platform empowers exploration and innovation, enabling seamless interactions and collaboration among various stakeholders.',
    buttonText: 'Explore Sky ',
    variant: 'defi',
    backgroundImage: '/network-backgrounds/sky-card-background.png',
  },
  {
    id: 'spark',
    isotype: (
      <div className="flex items-center gap-2">
        <SparkIsotype className="h-9 w-9" />
        <SparkLogotype className="h-10" />
      </div>
    ),
    href: '/network/spark',
    tag: 'DeFi',
    description:
      "Spark is a dynamic network within the Powerhouse ecosystem, designed to amplify the platform's capabilities. By facilitating seamless interactions and resource sharing, Spark empowers users to innovate and collaborate effectively.",
    buttonText: 'Explore Spark ',
    variant: 'defi',
    backgroundImage: 'network-backgrounds/spark-card-background.png',
  },
  {
    id: 'grove',
    isotype: <GroveIsotype />,
    title: 'Grove',
    href: '/network/grove',
    tag: 'OSS',
    description:
      'Grove is a vital network within the Powerhouse platform, dedicated to fostering growth and nurturing its builders. By providing essential resources and support, Grove cultivates an environment where innovation thrives.',
    buttonText: 'Explore Grove ',
    variant: 'oss',
    backgroundImage: 'network-backgrounds/grove-card-background.png',
  },
  {
    id: 'launch-agent-2',
    isotype: <InstagramIsotype />,
    title: 'Launch Agent 2',
    href: '/network/launch-agent-2',
    tag: 'OSS',
    description:
      'Launch Agent 2 is a pivotal network within the Powerhouse ecosystem, designed to enhance connectivity and streamline operations. By utilizing cutting-edge technology, it fosters collaboration among various platforms.',
    buttonText: 'Explore Launch Agent 2 ',
    variant: 'oss',
    backgroundImage: 'network-backgrounds/launch-agent-2-card-background.png',
  },
  {
    id: 'launch-agent-3',
    isotype: <InstagramIsotype className="h-10 w-10" />,
    title: 'Launch Agent 3',
    href: '/network/launch-agent-3',
    tag: 'DeFi',
    description:
      'Launch Agent 3 is a cutting-edge network within the Powerhouse ecosystem, designed to optimize connectivity and streamline operations.',
    buttonText: 'Explore Launch Agent 3',
    variant: 'defi',
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
              description={network.description}
              buttonText={network.buttonText}
              variant={network.variant}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
