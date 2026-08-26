import Link from "next/link";
import { BarChart3 } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Funcionalidades" },
      { href: "/pricing", label: "Pricing" },
      { href: "/demo", label: "Demo" },
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
      { href: "/docs", label: "Documentation" },
      { href: "/privacy", label: "Privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
        <div className="py-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Sales Management. All rights reserved.</p>
        </div>
    </footer>
  );
}
