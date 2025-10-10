import { Card } from "@/components/ui/card";
import { Shield, Users, CheckCircle2 } from "lucide-react";

const adminFeatures = [
  "Dashboard completo com métricas gerais",
  "Gestão de produtos e categorias",
  "Controle de vendedores e permissões",
  "Relatórios detalhados por período",
  "Exportação de dados em PDF",
  "Logs de auditoria completos",
];

const sellerFeatures = [
  "Registro rápido de vendas",
  "Cadastro de novos clientes",
  "Histórico de vendas pessoais",
  "Acompanhamento de metas",
  "Interface mobile otimizada",
  "Notificações de pagamentos",
];

export function ModulesSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12">
        <Card className="p-8 space-y-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Para Administradores
          </h3>
          <ul className="space-y-3">
            {adminFeatures.map((item, i) => (
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
          <h3 className="text-2xl font-bold text-foreground">
            Para Vendedores
          </h3>
          <ul className="space-y-3">
            {sellerFeatures.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
