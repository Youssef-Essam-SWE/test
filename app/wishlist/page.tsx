"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useWishlist } from "@/lib/wishlist-context"
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/shop">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-serif text-4xl font-bold flex items-center gap-3">
              My Wishlist <Heart className="h-8 w-8 text-red-500 fill-current" />
            </h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Save your favorite pieces here to easily find them later and add them to your cart.
              </p>
              <Button asChild size="lg">
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Explore Shop
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
