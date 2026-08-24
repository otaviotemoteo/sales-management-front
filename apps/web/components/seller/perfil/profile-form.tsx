'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Pencil, Loader2 } from 'lucide-react'
import { onlyDigits, formatPhone, formatCpf } from '@/lib/masks'

interface ProfileFormValues {
  fullName: string
  email: string
  phone: string
  cpf: string
  city: string
  state: string
  bio: string
}

interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>
  onSave?: (values: ProfileFormValues) => Promise<void>
}

const optional = (schema: z.ZodString) =>
  z.union([z.literal(''), schema]).optional()

const profileSchema = z.object({
  fullName: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }).max(100),
  phone: optional(
    z
      .string()
      .refine((v) => onlyDigits(v).length === 10 || onlyDigits(v).length === 11, {
        message: 'Telefone inválido',
      }),
  ),
  cpf: optional(
    z.string().refine((v) => onlyDigits(v).length === 11, {
      message: 'CPF deve conter 11 dígitos',
    }),
  ),
  city: optional(z.string().max(100)),
  state: optional(
    z.string().regex(/^[A-Z]{2}$/, { message: 'Use a sigla de 2 letras (ex: SP)' }),
  ),
  bio: optional(z.string().max(1000)),
})

type ProfileSchemaValues = z.infer<typeof profileSchema>

function buildDefaults(values: Partial<ProfileFormValues> = {}): ProfileSchemaValues {
  return {
    fullName: values.fullName ?? '',
    phone: values.phone ? formatPhone(values.phone) : '',
    cpf: values.cpf ? formatCpf(values.cpf) : '',
    city: values.city ?? '',
    state: values.state ?? '',
    bio: values.bio ?? '',
  }
}

export function ProfileForm({ defaultValues = {}, onSave }: ProfileFormProps) {
  const [revealed, setRevealed] = useState(false)
  const email = defaultValues.email ?? ''

  const form = useForm<ProfileSchemaValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: buildDefaults(defaultValues),
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: ProfileSchemaValues) {
    await onSave?.({
      ...values,
      email,
      cpf: values.cpf ? onlyDigits(values.cpf) : '',
    } as ProfileFormValues)
    setRevealed(false)
  }

  function handleCancel() {
    form.reset(buildDefaults(defaultValues))
    setRevealed(false)
  }

  return (
    <Card className="p-6 gap-0 h-full">
      <div className="flex items-center justify-between mb-4 min-h-9">
        <h3 className="font-semibold text-foreground">Informações Pessoais</h3>
        {revealed && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button form="profile-edit-form" type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar
            </Button>
          </div>
        )}
      </div>

      <div className="relative">
        <div className={revealed ? '' : 'blur-sm pointer-events-none select-none'} aria-hidden={!revealed}>
          <Form {...form}>
            <form id="profile-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} className="mt-1.5" disabled />
                <p className="text-xs text-muted-foreground mt-1">
                  O e-mail não pode ser alterado.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 99999-9999"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="000.000.000-00"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => field.onChange(formatCpf(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SP"
                          maxLength={2}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografia</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Fale um pouco sobre você" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </form>
          </Form>
        </div>

        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button type="button" variant="outline" className="gap-2" onClick={() => setRevealed(true)}>
              <Pencil className="w-4 h-4" />
              Editar
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
