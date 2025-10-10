import { Card } from "@/components/ui/card";
import {
  Package,
  Users,
  BarChart3,
  DollarSign,
  TrendingUp,
  Smartphone,
  Zap,
  CheckCircle2,
  Clock,
  Shield,
} from "lucide-react";

const features = [
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
    description:
      "Agrupe vendas por cliente, visualize histórico completo e gerencie pagamentos pendentes.",
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
];

const paymentMethods = [
  { name: "Dinheiro", icon: DollarSign },
  { name: "PIX", icon: Zap },
  { name: "Cartão Débito", icon: CheckCircle2 },
  { name: "Cartão Crédito", icon: CheckCircle2 },
];

const stats = [
  { value: "< 2s", label: "Tempo de carregamento", icon: Clock },
  { value: "100%", label: "Segurança de dados", icon: Shield },
  { value: "24/7", label: "Disponibilidade", icon: Zap },
];

export function FeaturesSection() {
  return (
    <>
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
          {features.map((feature, i) => (
            <Card
              key={i}
              className="p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Múltiplas formas de pagamento
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Registre vendas com diferentes métodos de pagamento e acompanhe o
            status
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {paymentMethods.map((method, i) => (
            <Card
              key={i}
              className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow"
            >
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
          {stats.map((stat, i) => (
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
    </>
  );
}
