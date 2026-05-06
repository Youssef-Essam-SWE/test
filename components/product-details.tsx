"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { ShoppingCart, Truck, RotateCcw, Shield, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const isWishlisted = isInWishlist(product.id)

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
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
          <Button
            size="lg"
            variant="outline"
            className={isWishlisted ? "text-red-500 border-red-500 hover:bg-red-50" : ""}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            <span className="sr-only">Toggle Wishlist</span>
          </Button>
        </div>

        {!product.inStock && (
          <p className="text-sm text-muted-foreground mt-4">
            This item is currently out of stock. Check back soon!
          </p>
        )}
      </div>
      {/* Reviews Section */}
      <div className="col-span-full mt-20">
        <h2 className="font-serif text-3xl font-bold mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah M.",
              rating: 5,
              date: "2 weeks ago",
              comment: "Absolutely beautiful piece! The craftsmanship is top-notch and it looks even better in person. Delivery was smooth and on time.",
            },
            {
              name: "James R.",
              rating: 4,
              date: "1 month ago",
              comment: "Very sturdy and high quality. The wood grain is stunning. Assembly was a bit slow but the instructions were clear.",
            },
            {
              name: "Elena G.",
              rating: 5,
              date: "2 months ago",
              comment: "The perfect addition to my living room. I get so many compliments on it! Highly recommend Artisan furniture.",
            },
          ].map((review, i) => (
            <div key={i} className="p-6 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "text-accent fill-current" : "text-muted"}`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">{review.name}</span>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
