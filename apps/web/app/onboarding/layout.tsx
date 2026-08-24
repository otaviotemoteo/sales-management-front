import type React from 'react'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  )
}
