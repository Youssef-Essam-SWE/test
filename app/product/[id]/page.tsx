"use client"

import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProducts } from "@/lib/product-context"
import { ProductDetails } from "@/components/product-details"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { products } = useProducts()
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductDetails product={product} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
