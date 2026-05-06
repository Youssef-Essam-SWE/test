"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck } from "lucide-react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shippingCost = total > 500 ? 0 : 50
  const finalTotal = total + shippingCost

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0")
    
    // In a real app, you would send data to backend here
    
    clearCart()
    router.push(`/checkout/success?orderId=${orderNumber}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-4xl font-bold mb-8 text-center">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Shipping & Payment */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+20 123 456 7890" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Input id="address" placeholder="Street name, Building No, Apartment" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Cairo" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" placeholder="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="cash" className="space-y-4">
                    <div className="flex items-center space-x-3 space-y-0 p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <span className="font-semibold block">Cash on Delivery</span>
                        <span className="text-sm text-muted-foreground">Pay when your furniture arrives at your door.</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0 p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <span className="font-semibold block">Credit / Debit Card</span>
                        <span className="text-sm text-muted-foreground">Secure payment via Stripe.</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-[300px] overflow-auto space-y-4 pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg mt-6" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Order"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By clicking Confirm Order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
