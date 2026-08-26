'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { PartyPopper } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const REDIRECT_MS = 10_000

export default function OnboardingConcluidoPage() {
  const router = useRouter()
  const [remaining, setRemaining] = useState(10)
  const goneRef = useRef(false)

  function goToDashboard() {
    if (goneRef.current) return
    goneRef.current = true
    router.replace('/admin/dashboard')
  }

  useEffect(() => {
    // Confetti burst
    const duration = 1500
    const end = Date.now() + duration
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } })
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    // 10s countdown → auto-redirect
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const left = Math.max(0, Math.ceil((REDIRECT_MS - elapsed) / 1000))
      setRemaining(left)
      if (elapsed >= REDIRECT_MS) {
        clearInterval(interval)
        goToDashboard()
      }
    }, 100)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ring geometry
  const size = 44
  const stroke = 4
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const progress = (10 - remaining) / 10 // 0 → 1
  const dashoffset = circumference * (1 - progress)

  return (
    <Card className="relative p-10 text-center space-y-5">
      {/* Countdown ring (top-right) */}
      <div className="absolute top-4 right-4" title={`Redirecionando em ${remaining}s`}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            className="text-primary transition-[stroke-dashoffset] duration-100 ease-linear"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
          {remaining}
        </span>
      </div>

      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto">
        <PartyPopper className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">All set.</h1>
        <p className="text-muted-foreground">
          You are set up to manage your sales and your sellers.
        </p>
      </div>
      <Button size="lg" className="w-full" onClick={goToDashboard}>
        Ir para o painel
      </Button>
    </Card>
  )
}
