export const mockCategoriesTree = {
  headcount: [
    {
      id: 'hc-compensation',
      label: 'Compensation & Benefits',
      children: [
        { id: 'hc-salaries', label: 'Salaries', children: [] },
        { id: 'hc-bonuses', label: 'Bonuses', children: [] },
        { id: 'hc-benefits', label: 'Employee Benefits', children: [] },
      ],
    },
    {
      id: 'hc-travel',
      label: 'Travel & Accommodation',
      children: [
        { id: 'hc-travel-flights', label: 'Flights', children: [] },
        { id: 'hc-travel-hotels', label: 'Hotels', children: [] },
      ],
    },
  ],
  nonHeadcount: [
    {
      id: 'nhc-software',
      label: 'Software & Subscriptions',
      children: [
        { id: 'nhc-productivity', label: 'Productivity Tools', children: [] },
        { id: 'nhc-dev-tools', label: 'Development Tools', children: [] },
        { id: 'nhc-infra', label: 'Infrastructure', children: [] },
      ],
    },
    {
      id: 'nhc-professional',
      label: 'Professional Services',
      children: [
        { id: 'nhc-legal', label: 'Legal', children: [] },
        { id: 'nhc-audit', label: 'Audit', children: [] },
      ],
    },
    {
      id: 'nhc-marketing',
      label: 'Marketing & Comms',
      children: [],
    },
  ],
}
