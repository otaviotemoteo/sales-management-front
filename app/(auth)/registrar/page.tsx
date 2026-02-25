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

const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  function onSubmit(values: RegisterValues) {
    console.log(values)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left decorative panel */}
      <AuthSidePanel
        headline="Comece a crescer hoje."
        quote="Quem controla suas vendas, controla seu futuro."
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
              <h1 className="text-2xl font-bold text-foreground">Criar conta</h1>
              <p className="text-muted-foreground">Grátis para sempre</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar senha</FormLabel>
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
                  Criar conta grátis
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{' '}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Entrar
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
