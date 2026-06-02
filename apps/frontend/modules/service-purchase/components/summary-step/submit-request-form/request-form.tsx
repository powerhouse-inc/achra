'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIsAuthenticated } from '@/modules/sdk'
import { useSubmitPurchaseRequest } from '@/modules/service-purchase/hooks/use-submit-purchase-request'
import { clearServicePurchasePersistedState } from '@/modules/service-purchase/lib/persistence-utils'
import {
  formDefaultValues,
  submitRequestSchema,
} from '@/modules/service-purchase/lib/submit-request-schema'
import {
  useServiceOffering,
  useServicePurchaseActions,
  useServicePurchaseState,
  useServicePurchaseStep,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
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

interface RequestFormProps {
  defaultName?: string
  defaultTeamName?: string
}

function RequestForm({ defaultName = '', defaultTeamName = '' }: RequestFormProps) {
  const { setRequestEntityData } = useServicePurchaseActions()
  const service = useServiceOffering()
  const { selectedTier, selectedBillingCycle, optionGroups } = useServicePurchaseState()
  const { goToStep } = useServicePurchaseStep()
  const isAuthenticated = useIsAuthenticated()

  const { mutate, isPending, error } = useSubmitPurchaseRequest()

  const form = useForm<SubmitRequestFormValues>({
    resolver: zodResolver(submitRequestSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  const { reset } = form
  useEffect(() => {
    reset({ name: defaultName, teamName: defaultTeamName, email: '' }, { keepDirtyValues: true })
  }, [reset, defaultName, defaultTeamName])

  function onSubmit(data: SubmitRequestFormValues) {
    mutate(
      {
        name: data.name,
        teamName: data.teamName,
        email: data.email,
        service,
        selectedTierId: selectedTier.id,
        selectedBillingCycle,
        optionGroups,
      },
      {
        onSuccess: (result) => {
          setRequestEntityData(result)
          goToStep(ServicePurchaseStep.Confirmation)
          clearServicePurchasePersistedState(service.id)
        },
      },
    )
  }

  return (
    <Card className="mx-auto w-full max-w-218.5 border-none py-0! lg:mx-0 lg:max-w-none">
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
              {error && (
                <Alert variant="destructive" role="alert">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
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

              <div className={defaultTeamName === '' ? undefined : 'hidden'}>
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
              </div>

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
              <Button type="submit" className="w-full" disabled={isPending || !isAuthenticated}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Request a Quote
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

export { RequestForm }
