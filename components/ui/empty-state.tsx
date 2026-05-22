import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  className?: string
}

export function EmptyState({ icon: Icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-10 px-4', className)}>
      {Icon && (
        <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>}
    </div>
  )
}
