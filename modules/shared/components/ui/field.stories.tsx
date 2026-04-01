import React from 'react'
import { Button } from './button'
import { Checkbox } from './checkbox'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from './field'
import { Input } from './input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Textarea } from './textarea'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Shadcn/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A field component system for building forms with proper labeling, descriptions, and error handling. Supports vertical, horizontal, and responsive orientations.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive'],
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-lg">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="Enter your email" />
        <FieldDescription>We&apos;ll never share your email with anyone else.</FieldDescription>
      </Field>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-lg">
      <Field {...args}>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" placeholder="Enter your name" />
        <FieldDescription>This is a vertical field layout.</FieldDescription>
      </Field>
    </div>
  ),
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-lg">
      <Field {...args}>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" placeholder="Enter username" />
        <FieldDescription>Choose a unique username.</FieldDescription>
      </Field>
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="w-lg">
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldLabel htmlFor="terms" className="font-normal">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="w-lg">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
                <Input id="card-name" placeholder="Evil Rabbit" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
                <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                <FieldDescription>Enter your 16-digit card number</FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="exp-month">Month</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="exp-month">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="04">04</SelectItem>
                      <SelectItem value="05">05</SelectItem>
                      <SelectItem value="06">06</SelectItem>
                      <SelectItem value="07">07</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="exp-year">Year</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="exp-year">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                  <Input id="cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="same-as-shipping" defaultChecked />
                <FieldLabel htmlFor="same-as-shipping" className="font-normal">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="comments">Comments</FieldLabel>
                <Textarea
                  id="comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <div className="w-lg">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field1">Field 1</FieldLabel>
          <Input id="field1" placeholder="First field" />
        </Field>
        <FieldSeparator>OR</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="field2">Field 2</FieldLabel>
          <Input id="field2" placeholder="Second field" />
        </Field>
      </FieldGroup>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-lg">
      <Field {...args}>
        <FieldLabel htmlFor="playground">Playground Field</FieldLabel>
        <Input id="playground" placeholder="Try different orientations" />
        <FieldDescription>This is a playground field for testing.</FieldDescription>
      </Field>
    </div>
  ),
}
