'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

const schema = z
  .object({
    newPassword: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type Values = z.infer<typeof schema>

export default function SellerOnboardingPage() {
  const { user, isLoading, refreshUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  // Already has a password → nothing to do here.
  useEffect(() => {
    if (!isLoading && user && !user.mustSetPassword) {
      router.replace('/vendedor/dashboard')
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
      await usersService.setInitialPassword(values.newPassword)
      await refreshUser()
      toast({ title: 'Senha definida! Bem-vindo(a)!' })
      router.replace('/vendedor/dashboard')
    } catch (err) {
      toast({
        title: 'Erro ao definir senha',
        description: err instanceof Error ? err.message : 'Tente novamente',
        variant: 'destructive',
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Vamos te preparar para vender!</h1>
        <p className="text-muted-foreground">Defina sua senha para acessar sua conta.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Nome</Label>
          <Input value={user.name} className="mt-1.5" disabled />
        </div>
        <div>
          <Label>E-mail</Label>
          <Input value={user.email} className="mt-1.5" disabled />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Crie uma senha" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Repita a senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Definir senha e começar
          </Button>
        </form>
      </Form>
    </Card>
  )
}
