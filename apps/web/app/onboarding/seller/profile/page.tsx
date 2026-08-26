'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, UserCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import * as usersService from '@/services/users.service'
import { onlyDigits, formatPhone, formatCpf } from '@/lib/masks'

const schema = z.object({
  phone: z
    .string()
    .refine((v) => onlyDigits(v).length === 10 || onlyDigits(v).length === 11, {
      message: 'Invalid phone number',
    }),
  cpf: z.string().refine((v) => onlyDigits(v).length === 11, {
    message: 'CPF must contain 11 digits',
  }),
  city: z.string().min(1, { message: 'Enter your city' }).max(100),
  state: z.string().regex(/^[A-Z]{2}$/, { message: 'Use the 2-letter code, e.g. NY' }),
  bio: z.union([z.literal(''), z.string().max(1000)]).optional(),
})

type Values = z.infer<typeof schema>

export default function SellerOnboardingProfilePage() {
  const { user, isLoading, refreshUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { phone: '', cpf: '', city: '', state: '', bio: '' },
  })

  // Password not set yet → do phase 1 first.
  useEffect(() => {
    if (!isLoading && user?.mustSetPassword) {
      router.replace('/onboarding/seller')
    }
  }, [isLoading, user, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  async function onSubmit(values: Values) {
    try {
      await usersService.updateOwnProfile({
        phone: values.phone,
        cpf: onlyDigits(values.cpf),
        city: values.city,
        state: values.state,
        bio: values.bio || undefined,
      })
      await refreshUser()
      toast({ title: 'Perfil completo! Tudo pronto.' })
      router.replace('/seller/dashboard')
    } catch (err) {
      toast({
        title: 'Could not save the profile',
        description: err instanceof Error ? err.message : 'Tente novamente',
        variant: 'destructive',
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">Step 2 of 2</p>
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary">
          <UserCircle className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Complete your profile</h1>
        <p className="text-muted-foreground">Tell us a little about yourself to finish.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      autoFocus
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
                    <Input placeholder="New York" {...field} />
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
                  <Textarea placeholder="Tell us a little about yourself" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Concluir
          </Button>
        </form>
      </Form>
    </Card>
  )
}
