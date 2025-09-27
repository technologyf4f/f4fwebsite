"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, CreditCard, Smartphone, Shield, Clock, ArrowLeft, Mail, DollarSign } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("zelle")
  const [transactionId, setTransactionId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleZellePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transactionId.trim()) {
      alert("Please enter your Zelle transaction ID")
      return
    }

    setIsProcessing(true)
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setShowConfirmation(true)
  }

  const handlePayPalPayment = async () => {
    setIsProcessing(true)
    // Simulate PayPal processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setShowConfirmation(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Complete Your Membership
          </h1>
          <p className="text-gray-600 mt-2">Choose your preferred payment method to join Framework for Future</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Lifetime Membership</span>
                  <span className="font-semibold">$30.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Processing Fee</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center py-3 text-lg font-bold bg-gradient-to-r from-green-50 to-emerald-50 px-4 rounded-lg">
                  <span>Total</span>
                  <span className="text-green-600">$30.00</span>
                </div>

                {/* Membership Benefits */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-gray-900">What's Included:</h4>
                  <div className="space-y-2">
                    {[
                      "Lifetime community access",
                      "Leadership training programs",
                      "Networking opportunities",
                      "Exclusive events & workshops",
                      "Mentorship programs",
                      "Career development resources",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to complete your $30 membership payment</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
                  {/* Zelle Option */}
                  <div className="relative">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMethod === "zelle"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="zelle" id="zelle" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">Z</span>
                            </div>
                            <div>
                              <Label htmlFor="zelle" className="text-lg font-semibold cursor-pointer">
                                Pay with Zelle
                              </Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Recommended</Badge>
                                <Badge variant="outline">No Fees</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PayPal Option */}
                  <div className="relative">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMethod === "paypal"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <CreditCard className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <Label htmlFor="paypal" className="text-lg font-semibold cursor-pointer">
                                Pay with PayPal
                              </Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">Credit/Debit Cards</Badge>
                                <Badge variant="outline">PayPal Balance</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {/* Payment Details */}
                <div className="mt-8">
                  {selectedMethod === "zelle" && (
                    <Card className="border-purple-200 bg-purple-50">
                      <CardHeader>
                        <CardTitle className="text-purple-800 flex items-center gap-2">
                          <Smartphone className="h-5 w-5" />
                          Zelle Payment Instructions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-4 space-y-3">
                          <h4 className="font-semibold text-gray-900">Step-by-Step Guide:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                            <li>Open your mobile banking app or Zelle app</li>
                            <li>Select "Send Money" or "Pay with Zelle"</li>
                            <li>
                              Enter recipient email: <strong>executivecommittee@framework4future.org</strong>
                            </li>
                            <li>
                              Enter amount: <strong>$30.00</strong>
                            </li>
                            <li>Add memo: "Membership Registration"</li>
                            <li>Complete the transfer and copy the transaction ID</li>
                          </ol>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white rounded-lg p-3 text-center">
                            <Shield className="h-6 w-6 text-green-500 mx-auto mb-2" />
                            <p className="text-sm font-medium">No Fees</p>
                            <p className="text-xs text-gray-600">100% of your payment goes to membership</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-sm font-medium">Instant Transfer</p>
                            <p className="text-xs text-gray-600">Payment processed immediately</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <CheckCircle className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                            <p className="text-sm font-medium">Bank Network</p>
                            <p className="text-xs text-gray-600">Supported by 100+ banks</p>
                          </div>
                        </div>

                        <form onSubmit={handleZellePayment} className="space-y-4">
                          <div>
                            <Label htmlFor="transactionId" className="text-sm font-medium">
                              Transaction ID <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="transactionId"
                              type="text"
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              placeholder="e.g. 165144524311"
                              className="mt-1"
                              required
                            />
                            <p className="text-xs text-gray-600 mt-1">
                              Enter the transaction ID from your Zelle confirmation
                            </p>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing..." : "Complete Registration"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}

                  {selectedMethod === "paypal" && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-blue-800 flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          PayPal Payment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Secure Payment with PayPal</h4>
                          <p className="text-sm text-gray-700 mb-4">
                            Pay securely with your PayPal account, credit card, or debit card. Your payment information
                            is protected by PayPal's advanced security.
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                              <Shield className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                              <p className="text-sm font-medium">Secure Payment</p>
                              <p className="text-xs text-gray-600">256-bit SSL encryption</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                              <p className="text-sm font-medium">Instant Processing</p>
                              <p className="text-xs text-gray-600">Immediate confirmation</p>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handlePayPalPayment}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing Payment..." : "Pay $30.00 with PayPal"}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 relative">
              {/* Animated Envelope */}
              <div className="relative w-32 h-24 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-lg transform rotate-3 animate-bounce"></div>
                <div className="absolute inset-0 bg-white border-2 border-gray-300 rounded-lg shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-400 to-pink-500 rounded-t-lg flex items-center justify-center transform -rotate-3 animate-pulse">
                    <span className="text-white font-bold text-lg italic">Thank You</span>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-1/2 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome to Framework for Future!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Thank you for becoming a member of Framework4Future. Once your payment has been verified, you will be
              contacted through email with more directions. We are excited to have you as part of our team!
            </p>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <Mail className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-medium">Email Confirmation</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-xs font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-medium">Lifetime Access</p>
              </div>
            </div>

            <Button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Return to Homepage
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
