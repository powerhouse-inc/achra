import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@achra/ui/input-otp'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Packages/UI/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: <div />, maxLength: 6 },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}
