import {
  NetworkProfile_NetworkCategory,
  type NetworkProfile_NetworkProfileState,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockedNetworks: NetworkProfile_NetworkProfileState[] = [
  {
    __typename: 'NetworkProfile_NetworkProfileState',
    name: 'Powerhouse',
    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    category: [NetworkProfile_NetworkCategory.Oss],
    logo: '/networks/logos/powerhouse.png',
    logoBig: '/networks/backgrounds/powerhouse.png',
    icon: '/networks/logos/powerhouse.png',
  },
  {
    __typename: 'NetworkProfile_NetworkProfileState',
    name: 'Sky',
    description:
      'Sky serves as a pivotal hub within the ecosystem, where users can access a wealth of resources and tools. This platform empowers exploration and innovation, enabling seamless interactions and collaboration among various stakeholders.',
    category: [NetworkProfile_NetworkCategory.Defi],
    logo: '/networks/logos/sky.png',
    logoBig: '/networks/backgrounds/sky.png',
    icon: '/networks/logos/sky.png',
  },
  {
    __typename: 'NetworkProfile_NetworkProfileState',
    name: 'Spark',
    description:
      "Spark is a dynamic network within the Powerhouse ecosystem, designed to amplify the platform's capabilities. By facilitating seamless interactions and resource sharing, Spark empowers users to innovate and collaborate effectively.",
    category: [NetworkProfile_NetworkCategory.Defi],
    logo: '/networks/logos/spark.png',
    logoBig: '/networks/backgrounds/spark.png',
    icon: '/networks/logos/spark.png',
  },
  {
    __typename: 'NetworkProfile_NetworkProfileState',
    name: 'Grove',
    description:
      'Grove is a vital network within the Powerhouse platform, dedicated to fostering growth and nurturing its builders. By providing essential resources and support, Grove cultivates an environment where innovation thrives.',
    category: [NetworkProfile_NetworkCategory.Oss],
    logo: '/networks/logos/grove.png',
    logoBig: '/networks/backgrounds/grove.png',
    icon: '/networks/logos/grove.png',
  },
  {
    __typename: 'NetworkProfile_NetworkProfileState',
    name: 'Launch Agent 2',
    description:
      'Launch Agent 2 is a pivotal network within the Powerhouse ecosystem, designed to enhance connectivity and streamline operations. By utilizing cutting-edge technology, it fosters collaboration among various platforms.',
    category: [NetworkProfile_NetworkCategory.Oss],
    logo: '',
    logoBig: '/networks/backgrounds/launch-agent-2.png',
    icon: '',
  },
  {
    __typename: 'NetworkProfile_NetworkProfileState',
    name: 'Launch Agent 3',
    description:
      'Launch Agent 3 is a cutting-edge network within the Powerhouse ecosystem, designed to optimize connectivity and streamline operations.',
    category: [NetworkProfile_NetworkCategory.Defi],
    logo: '',
    logoBig: '/networks/backgrounds/launch-agent-3.png',
    icon: '',
  },
]
