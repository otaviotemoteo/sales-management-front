import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BarChart3,
  Users,
  Package,
  TrendingUp,
  Shield,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Zap,
  Clock,
  DollarSign,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">VendaFlow</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Criar Conta</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
              Plataforma completa para gerenciar produtos, vendedores, clientes e vendas. Dashboards inteligentes,
              relatórios detalhados e controle de pagamentos em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-base" asChild>
                <Link href="/signup">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href="/demo">Ver Demonstração</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur">
              <Card className="p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Vendas Hoje</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-foreground">R$ 24.580</p>
                  <p className="text-sm text-muted-foreground">+32% vs. ontem</p>
                </div>
                <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/30 rounded-lg flex items-end justify-around p-4">
                  {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                    <div key={i} className="bg-primary rounded-t w-8" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground text-balance">
            Tudo que você precisa para vender mais
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Funcionalidades completas para administradores e vendedores
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Package,
              title: "Gestão de Produtos",
              description:
                "Cadastre e gerencie produtos com fotos, preços, categorias e estoque de forma simples e rápida.",
            },
            {
              icon: Users,
              title: "Controle de Vendedores",
              description:
                "Gerencie sua equipe de vendas, acompanhe performance individual e defina permissões de acesso.",
            },
            {
              icon: BarChart3,
              title: "Registro de Vendas",
              description:
                "Registre vendas rapidamente com seleção de produtos, clientes e formas de pagamento integradas.",
            },
            {
              icon: DollarSign,
              title: "Fechamento por Cliente",
              description: "Agrupe vendas por cliente, visualize histórico completo e gerencie pagamentos pendentes.",
            },
            {
              icon: TrendingUp,
              title: "Dashboard Inteligente",
              description:
                "Métricas em tempo real, gráficos de evolução e relatórios detalhados para tomada de decisão.",
            },
            {
              icon: Smartphone,
              title: "Mobile First",
              description:
                "Interface otimizada para vendedores em campo, funciona perfeitamente em smartphones e tablets.",
            },
          ].map((feature, i) => (
            <Card key={i} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8 space-y-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Para Administradores</h3>
            <ul className="space-y-3">
              {[
                "Dashboard completo com métricas gerais",
                "Gestão de produtos e categorias",
                "Controle de vendedores e permissões",
                "Relatórios detalhados por período",
                "Exportação de dados em PDF",
                "Logs de auditoria completos",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 space-y-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Para Vendedores</h3>
            <ul className="space-y-3">
              {[
                "Registro rápido de vendas",
                "Cadastro de novos clientes",
                "Histórico de vendas pessoais",
                "Acompanhamento de metas",
                "Interface mobile otimizada",
                "Notificações de pagamentos",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Múltiplas formas de pagamento</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Registre vendas com diferentes métodos de pagamento e acompanhe o status
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Dinheiro", icon: DollarSign },
            { name: "PIX", icon: Zap },
            { name: "Cartão Débito", icon: CheckCircle2 },
            { name: "Cartão Crédito", icon: CheckCircle2 },
          ].map((method, i) => (
            <Card key={i} className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground">{method.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "< 2s", label: "Tempo de carregamento", icon: Clock },
            { value: "100%", label: "Segurança de dados", icon: Shield },
            { value: "24/7", label: "Disponibilidade", icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center space-y-6 bg-gradient-to-br from-primary to-primary/80 border-0">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground text-balance">
            Pronto para transformar suas vendas?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Comece gratuitamente hoje e descubra como o VendaFlow pode revolucionar a gestão do seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-base" asChild>
              <Link href="/signup">
                Criar Conta Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Falar com Vendas</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">VendaFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">Sistema completo de gestão de vendas para o seu negócio.</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground transition-colors">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-foreground transition-colors">
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentação
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 VendaFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
