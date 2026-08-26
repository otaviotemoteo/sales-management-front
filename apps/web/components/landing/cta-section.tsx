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
          transform how your business is run.
        </p>
        <div className="flex justify-center pt-4">
          <Button size="lg" variant="secondary" className="text-base" asChild>
            <Link href="/register">
              Create a free account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
