"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { products as initialProducts, type Product } from "./products"

interface ProductContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    const savedProducts = localStorage.getItem("site_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("site_products", JSON.stringify(products))
  }, [products])

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev])
  }

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
