"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search, Heart, ShieldCheck, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useProducts } from "@/lib/product-context"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

export function Header() {
  const { itemCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { products } = useProducts()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "FAQ", href: "/faq" },
  ]

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const filteredResults = searchQuery.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-serif text-3xl font-bold tracking-tighter hover:text-primary transition-colors">
              ARTISAN
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button variant="ghost" size="sm" asChild className="hidden md:flex gap-2 text-primary hover:text-primary hover:bg-primary/10 mr-2">
              <Link href="/admin/dashboard">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-medium">Admin</span>
              </Link>
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className={`h-5 w-5 ${wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" asChild className="justify-start gap-2 text-primary px-0">
                    <Link href="/admin/dashboard">
                      <ShieldCheck className="h-5 w-5" />
                      Admin Portal
                    </Link>
                  </Button>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border pb-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Overlay using Portal */}
      {isSearchOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] bg-background animate-in fade-in zoom-in-95 duration-200">
          <div className="container mx-auto px-4 py-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-serif font-bold">Search Catalog</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }} 
                className="rounded-full h-12 w-12 hover:bg-muted"
              >
                <X className="h-8 w-8" />
              </Button>
            </div>

            <div className="max-w-3xl mx-auto w-full">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?" 
                  className="h-20 pl-16 pr-8 text-3xl bg-muted/30 border-2 border-transparent focus-visible:border-primary focus-visible:ring-0 rounded-2xl transition-all"
                />
              </div>

              {/* Live Results Area */}
              <div className="mt-12 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Search Results</p>
                    {filteredResults.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/product/${product.id}`}
                        onClick={() => {
                          setIsSearchOpen(false)
                          setSearchQuery("")
                        }}
                        className="flex items-center gap-6 p-4 rounded-2xl bg-muted/20 hover:bg-muted/50 border border-transparent hover:border-primary/20 transition-all group"
                      >
                        <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-xl mb-1">{product.name}</p>
                              <p className="text-sm text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
                            </div>
                            <p className="text-primary font-bold text-xl">${product.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.trim() !== "" ? (
                  <div className="text-center py-20 bg-muted/10 rounded-3xl">
                    <p className="text-2xl text-muted-foreground">No products found for <span className="text-foreground font-bold italic">"{searchQuery}"</span></p>
                    <Button variant="link" onClick={() => setSearchQuery("")} className="mt-4 text-primary">Clear search and try again</Button>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Popular Categories</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "Living Room", icon: "🛋️" },
                        { name: "Bedroom", icon: "🛏️" },
                        { name: "Dining", icon: "🍽️" },
                        { name: "Office", icon: "💼" }
                      ].map(cat => (
                        <Button 
                          key={cat.name} 
                          variant="outline" 
                          className="justify-start h-20 text-lg hover:bg-primary/5 hover:border-primary hover:scale-[1.02] transition-all group rounded-2xl"
                          asChild
                        >
                          <Link href={`/shop?category=${cat.name.toLowerCase().replace(" ", "-")}`} onClick={() => setIsSearchOpen(false)}>
                            <span className="mr-3 text-2xl group-hover:scale-125 transition-transform">{cat.icon}</span>
                            {cat.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}
