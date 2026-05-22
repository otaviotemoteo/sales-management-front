'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { PartyPopper } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function OnboardingConcluidoPage() {
  const router = useRouter()

  useEffect(() => {
    const duration = 1500
    const end = Date.now() + duration
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } })
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <Card className="p-10 text-center space-y-5">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto">
        <PartyPopper className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Parabéns! 🎉</h1>
        <p className="text-muted-foreground">
          Tudo pronto para você gerenciar suas vendas e vendedores!
        </p>
      </div>
      <Button size="lg" className="w-full" onClick={() => router.replace('/admin/dashboard')}>
        Ir para o painel
      </Button>
    </Card>
  )
}
