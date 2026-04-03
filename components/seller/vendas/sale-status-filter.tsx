'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface Tab {
  value: string
  label: string
}

interface SaleStatusFilterProps {
  value: string
  onChange: (value: string) => void
  tabs: Tab[]
  counts: Record<string, number>
}

export function SaleStatusFilter({ value, onChange, tabs, counts }: SaleStatusFilterProps) {
  const activeLabel = tabs.find((t) => t.value === value)?.label ?? ''

  return (
    <>
      {/* Mobile: dropdown selector */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm font-medium text-foreground focus:outline-none">
            <span>
              <span className="text-muted-foreground">Mostrar:</span>{' '}
              {activeLabel}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onClick={() => onChange(tab.value)}
                className="flex justify-between"
                data-active={tab.value === value}
              >
                <span className={tab.value === value ? 'font-semibold' : ''}>{tab.label}</span>
                <span className="text-muted-foreground text-xs">{counts[tab.value]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop: tabs */}
      <div className="hidden sm:block">
        <Tabs value={value} onValueChange={(v) => onChange(v)}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label} ({counts[t.value]})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  )
}
