'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { PauseCircle, Trash2, AlertTriangle } from 'lucide-react'

const CONFIRM_PHRASE = 'delete my account'

interface AccountActionsCardProps {
  onDeactivate?: () => void
  onDelete?: () => void
}

export function AccountActionsCard({ onDeactivate, onDelete }: AccountActionsCardProps) {
  const [deactivateOpen, setDeactivateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDeactivate = () => {
    onDeactivate?.()
    setDeactivateOpen(false)
  }

  const handleDelete = () => {
    onDelete?.()
    setConfirmText('')
    setDeleteOpen(false)
  }

  const handleDeleteOpenChange = (open: boolean) => {
    if (!open) setConfirmText('')
    setDeleteOpen(open)
  }

  return (
    <>
      <Card className="p-6 gap-0 h-full flex flex-col">
        <div className="mb-6">
          <h3 className="font-semibold text-foreground">Account actions</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie o status da sua conta
          </p>
        </div>

        <div className="border-t border-border pt-5 space-y-5 flex-1">
          {/* Desativar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <PauseCircle className="w-4 h-4 text-yellow-500 shrink-0" />
              <span className="text-sm font-medium text-foreground">Deactivate account</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-6.5">
              Your account becomes temporarily inactive. You can reactivate it at any time by signing in again.
            </p>
            <div className="pl-6.5">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 dark:hover:bg-yellow-950"
                onClick={() => setDeactivateOpen(true)}
              >
                Deactivate account
              </Button>
            </div>
          </div>

          {/* Deletar */}
          <div className="border-t border-border pt-5 space-y-2">
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4 text-destructive shrink-0" />
              <span className="text-sm font-medium text-foreground">Delete account</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-6.5">
              All your data is permanently removed. This is irreversible and cannot be undone.
            </p>
            <div className="pl-6.5">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteOpen(true)}
              >
                Delete account
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal Desativar */}
      <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <PauseCircle className="w-5 h-5 text-yellow-500" />
              <DialogTitle>Deactivate account</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to deactivate your account? It becomes inactive and you lose access to the dashboard until you reactivate it, which you do simply by signing in again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeactivateOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="border-yellow-500 bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleDeactivate}
            >
              Deactivate account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Deletar */}
      <Dialog open={deleteOpen} onOpenChange={handleDeleteOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <DialogTitle className="text-destructive">Delete account permanently</DialogTitle>
            </div>
            <DialogDescription className="space-y-2">
              <span className="block">
                This is <strong className="text-foreground">irreversible</strong>. All your data, sales, history and settings are permanently deleted.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            Once deleted, your account cannot be recovered.
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm-delete" className="text-sm">
              Para confirmar, digite{' '}
              <span className="font-mono font-semibold text-foreground">
                {CONFIRM_PHRASE}
              </span>
            </Label>
            <Input
              id="confirm-delete"
              placeholder={CONFIRM_PHRASE}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleDeleteOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={confirmText !== CONFIRM_PHRASE}
              onClick={handleDelete}
            >
              Deletar Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
