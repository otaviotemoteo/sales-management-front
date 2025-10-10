import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, ArrowRight, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm">
            <Zap className="w-4 h-4" />
            <span>Sistema completo de gestão de vendas</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            Controle total das suas vendas em tempo real
          </h1>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Plataforma completa para gerenciar produtos, vendedores, clientes e
            vendas. Dashboards inteligentes, relatórios detalhados e controle de
            pagamentos em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="text-base" asChild>
              <Link href="/signup">
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent"
              asChild
            >
              <Link href="/demo">Ver Demonstração</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur">
            <Card className="p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Vendas Hoje
                </span>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-foreground">R$ 24.580</p>
                <p className="text-sm text-muted-foreground">+32% vs. ontem</p>
              </div>
              <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/30 rounded-lg flex items-end justify-around p-4">
                {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                  <div
                    key={i}
                    className="bg-primary rounded-t w-8"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
