'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

interface ProfileAvatarProps {
  name: string
  email: string
  avatarUrl?: string
  onAvatarChange?: (file: File) => void
}

export function ProfileAvatar({
  name,
  email,
  avatarUrl,
  onAvatarChange,
}: ProfileAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onAvatarChange?.(file)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <label htmlFor="avatar-upload" className="absolute bottom-0 right-0">
            <Button
              size="sm"
              className="rounded-full"
              asChild
            >
              <Camera className="w-4 h-4" />
            </Button>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </Card>
  )
}
