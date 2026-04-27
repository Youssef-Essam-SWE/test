import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[400px] flex items-center bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Our Story</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Crafting exceptional furniture with passion and precision since 2020
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">Where Craftsmanship Meets Modern Design</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in 2020, Artisan began with a simple mission: to create furniture that combines timeless
                  design with exceptional craftsmanship. What started as a small workshop has grown into a trusted name
                  in contemporary home furnishings.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every piece we create is handcrafted by skilled artisans who take pride in their work. We source
                  sustainable materials and use traditional techniques passed down through generations, ensuring each
                  item is built to last.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment to quality extends beyond the finished product. We believe in transparent practices,
                  ethical sourcing, and creating furniture that brings joy to your home for years to come.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/modern-living-room-furniture-interior.jpg" alt="Beautifully designed furniture in modern home" fill className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Pieces Crafted</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5 Years</div>
                <p className="text-muted-foreground">Warranty Coverage</p>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-12 text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore our collection of handcrafted furniture and find the perfect pieces for your home
              </p>
              <Button size="lg" asChild>
                <Link href="/shop">Browse Collection</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
