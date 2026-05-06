import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  const jobs = [
    { title: "Master Woodworker", department: "Production", type: "Full-time", location: "New Cairo" },
    { title: "Interior Designer", department: "Design", type: "Full-time", location: "Remote/Showroom" },
    { title: "E-commerce Manager", department: "Operations", type: "Full-time", location: "New Cairo" },
    { title: "Customer Experience Specialist", department: "Support", type: "Full-time", location: "New Cairo" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-5xl font-bold mb-6">Join the Artisan Team</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We're looking for passionate individuals who care about craftsmanship and quality.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-serif text-3xl font-bold mb-12">Open Positions</h2>
            <div className="space-y-6">
              {jobs.map((job, i) => (
                <div key={i} className="group p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-8">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Artisan Culture</h3>
                <p className="text-muted-foreground">Work in an environment that values creativity, precision, and the human element of design.</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Growth & Learning</h3>
                <p className="text-muted-foreground">We invest in our people, providing opportunities to master new techniques and technologies.</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Impact</h3>
                <p className="text-muted-foreground">Help build beautiful spaces that people will cherish for generations to come.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
