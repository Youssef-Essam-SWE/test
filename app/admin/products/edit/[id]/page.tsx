"use client"

import React, { useState, useEffect } from "react"
import { useAdmin } from "@/lib/admin-context"
import { useProducts } from "@/lib/product-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Pencil } from "lucide-react"
import Link from "next/link"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const { isLoggedIn, isLoading: isAdminLoading } = useAdmin()
  const { products, updateProduct } = useProducts()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    featured: false,
    inStock: true
  })

  useEffect(() => {
    if (!isAdminLoading && !isLoggedIn) {
      router.push("/admin/login")
    }
  }, [isLoggedIn, isAdminLoading, router])

  useEffect(() => {
    const product = products.find(p => p.id === id)
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        image: product.image,
        featured: product.featured || false,
        inStock: product.inStock
      })
    }
  }, [id, products])

  if (isAdminLoading || !formData.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      category: formData.category as any
    }

    updateProduct(updatedProduct)
    
    setTimeout(() => {
      setLoading(false)
      router.push("/admin/dashboard")
    }, 800)
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Pencil className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif">Edit Product</CardTitle>
              <p className="text-sm text-muted-foreground">Modify the details of your furniture piece.</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    required 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(val) => setFormData({...formData, category: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="living-room">Living Room</SelectItem>
                      <SelectItem value="bedroom">Bedroom</SelectItem>
                      <SelectItem value="dining">Dining</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  required 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="inStock" 
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="inStock" className="cursor-pointer">In Stock</Label>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? "Updating Product..." : "Update Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
