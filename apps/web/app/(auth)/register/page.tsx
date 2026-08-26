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

const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  async function onSubmit(values: RegisterValues) {
    setServerError(null)
    setIsSubmitting(true)
    try {
      const user = await registerUser(values.name, values.email, values.password)
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : '/seller/dashboard')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not create the account')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left decorative panel */}
      <AuthSidePanel
        headline="Comece a crescer hoje."
        quote="Control your sales and you control what comes next."
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
              <h1 className="text-2xl font-bold text-foreground">Create account</h1>
              <p className="text-muted-foreground">Free forever</p>
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
                        <Input placeholder="Your name" {...field} />
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
                          placeholder="you@example.com"
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
                      <FormLabel>Password</FormLabel>
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
                      <FormLabel>Confirm password</FormLabel>
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
                {serverError && (
                  <p className="text-sm text-destructive text-center">{serverError}</p>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Create a free account
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
