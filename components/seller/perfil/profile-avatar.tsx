'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Mail, Phone, IdCard, MapPin, FileText, Calendar } from 'lucide-react'

interface ProfileAvatarProps {
  name: string
  email: string
  phone: string
  cpf: string
  city: string
  state: string
  bio: string
  joinDate: string
  avatarUrl?: string
  onAvatarChange?: (file: File) => void
}

export function ProfileAvatar({
  name,
  email,
  phone,
  cpf,
  city,
  state,
  bio,
  joinDate,
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
    if (file) onAvatarChange?.(file)
  }

  return (
    <Card className="p-6 flex flex-col gap-0">
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 cursor-pointer">
            <Button size="sm" className="rounded-full w-8 h-8 p-0" asChild>
              <span><Camera className="w-4 h-4" /></span>
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
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Mail className="w-4 h-4 shrink-0" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Phone className="w-4 h-4 shrink-0" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <IdCard className="w-4 h-4 shrink-0" />
          <span>{cpf}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{city}, {state}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <FileText className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="italic leading-relaxed">{bio}</p>
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Membro desde {joinDate}</span>
        </div>
      </div>
    </Card>
  )
}
