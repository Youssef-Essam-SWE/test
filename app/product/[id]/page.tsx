"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Truck, RotateCcw, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = getProductById(id)
  const { addItem } = useCart()
  const { toast } = useToast()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-4">
                  {product.category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
                <h1 className="font-serif text-4xl font-bold mb-4 text-balance">{product.name}</h1>
                <p className="text-3xl font-bold mb-6">${product.price.toLocaleString()}</p>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">On orders over $500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">30-Day Returns</h3>
                    <p className="text-sm text-muted-foreground">Not satisfied? Return it hassle-free</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">5-Year Warranty</h3>
                    <p className="text-sm text-muted-foreground">Quality guaranteed</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-sm text-muted-foreground mt-4">
                  This item is currently out of stock. Check back soon!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
