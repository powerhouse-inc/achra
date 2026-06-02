import { CalendarIcon } from 'lucide-react'
import { LANGUAGE_OPTIONS } from '@/modules/my-account/lib/constants'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

function AccountForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Your name, date of birth, and dashboard language.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="account-name">Name</FieldLabel>
            <Input id="account-name" placeholder="Your name" />
            <FieldDescription>
              This is the name that will be displayed on your profile and in emails.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="account-date-of-birth">Date of birth</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="account-date-of-birth"
                  variant="outline"
                  className="text-muted-foreground hover:text-muted-foreground w-full justify-between font-normal"
                >
                  <span>Pick a date</span>
                  <CalendarIcon className="size-4" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar mode="single" captionLayout="dropdown" />
              </PopoverContent>
            </Popover>
            <FieldDescription>Your date of birth is used to calculate your age.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="account-language">Language</FieldLabel>
            <Select>
              <SelectTrigger id="account-language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              This is the language that will be used in the dashboard.
            </FieldDescription>
          </Field>

          <div>
            <Button type="button">Update account</Button>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

export { AccountForm }
