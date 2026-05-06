import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function SustainabilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1500"
            alt="Forest"
            fill
            className="object-cover brightness-50"
          />
          <div className="container mx-auto px-4 text-center relative z-10 text-white">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Built for Generations</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Our commitment to the environment is as strong as the furniture we build.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl space-y-16">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold mb-8">Our Environmental Pledge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Artisan, we believe that luxury shouldn't cost the earth. Our sustainability strategy is built on three main pillars: responsible sourcing, zero-waste production, and longevity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Responsibly Sourced Wood</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We only use wood from FSC-certified forests, ensuring that for every tree harvested, new ones are planted. This maintains the ecological balance and preserves our natural heritage.
                </p>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1000"
                  alt="Sustainable wood"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9d3c3522d?auto=format&fit=crop&q=80&w=1000"
                  alt="Zero waste"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-serif text-2xl font-bold mb-4">Circular Production</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our workshops operate on a zero-waste principle. Wood offcuts are repurposed into smaller decor items or used as sustainable fuel for our kilns, ensuring nothing goes to landfill.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
