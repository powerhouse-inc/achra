import {
  type Network,
  NetworkCategory,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockedNetworks: Network[] = [
  {
    __typename: 'Network',
    name: 'Powerhouse',
    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    category: [NetworkCategory.Oss],
    logo: '/networks/logos/powerhouse.png',
    darkThemeLogo: '/networks/logos/powerhouse.png',
    logoBig: '/networks/backgrounds/powerhouse.png',
    icon: '/networks/logos/powerhouse-isotype.svg',
    darkThemeIcon: '/networks/logos/powerhouse-isotype.svg',
  },
  {
    __typename: 'Network',
    name: 'Sky',
    description:
      'Sky serves as a pivotal hub within the ecosystem, where users can access a wealth of resources and tools. This platform empowers exploration and innovation, enabling seamless interactions and collaboration among various stakeholders.',
    category: [NetworkCategory.Defi],
    logo: '/networks/logos/sky.png',
    darkThemeLogo: '/networks/logos/sky.png',
    logoBig: '/networks/backgrounds/sky.png',
    icon: '/networks/logos/sky-isotype.svg',
    darkThemeIcon: '/networks/logos/sky-isotype.svg',
  },
  {
    __typename: 'Network',
    name: 'Spark',
    description:
      "Spark is a dynamic network within the Powerhouse ecosystem, designed to amplify the platform's capabilities. By facilitating seamless interactions and resource sharing, Spark empowers users to innovate and collaborate effectively.",
    category: [NetworkCategory.Defi],
    logo: '/networks/logos/spark.png',
    darkThemeLogo: '/networks/logos/spark.png',
    logoBig: '/networks/backgrounds/spark.png',
    icon: '/networks/logos/spark-isotype.svg',
    darkThemeIcon: '/networks/logos/spark-isotype.svg',
  },
  {
    __typename: 'Network',
    name: 'Grove',
    description:
      'Grove is a vital network within the Powerhouse platform, dedicated to fostering growth and nurturing its builders. By providing essential resources and support, Grove cultivates an environment where innovation thrives.',
    category: [NetworkCategory.Oss],
    logo: '/networks/logos/grove.png',
    darkThemeLogo: '/networks/logos/grove.png',
    logoBig: '/networks/backgrounds/grove.png',
    icon: '/networks/logos/grove-isotype.svg',
    darkThemeIcon: '/networks/logos/grove-isotype.svg',
  },
  {
    __typename: 'Network',
    name: 'Launch Agent 2',
    description:
      'Launch Agent 2 is a pivotal network within the Powerhouse ecosystem, designed to enhance connectivity and streamline operations. By utilizing cutting-edge technology, it fosters collaboration among various platforms.',
    category: [NetworkCategory.Oss],
    logo: '',
    darkThemeLogo: '',
    logoBig: '/networks/backgrounds/launch-agent-2.png',
    icon: '',
    darkThemeIcon: '',
  },
  {
    __typename: 'Network',
    name: 'Launch Agent 3',
    description:
      'Launch Agent 3 is a cutting-edge network within the Powerhouse ecosystem, designed to optimize connectivity and streamline operations.',
    category: [NetworkCategory.Defi],
    logo: '',
    darkThemeLogo: '',
    logoBig: '/networks/backgrounds/launch-agent-3.png',
    icon: '',
    darkThemeIcon: '',
  },
]
