"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useProducts } from "@/lib/product-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Shield, Sparkles } from "lucide-react"

export default function HomePage() {
  const { products } = useProducts()
  const featuredProducts = products.filter(p => p.featured).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/modern-living-room-furniture-interior.jpg"
              alt="Modern living room"
              fill
              sizes="100vw"
              className="object-cover brightness-75"
              priority
            />
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                Timeless Design for Modern Living
              </h1>
              <p className="text-lg text-white/90 mb-8 text-pretty">
                Discover handcrafted furniture pieces that blend elegance with functionality. Each piece tells a story
                of craftsmanship and attention to detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/shop">
                    Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  On orders over $500. Fast and reliable delivery to your door.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">5-Year Warranty</h3>
                <p className="text-muted-foreground text-sm">
                  Quality guaranteed. All furniture backed by our comprehensive warranty.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Handcrafted</h3>
                <p className="text-muted-foreground text-sm">
                  Each piece is carefully crafted by skilled artisans using premium materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">Featured Collection</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our handpicked selection of signature pieces designed to elevate your space
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl font-bold mb-12 text-center">Shop by Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Living Room", href: "/shop?category=living-room", image: "/cozy-living-room.png" },
                { name: "Bedroom", href: "/shop?category=bedroom", image: "/cozy-bedroom-furniture.png" },
                { name: "Dining", href: "/shop?category=dining", image: "/elegant-dining-set.png" },
                { name: "Office", href: "/shop?category=office", image: "/home-office-furniture.jpg" },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-lg aspect-square"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="font-serif text-2xl font-bold text-white p-6">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* Newsletter */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
              Join the Artisan Inner Circle
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
              Subscribe to receive exclusive offers, early access to new collections, and interior design inspiration.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground text-primary border-none focus-visible:ring-offset-0 focus-visible:ring-accent"
                required
              />
              <Button variant="accent" size="lg" className="shrink-0">
                Subscribe Now
              </Button>
            </form>
            <p className="mt-4 text-sm text-primary-foreground/60">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
