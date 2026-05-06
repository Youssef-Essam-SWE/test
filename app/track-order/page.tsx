"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, Clock, Search, ArrowRight, MapPin } from "lucide-react"

const MOCK_ORDERS: Record<string, any> = {
  "#ORD-7721": {
    status: "Delivered",
    date: "Oct 12, 2023",
    items: "Modern Velvet Sofa",
    address: "123 Nile St, Cairo",
    steps: [
      { status: "Order Placed", date: "Oct 10, 2023", completed: true },
      { status: "Processing", date: "Oct 10, 2023", completed: true },
      { status: "Shipped", date: "Oct 11, 2023", completed: true },
      { status: "Delivered", date: "Oct 12, 2023", completed: true },
    ]
  },
  "#ORD-7722": {
    status: "Processing",
    date: "Oct 14, 2023",
    items: "Minimalist Coffee Table",
    address: "45 Giza Rd, Giza",
    steps: [
      { status: "Order Placed", date: "Oct 14, 2023", completed: true },
      { status: "Processing", date: "Oct 14, 2023", completed: true },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false },
    ]
  },
  "#ORD-7723": {
    status: "Shipped",
    date: "Oct 15, 2023",
    items: "Walnut Bookshelf",
    address: "78 Marina Dr, Alexandria",
    steps: [
      { status: "Order Placed", date: "Oct 13, 2023", completed: true },
      { status: "Processing", date: "Oct 13, 2023", completed: true },
      { status: "Shipped", date: "Oct 15, 2023", completed: true },
      { status: "Delivered", date: "Pending", completed: false },
    ]
  }
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState(false)
  const [searching, setSearching] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)
    setError(false)
    setOrder(null)

    // Simulate network delay
    setTimeout(() => {
      const found = MOCK_ORDERS[orderId.toUpperCase()] || MOCK_ORDERS[orderId]
      if (found) {
        setOrder(found)
      } else {
        setError(true)
      }
      setSearching(false)
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Enter your order number to see the current status of your handcrafted furniture.
            </p>
          </div>

          <Card className="mb-12 shadow-xl border-none overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Enter Order ID (e.g. #ORD-7721)" 
                    className="h-14 pl-12 text-lg bg-background"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-10 text-lg font-bold gap-2" disabled={searching}>
                  {searching ? "Searching..." : "Track Order"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-6 rounded-2xl text-center animate-in fade-in slide-in-from-top-4">
              <p className="text-lg font-bold">Order Not Found</p>
              <p>Please check your order number and try again. Make sure it includes the '#' prefix.</p>
            </div>
          )}

          {order && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <Card className="border-none shadow-lg">
                <CardHeader className="border-b border-border bg-background">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl font-serif">Order {orderId.toUpperCase()}</CardTitle>
                      <p className="text-muted-foreground mt-1">Placed on {order.date}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      {order.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Stepper */}
                  <div className="relative mb-12">
                    <div className="absolute top-5 left-0 w-full h-1 bg-muted"></div>
                    <div className="relative flex justify-between">
                      {order.steps.map((step: any, i: number) => (
                        <div key={i} className="flex flex-col items-center z-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center border-4 border-background transition-colors duration-500 ${
                            step.completed ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            {i === 0 && <Package className="h-5 w-5" />}
                            {i === 1 && <Clock className="h-5 w-5" />}
                            {i === 2 && <Truck className="h-5 w-5" />}
                            {i === 3 && <CheckCircle2 className="h-5 w-5" />}
                          </div>
                          <div className="mt-4 text-center">
                            <p className={`font-bold text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</p>
                            <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Items</h4>
                      <p className="text-xl font-medium">{order.items}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Shipping Address</h4>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <p className="text-lg">{order.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-muted-foreground">Need help with your order?</p>
                <Button variant="link" className="text-primary font-bold">Contact Customer Support</Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
