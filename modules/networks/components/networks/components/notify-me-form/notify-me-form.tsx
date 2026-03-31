'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'
import {
  formDefaultValues,
  initialActionState,
  notifyMeSchema,
} from '@/modules/networks/lib/notify-me-schema'
import type { NotifyMeFormValues } from '@/modules/networks/types'
import { Alert, AlertDescription, AlertTitle } from '@/modules/shared/components/ui/alert'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/modules/shared/components/ui/form'
import { Input } from '@/modules/shared/components/ui/input'
import { cn } from '@/modules/shared/lib/utils'
import { notifyMeAction } from '../../actions/notify-me-action'

interface NotifyMeForm {
  className?: string
}

function NotifyMeForm({ className }: NotifyMeForm) {
  const [state, formAction, isPending] = useActionState(notifyMeAction, initialActionState)

  const form = useForm<NotifyMeFormValues>({
    resolver: zodResolver(notifyMeSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  function onSubmit(data: NotifyMeFormValues) {
    const formData = new FormData()
    formData.append('email', data.email)

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          void form.handleSubmit(onSubmit)(event)
        }}
        className={cn('flex w-full flex-col items-center gap-2.5 sm:flex-row', className)}
      >
        {state.error && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem className="bg-input h-9 w-full rounded-md sm:max-w-74">
              <FormControl>
                <Input
                  {...field}
                  id="notify-me-email"
                  type="email"
                  placeholder="Your email address"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage className="text-primary-foreground" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-fit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Notifying
            </>
          ) : (
            <>Notify Me</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { NotifyMeForm }
