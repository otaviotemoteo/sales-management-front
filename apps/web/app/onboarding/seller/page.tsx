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
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
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

  // Already has a password → move on to the profile step (or the dashboard if done).
  useEffect(() => {
    if (!isLoading && user && !user.mustSetPassword) {
      const profileEmpty = !user.phone && !user.cpf && !user.city && !user.state
      router.replace(profileEmpty ? '/onboarding/seller/profile' : '/seller/dashboard')
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
      toast({ title: 'Password set.' })
      router.replace('/onboarding/seller/profile')
    } catch (err) {
      toast({
        title: 'Could not set the password',
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
        <h1 className="text-2xl font-bold text-foreground">Let's get you ready to sell.</h1>
        <p className="text-muted-foreground">Set your password to reach your account.</p>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Create a password" autoFocus {...field} />
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
                  <Input type="password" placeholder="Repeat the password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Set password and start
          </Button>
        </form>
      </Form>
    </Card>
  )
}
