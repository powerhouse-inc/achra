import { useState } from 'react'
import SearchInput from './search-input'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Form/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current search query shown in the input field.',
    },
    placeholder: {
      control: 'text',
      description: 'Hint text that appears when the input is empty.',
    },
    showKeyboardShortcut: {
      control: 'boolean',
      description: 'Toggle to show or hide the ⌘/Ctrl + K helper pill.',
    },
    onChange: {
      control: false,
      description: 'Called whenever the search value changes.',
    },
    className: {
      control: false,
    },
  },
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

type SearchInputProps = React.ComponentProps<typeof SearchInput>
function ControlledSearchInput(args: SearchInputProps) {
  const { value: initialValue, onChange, ...rest } = args
  const [value, setValue] = useState(initialValue)

  return (
    <SearchInput
      {...rest}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue)
        onChange(nextValue)
      }}
    />
  )
}

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search placeholder...',
  },
  render: (args) => <ControlledSearchInput {...args} />,
}

export const Loading: Story = {
  args: {
    value: '',
    placeholder: 'Search placeholder...',
    isLoading: true,
  },
  render: (args) => <ControlledSearchInput {...args} />,
}

export const PrefilledQuery: Story = {
  args: {
    value: 'Powerhouse',
    placeholder: 'Search placeholder...',
  },
  render: (args) => <ControlledSearchInput {...args} />,
}

export const KeyboardShortcutHidden: Story = {
  args: {
    value: '',
    placeholder: 'Search placeholder...',
    showKeyboardShortcut: false,
  },
  render: (args) => <ControlledSearchInput {...args} />,
}
