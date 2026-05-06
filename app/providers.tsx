"use client"

import type React from "react"

import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { AdminProvider } from "@/lib/admin-context"
import { ProductProvider } from "@/lib/product-context"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
    </AdminProvider>
  )
}
