"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShoppingBag } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-green-100 p-6">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="font-serif text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. We've received your order and we'll start preparing it right away.
          </p>
          
          <div className="bg-muted p-6 rounded-lg mb-10 border border-border">
            <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
              Order Number
            </p>
            <p className="text-3xl font-mono font-bold text-foreground">
              #{orderId || "N/A"}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/shop" className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
