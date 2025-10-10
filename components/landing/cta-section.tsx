import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="p-12 text-center space-y-6 bg-gradient-to-br from-primary to-primary/80 border-0">
        <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground text-balance">
          Pronto para transformar suas vendas?
        </h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
          Comece gratuitamente hoje e descubra como o VendaFlow pode
          revolucionar a gestão do seu negócio.
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
  );
}
