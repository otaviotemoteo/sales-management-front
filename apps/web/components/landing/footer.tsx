import Link from "next/link";
import { BarChart3 } from "lucide-react";

const footerSections = [
  {
    title: "Produto",
    links: [
      { href: "/features", label: "Funcionalidades" },
      { href: "/pricing", label: "Preços" },
      { href: "/demo", label: "Demonstração" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/about", label: "Sobre" },
      { href: "/contact", label: "Contato" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { href: "/help", label: "Central de Ajuda" },
      { href: "/docs", label: "Documentação" },
      { href: "/privacy", label: "Privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
        <div className="py-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 VendaFlow. Todos os direitos reservados.</p>
        </div>
    </footer>
  );
}
