import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShieldCheck, Award, Calendar, HelpCircle } from "lucide-react"

export default function WarrantyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="font-serif text-5xl font-bold mb-4">Our Warranty Pledge</h1>
            <p className="text-xl text-muted-foreground">We stand behind every piece we create.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <Calendar className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-bold text-lg mb-2">5 Year Structural</h3>
              <p className="text-sm text-muted-foreground">Coverage for any manufacturing defects in the frame and structure.</p>
            </div>
            <div className="text-center p-6">
              <Award className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-bold text-lg mb-2">1 Year Surface</h3>
              <p className="text-sm text-muted-foreground">Coverage for finishes, upholstery fabrics, and mechanical parts.</p>
            </div>
            <div className="text-center p-6">
              <HelpCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-bold text-lg mb-2">Lifetime Support</h3>
              <p className="text-sm text-muted-foreground">Access to our repair services and care advice for the life of the piece.</p>
            </div>
          </div>

          <div className="space-y-8 prose prose-slate max-w-none">
            <section className="p-8 bg-muted/30 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-4">What is covered?</h2>
              <p className="text-muted-foreground">Artisan warrants to the original purchaser that our products are free from defects in material and workmanship. This includes joint failure, wood splitting, and significant warping under normal domestic use.</p>
            </section>

            <section className="p-8 bg-muted/30 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-4">What is NOT covered?</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Normal wear and tear over time.</li>
                <li>• Damage caused by improper care or use of harsh chemicals.</li>
                <li>• Exposure to extreme temperatures or direct sunlight.</li>
                <li>• Natural variations in wood grain or leather markings.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
