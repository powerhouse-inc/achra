'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifyMeAction } from '@/modules/networks/actions/notify-me-action'
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

interface NotifyMeForm {
  className?: string
}

function NotifyMeForm({ className }: NotifyMeForm) {
  const [state, formAction, isPending] = useActionState(notifyMeAction, initialActionState)

  const form = useForm<NotifyMeFormValues>({
    resolver: zodResolver(notifyMeSchema),
    defaultValues: formDefaultValues,
  })

  useEffect(() => {
    if (state.error) {
      form.setError('email', { type: 'server', message: state.error })
    }
  }, [state, form])

  function onSubmit(data: NotifyMeFormValues) {
    const formData = new FormData()
    formData.append('email', data.email)

    startTransition(() => {
      formAction(formData)
    })
  }

  if (state.success) {
    return (
      <Alert variant="default" role="status" className={cn('w-full', className)}>
        <AlertTitle>You are on the list</AlertTitle>
        <AlertDescription>We will email you when new networks are added to Achra.</AlertDescription>
      </Alert>
    )
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
        <FormField
          control={form.control}
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem className="bg-input h-9 w-full rounded-md sm:max-w-74">
              <FormControl>
                <Input
                  {...field}
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
