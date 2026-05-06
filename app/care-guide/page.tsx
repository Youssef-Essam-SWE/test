import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Droplets, Sun, Wind, ShieldAlert } from "lucide-react"

export default function CareGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-6 text-center">Furniture Care Guide</h1>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Proper care ensures your Artisan pieces remain beautiful and last for generations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Wood Care</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Dust regularly with a soft, dry cloth.</li>
                <li>• Use coasters and placemats to prevent water rings and heat damage.</li>
                <li>• Wipe spills immediately with a slightly damp cloth.</li>
                <li>• Apply high-quality furniture wax every 6-12 months.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Sun className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold">Upholstery Care</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Vacuum regularly with a soft brush attachment.</li>
                <li>• Avoid direct sunlight to prevent fabric fading.</li>
                <li>• Rotate cushions regularly for even wear.</li>
                <li>• Professional cleaning is recommended for deep stains.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold">Leather Care</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Keep away from heat sources to prevent drying.</li>
                <li>• Clean with a soft, slightly damp cloth.</li>
                <li>• Use a leather conditioner every year to maintain suppleness.</li>
                <li>• Avoid harsh chemicals or soaps.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Wind className="h-6 w-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold">Environment</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Maintain consistent humidity levels (40-60%).</li>
                <li>• Avoid placing furniture directly in front of AC vents.</li>
                <li>• Lift furniture when moving it; do not drag it across the floor.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
