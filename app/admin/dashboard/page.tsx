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
import { useSearchParams, useRouter } from "next/navigation"

export default function AdminDashboard() {
  const { isLoggedIn, isLoading, logout } = useAdmin()
  const { products, deleteProduct } = useProducts()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "dashboard"
  const [activeTab, setActiveTab] = useState(initialTab)

  // Sync tab with URL
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/admin/dashboard?tab=${tab}`)
  }

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
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 ${activeTab === "dashboard" ? "bg-muted" : ""}`}
            onClick={() => handleTabChange("dashboard")}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 ${activeTab === "products" ? "bg-muted" : ""}`}
            onClick={() => handleTabChange("products")}
          >
            <Package className="h-5 w-5" />
            Products
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 ${activeTab === "orders" ? "bg-muted" : ""}`}
            onClick={() => handleTabChange("orders")}
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 ${activeTab === "customers" ? "bg-muted" : ""}`}
            onClick={() => handleTabChange("customers")}
          >
            <Users className="h-5 w-5" />
            Customers
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
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-serif capitalize">{activeTab} Overview</h1>
          {activeTab === "products" && (
            <Button className="gap-2" asChild>
              <Link href="/admin/products/new">
                <Plus className="h-5 w-5" />
                Add Product
              </Link>
            </Button>
          )}
        </div>

        {activeTab === "dashboard" && (
          <>
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

            <Card>
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductTable products={products.slice(0, 5)} onDelete={deleteProduct} />
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "products" && (
          <Card>
            <CardHeader>
              <CardTitle>All Products ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductTable products={products} onDelete={deleteProduct} />
            </CardContent>
          </Card>
        )}

        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "#ORD-7721", customer: "Ahmed Salem", date: "Oct 12, 2023", amount: "$1,299", status: "Delivered" },
                    { id: "#ORD-7722", customer: "Sarah Ali", date: "Oct 14, 2023", amount: "$499", status: "Processing" },
                    { id: "#ORD-7723", customer: "Omar Hassan", date: "Oct 15, 2023", amount: "$899", status: "Shipped" },
                  ].map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">{order.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "customers" && (
          <Card>
            <CardHeader>
              <CardTitle>Customer Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Ahmed Salem", email: "ahmed@example.com", orders: 5 },
                  { name: "Sarah Ali", email: "sarah@example.com", orders: 2 },
                  { name: "Omar Hassan", email: "omar@example.com", orders: 8 },
                ].map((customer, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {customer.name[0]}
                    </div>
                    <div>
                      <p className="font-bold">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs text-muted-foreground">Orders</p>
                      <p className="font-bold">{customer.orders}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function ProductTable({ products, onDelete }: { products: any[], onDelete: (id: string) => void }) {
  return (
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
        {products.map((product) => (
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
                  onClick={() => onDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
