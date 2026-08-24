'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { AuthSidePanel } from '@/components/auth/auth-side-panel'
import { useAuth } from '@/hooks/use-auth'
import * as authService from '@/services/auth.service'

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string(),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { login, firstAccessLogin } = useAuth()
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'email' | 'password'>('email')

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: LoginValues) {
    setServerError(null)
    setIsSubmitting(true)
    try {
      if (step === 'email') {
        const { firstAccess } = await authService.checkEmail(values.email)
        if (firstAccess) {
          await firstAccessLogin(values.email)
          router.push('/onboarding/seller')
          return
        }
        setStep('password')
        return
      }

      if (values.password.length < 6) {
        form.setError('password', { message: 'Senha deve ter no mínimo 6 caracteres' })
        return
      }
      const user = await login(values.email, values.password)
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : '/vendedor/dashboard')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleBackToEmail() {
    setStep('email')
    setServerError(null)
    form.setValue('password', '')
    form.clearErrors('password')
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left decorative panel */}
      <AuthSidePanel
        headline="Gerencie suas vendas com inteligência."
        quote="O segredo do sucesso é conhecer seus números."
      />

      {/* Right form panel */}
      <div className="relative flex items-center justify-center p-8 bg-muted/30">
        {/* Mobile-only back button */}
        <Link
          href="/"
          className="absolute top-6 left-6 inline-flex items-center justify-center w-9 h-9 bg-muted hover:bg-muted/80 rounded-lg transition-colors md:hidden"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </Link>

        <div className="w-full max-w-sm space-y-6">
          <Card className="p-8 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">Entrar</h1>
              <p className="text-muted-foreground">
                {step === 'email' ? 'Informe seu e-mail para continuar' : 'Bem-vindo de volta'}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          disabled={step === 'password'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {step === 'password' && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            autoFocus
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {serverError && (
                  <p className="text-sm text-destructive text-center">{serverError}</p>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {step === 'email' ? 'Continuar' : 'Entrar'}
                </Button>
                {step === 'password' && (
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    Usar outro e-mail
                  </button>
                )}
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Não tem conta?{' '}
              <Link
                href="/registrar"
                className="text-primary hover:underline font-medium"
              >
                Criar conta grátis
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
