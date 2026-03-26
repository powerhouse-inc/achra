'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
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
import { notifyMeAction } from '../../actions/notify-me-action'

function NotifyMeForm() {
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
        className="flex items-center gap-2.5"
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
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  id="notify-me-email"
                  type="email"
                  placeholder="Your email address"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="sm-w-24.5 w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Notifying
            </>
          ) : (
            <>
              Notify Me
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { NotifyMeForm }
