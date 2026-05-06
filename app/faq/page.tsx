import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "What materials do you use for your furniture?",
      answer: "We primarily use high-grade hardwoods like Walnut, Oak, and Teak. Our fabrics are sourced from premium mills, and we use top-grain or full-grain leathers."
    },
    {
      question: "Do you offer custom furniture designs?",
      answer: "Yes, we offer customization on many of our pieces. You can choose different wood finishes, fabrics, and sometimes even adjust dimensions. Contact our design team for details."
    },
    {
      question: "How long does delivery take?",
      answer: "For items in stock, delivery typically takes 3-7 business days. Custom or made-to-order pieces can take between 4-8 weeks depending on the complexity."
    },
    {
      question: "Do you provide assembly services?",
      answer: "Yes! Our white-glove delivery service includes full assembly and placement of your furniture, as well as removal of all packaging materials."
    },
    {
      question: "Is there a warranty on your products?",
      answer: "Every Artisan piece comes with a standard 5-year structural warranty and a 1-year warranty on fabrics and finishes."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-5xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need to know about our products and services.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-bold text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-20 p-8 bg-muted rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">We're here to help you find the perfect piece for your home.</p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
