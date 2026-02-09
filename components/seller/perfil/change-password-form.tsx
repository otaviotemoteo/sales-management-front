'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface ChangePasswordFormProps {
  onSubmit?: (data: any) => void
  isLoading?: boolean
}

export function ChangePasswordForm({ onSubmit, isLoading }: ChangePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Card className="p-6">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({}); }} className="space-y-4">
        <div>
          <Label htmlFor="currentPassword">Senha Atual</Label>
          <div className="relative mt-1.5">
            <Input
              id="currentPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha atual"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="newPassword">Nova Senha</Label>
          <div className="relative mt-1.5">
            <Input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Digite uma nova senha"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative mt-1.5">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua nova senha"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? 'Alterando...' : 'Alterar Senha'}
        </Button>
      </form>
    </Card>
  )
}
