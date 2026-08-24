'use client'

import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const chartData = [
  { month: 'Jan', revenue: 18000 },
  { month: 'Fev', revenue: 22000 },
  { month: 'Mar', revenue: 19500 },
  { month: 'Abr', revenue: 28000 },
  { month: 'Mai', revenue: 31000 },
  { month: 'Jun', revenue: 27000 },
  { month: 'Jul', revenue: 35000 },
  { month: 'Ago', revenue: 38000 },
  { month: 'Set', revenue: 42000 },
  { month: 'Out', revenue: 39000 },
  { month: 'Nov', revenue: 48000 },
  { month: 'Dez', revenue: 52000 },
]

interface AuthSidePanelProps {
  headline: string
  quote: string
}

export function AuthSidePanel({ headline, quote }: AuthSidePanelProps) {
  return (
    <div className="hidden md:flex md:flex-col min-h-screen bg-gradient-to-br from-primary to-primary/80 p-10 text-primary-foreground">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center justify-center w-9 h-9 bg-primary-foreground/15 hover:bg-primary-foreground/25 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      {/* Headline + Chart */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <h2 className="text-3xl xl:text-4xl font-bold text-balance leading-tight">
          {headline}
        </h2>

        <div className="space-y-3">
          <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-medium">
            Faturamento Mensal
          </p>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="authGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(255,255,255)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="rgb(255,255,255)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth={2}
                  fill="url(#authGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="border-l-2 border-primary-foreground/40 pl-4">
        <p className="text-primary-foreground/80 italic text-sm leading-relaxed">
          "{quote}"
        </p>
      </blockquote>
    </div>
  )
}
