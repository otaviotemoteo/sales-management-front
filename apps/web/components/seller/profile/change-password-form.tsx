'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as usersService from '@/services/users.service'
import { useToast } from '@/hooks/use-toast'

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Enter your current password' }),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ChangePasswordValues = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const { toast } = useToast()
  const [revealed, setRevealed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: ChangePasswordValues) {
    try {
      await usersService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      toast({ title: 'Password changed.' })
      form.reset()
      setRevealed(false)
    } catch (err) {
      toast({
        title: 'Could not change the password',
        description: err instanceof Error ? err.message : 'Tente novamente',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="p-6 h-full">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Change password</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Update the password for your account
        </p>
      </div>

      <div className="relative">
        <div
          className={
            revealed ? '' : 'blur-sm pointer-events-none select-none'
          }
          aria-hidden={!revealed}
        >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your current password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter a new password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
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
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => { form.reset(); setRevealed(false) }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Change password
            </Button>
          </div>
        </form>
      </Form>
        </div>

        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button type="button" variant="outline" className="gap-2" onClick={() => setRevealed(true)}>
              <Lock className="w-4 h-4" />
              Change password
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
