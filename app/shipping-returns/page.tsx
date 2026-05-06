import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Truck, RotateCcw, Package, ShieldCheck } from "lucide-react"

export default function ShippingReturnsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-12 text-center">Shipping & Returns</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-muted/30 rounded-2xl border border-border">
              <Truck className="h-10 w-10 text-primary mb-6" />
              <h2 className="text-2xl font-bold mb-4">Fast & Safe Shipping</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer premium white-glove delivery on all furniture pieces. Our team will deliver, unpack, and place your new furniture in the room of your choice.
              </p>
            </div>
            <div className="p-8 bg-muted/30 rounded-2xl border border-border">
              <RotateCcw className="h-10 w-10 text-primary mb-6" />
              <h2 className="text-2xl font-bold mb-4">30-Day Returns</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <Package className="h-7 w-7" /> Delivery Fees
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>• Orders over $500: <strong>Free White-Glove Delivery</strong></p>
                <p>• Orders under $500: <strong>$50 flat rate</strong></p>
                <p>• We currently deliver to all major cities in Egypt.</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="h-7 w-7" /> Return Policy Details
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>Items must be in original condition and packaging. Custom-made or personalized pieces are non-refundable unless defective upon delivery.</p>
                <p>To initiate a return, please contact our support team at support@artisanfurniture.com with your order number.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
