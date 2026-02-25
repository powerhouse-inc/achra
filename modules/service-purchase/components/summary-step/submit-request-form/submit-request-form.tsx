'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { submitRequestAction } from '@/modules/service-purchase/actions/submit-request-action'
import {
  formDefaultValues,
  initialActionState,
  submitRequestSchema,
} from '@/modules/service-purchase/lib/submit-request-schema'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-step-provider'
import { useServicePurchaseActions } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep, type SubmitRequestFormValues } from '@/modules/service-purchase/types'
import { Alert, AlertDescription, AlertTitle } from '@/modules/shared/components/ui/alert'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/shared/components/ui/form'
import { Input } from '@/modules/shared/components/ui/input'

function SubmitRequestForm() {
  const { serviceSlug = '' } = useParams<{ serviceSlug?: string }>()
  const [state, formAction, isPending] = useActionState(submitRequestAction, initialActionState)
  const { setRequestEntityData } = useServicePurchaseActions()

  const { goToStep } = useServicePurchaseStep()

  const form = useForm<SubmitRequestFormValues>({
    resolver: zodResolver(submitRequestSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  useEffect(() => {
    if (state.success) {
      setRequestEntityData({
        name: state.data?.name ?? '',
        teamName: state.data?.teamName ?? '',
        email: state.data?.email ?? '',
        driveUrl: state.data?.driveUrl ?? null,
      })

      // TODO: add the driver link so we can use it in the confirmation step
      goToStep(ServicePurchaseStep.Confirmation)
    }
  }, [state, goToStep, setRequestEntityData])

  function onSubmit(data: SubmitRequestFormValues) {
    const formData = new FormData()
    formData.append('serviceSlug', serviceSlug)
    formData.append('name', data.name)
    formData.append('teamName', data.teamName)
    formData.append('email', data.email)

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <Card className="mx-auto w-full max-w-218.5 border-none py-0!">
      <CardContent className="p-3 lg:p-6">
        <Form {...form}>
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              void form.handleSubmit(onSubmit)(event)
            }}
            className="flex flex-col gap-6"
          >
            <fieldset className="flex flex-col gap-4" disabled={isPending}>
              {state.error && (
                <Alert variant="destructive" role="alert">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="submit-request-name" className="text-sm/3.5 font-medium">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="submit-request-name"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="submit-request-team-name"
                      className="text-sm/3.5 font-medium"
                    >
                      Team Name <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="submit-request-team-name"
                        placeholder="Your team name"
                        autoComplete="organization"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="submit-request-email" className="text-sm/3.5 font-medium">
                      Email <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="submit-request-email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <p className="text-foreground/50 text-sm/5 font-normal">
                      We&apos;ll send a PDF summary and next steps to this address.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <Send className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export { SubmitRequestForm }
