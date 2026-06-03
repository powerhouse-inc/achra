'use client'

import { Button } from '@achra/ui/button'
import { Card } from '@achra/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@achra/ui/form'
import { Input } from '@achra/ui/input'
import { ArrowRight } from 'lucide-react'
import { type UseFormReturn, useWatch } from 'react-hook-form'
import { type PersonaId, PERSONAS } from '@/modules/onboarding/lib/personas'
import { stepOneSchema, type StepOneValues } from '@/modules/onboarding/lib/schemas'
import { PersonaCard } from './persona-card'

interface ChooseRoleStepProps {
  form: UseFormReturn<StepOneValues>
  onSubmit: () => void
}

function ChooseRoleStep({ form, onSubmit }: ChooseRoleStepProps) {
  const watched = useWatch({ control: form.control })
  const selectedPersonaId = watched.personaId
  const isFormValid = stepOneSchema.safeParse(watched).success

  function handlePersonaSelect(id: PersonaId) {
    form.setValue('personaId', id, { shouldValidate: true, shouldTouch: true })
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Form {...form}>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit(onSubmit)(event)
          }}
          className="flex flex-col"
        >
          <div className="px-8 pt-8 pb-2">
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Get started
            </p>
            <h1 className="mt-1.5 text-3xl font-semibold tracking-tight">
              Choose your role on Achra
            </h1>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm">
              We&apos;ll spin up a Connect drive tailored to what you&apos;re here to do.
            </p>
          </div>

          <div className="flex flex-col gap-6 px-8 py-6">
            <FormField
              control={form.control}
              name="personaId"
              render={() => (
                <FormItem className="gap-3">
                  <div
                    role="radiogroup"
                    aria-label="Choose your role"
                    className="grid gap-3 sm:grid-cols-3"
                  >
                    {PERSONAS.map((persona) => (
                      <PersonaCard
                        key={persona.id}
                        persona={persona}
                        selected={selectedPersonaId === persona.id}
                        onSelect={() => {
                          handlePersonaSelect(persona.id)
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem className="max-w-md">
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. alex.eth"
                      autoComplete="nickname"
                    />
                  </FormControl>
                  <FormDescription>Shown on your drive and any offerings.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-muted/40 border-border flex justify-end border-t px-8 py-5">
            <Button type="submit" disabled={!isFormValid} className="gap-2 sm:w-fit">
              Set up my workspace
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export { ChooseRoleStep }
