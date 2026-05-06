"use client"

import { useAdmin } from "@/lib/admin-context"
import { useProducts } from "@/lib/product-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AdminDashboard() {
  const { isLoggedIn, isLoading, logout } = useAdmin()
  const { products, deleteProduct } = useProducts()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/admin/login")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="font-serif text-2xl font-bold hover:text-primary transition-colors">Artisan Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" asChild className="w-full justify-start gap-3 bg-muted">
            <Link href="/admin/dashboard">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start gap-3">
            <Link href="/admin/dashboard">
              <Package className="h-5 w-5" />
              Products
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start gap-3">
            <Link href="/admin/dashboard">
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start gap-3">
            <Link href="/admin/dashboard">
              <Users className="h-5 w-5" />
              Customers
            </Link>
          </Button>
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-serif">Dashboard Overview</h1>
          <Button className="gap-2" asChild>
            <Link href="/admin/products/new">
              <Plus className="h-5 w-5" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Sales", value: "$45,230", icon: ShoppingCart, color: "text-blue-600" },
            { label: "Active Orders", value: "12", icon: Package, color: "text-orange-600" },
            { label: "New Customers", value: "128", icon: Users, color: "text-green-600" },
            { label: "Avg. Order Value", value: "$1,250", icon: LayoutDashboard, color: "text-purple-600" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.slice(0, 8).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category.replace("-", " ")}</TableCell>
                    <TableCell>${product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.inStock ? "In Stock" : "Out of Stock"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/products/edit/${product.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
