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
  GroveLogotype,
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
  logotype?: React.ReactNode
}

export const networks: Network[] = [
  {
    id: 'powerhouse',
    isotype: <PowerhouseLogoIsotype className="h-6 w-6" />,
    logotype: <PowerhouseLogotype className="w-40" />,
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
    isotype: <SkyIsotype className="h-7 w-7" />,
    logotype: <SkyLogotype className="h-8" />,
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
    isotype: <SparkIsotype className="h-7 w-7 md:h-9 md:w-9" />,
    logotype: <SparkLogotype className="h-9 md:h-9 md:w-20" />,
    href: '/network/spark',
    tag: 'DeFi',
    description:
      "Spark is a dynamic network within the Powerhouse ecosystem, designed to amplify the platform's capabilities. By facilitating seamless interactions and resource sharing, Spark empowers users to innovate and collaborate effectively.",
    buttonText: 'Explore Spark ',
    variant: 'defi',
    backgroundImage: '/network-backgrounds/spark-card-background.png',
  },
  {
    id: 'grove',
    isotype: <GroveIsotype className="h-8 w-8 sm:h-10 sm:w-10" />,
    logotype: <GroveLogotype className="h-5 md:h-9 md:w-20" />,
    href: '/network/grove',
    tag: 'OSS',
    description:
      'Grove is a vital network within the Powerhouse platform, dedicated to fostering growth and nurturing its builders. By providing essential resources and support, Grove cultivates an environment where innovation thrives.',
    buttonText: 'Explore Grove ',
    variant: 'oss',
    backgroundImage: '/network-backgrounds/grove-card-background.png',
  },
  {
    id: 'launch-agent-2',
    isotype: <InstagramIsotype className="h-10 w-10" />,
    title: 'Launch Agent 2',
    href: '/network/launch-agent-2',
    tag: 'OSS',
    description:
      'Launch Agent 2 is a pivotal network within the Powerhouse ecosystem, designed to enhance connectivity and streamline operations. By utilizing cutting-edge technology, it fosters collaboration among various platforms.',
    buttonText: 'Explore Launch Agent 2 ',
    variant: 'oss',
    backgroundImage: '/network-backgrounds/launch-agent-2-card-background.png',
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
    backgroundImage: '/network-backgrounds/launch-card-background.png',
  },
]
