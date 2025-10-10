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
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                VendaFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistema completo de gestão de vendas para o seu negócio.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 VendaFlow. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
