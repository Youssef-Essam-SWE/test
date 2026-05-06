import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-muted">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Crafting timeless furniture pieces that blend heritage craftsmanship with modern elegance.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000"
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold">The Artisan Philosophy</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2010, Artisan was born out of a passion for authentic materials and traditional woodworking techniques. We believe that furniture should not just occupy space, but tell a story of quality, durability, and art.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every piece in our collection is meticulously crafted by master artisans who pour decades of experience into every joint, every finish, and every detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality First",
                  description: "We never compromise on materials. Only the finest hardwoods, leathers, and textiles make it into our workshop."
                },
                {
                  title: "Sustainability",
                  description: "Our wood is sourced from responsibly managed forests. We build pieces that last generations, reducing waste."
                },
                {
                  title: "Human Touch",
                  description: "While we use modern precision where it matters, the soul of our furniture comes from human hands."
                }
              ].map((value, i) => (
                <div key={i} className="p-8 bg-background rounded-xl border border-border shadow-sm">
                  <h3 className="font-bold text-xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
