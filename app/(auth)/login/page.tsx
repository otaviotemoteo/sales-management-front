'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  function onSubmit(values: LoginValues) {
    console.log(values)
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
              <p className="text-muted-foreground">Bem-vindo de volta</p>
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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg">
                  Entrar
                </Button>
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
