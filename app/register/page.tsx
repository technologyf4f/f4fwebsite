"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  School,
  Lock,
  CreditCard,
  Smartphone,
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Home,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { createMember, updateMemberPayment } from "@/lib/members-api"
import type { Member, RegistrationStep } from "@/lib/types"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [member, setMember] = useState<Member | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Form data
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    grade: "",
    schoolName: "",
    password: "",
    confirmPassword: "",
  })

  const [paymentForm, setPaymentForm] = useState({
    method: "zelle",
    transactionId: "",
  })

  const grades = [
    "6th Grade",
    "7th Grade",
    "8th Grade",
    "9th Grade",
    "10th Grade",
    "11th Grade",
    "12th Grade",
    "College Freshman",
    "College Sophomore",
    "College Junior",
    "College Senior",
    "Graduate Student",
  ]

  const steps: RegistrationStep[] = [
    {
      step: 1,
      title: "Member Registration",
      description: "Create your account",
      isComplete: currentStep > 1,
    },
    {
      step: 2,
      title: "Payment",
      description: "Complete your membership",
      isComplete: currentStep > 2,
    },
    {
      step: 3,
      title: "Confirmation",
      description: "Welcome to the community",
      isComplete: currentStep > 3,
    },
  ]

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !registrationForm.firstName ||
      !registrationForm.lastName ||
      !registrationForm.email ||
      !registrationForm.phone ||
      !registrationForm.grade ||
      !registrationForm.schoolName ||
      !registrationForm.password
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (registrationForm.password !== registrationForm.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createMember({
        firstName: registrationForm.firstName,
        lastName: registrationForm.lastName,
        email: registrationForm.email,
        phone: registrationForm.phone,
        grade: registrationForm.grade,
        schoolName: registrationForm.schoolName,
        password: registrationForm.password,
      })

      if (result.success && result.member) {
        setMember(result.member)
        setCurrentStep(2)
      } else {
        alert(result.error || "Failed to create account. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("An error occurred during registration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentForm.method === "zelle" && !paymentForm.transactionId.trim()) {
      alert("Please enter your Zelle transaction ID")
      return
    }

    if (!member) {
      alert("Member information not found. Please start over.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await updateMemberPayment(
        member.id,
        paymentForm.method,
        paymentForm.method === "zelle" ? paymentForm.transactionId : undefined,
      )

      if (result.success) {
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setCurrentStep(3)
        setShowConfirmation(true)
      } else {
        alert(result.error || "Failed to process payment. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("An error occurred during payment processing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePayPalPayment = async () => {
    if (!member) {
      alert("Member information not found. Please start over.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await updateMemberPayment(member.id, "paypal")

      if (result.success) {
        // Simulate PayPal processing time
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setCurrentStep(3)
        setShowConfirmation(true)
      } else {
        alert(result.error || "Failed to process PayPal payment. Please try again.")
      }
    } catch (error) {
      console.error("PayPal payment error:", error)
      alert("An error occurred during PayPal payment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Join Framework for Future
            </h1>
            <p className="text-xl text-gray-600 mb-8">Complete your membership registration in 3 simple steps</p>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <Progress value={progressPercentage} className="h-3 mb-4" />
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div key={step.step} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                        step.isComplete
                          ? "bg-green-500 text-white"
                          : currentStep === step.step
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.isComplete ? <CheckCircle className="h-5 w-5" /> : step.step}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm">{step.title}</p>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <Card className="shadow-xl border-0">
            {/* Step 1: Registration */}
            {currentStep === 1 && (
              <>
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Step 1: Member Registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-base font-semibold">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="firstName"
                              type="text"
                              value={registrationForm.firstName}
                              onChange={(e) => setRegistrationForm({ ...registrationForm, firstName: e.target.value })}
                              placeholder="e.g. Daisy"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-base font-semibold">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="lastName"
                              type="text"
                              value={registrationForm.lastName}
                              onChange={(e) => setRegistrationForm({ ...registrationForm, lastName: e.target.value })}
                              placeholder="e.g. Smith"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Contact Information
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-base font-semibold">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              value={registrationForm.email}
                              onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                              placeholder="e.g. name@domain.com"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base font-semibold">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              value={registrationForm.phone}
                              onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                              placeholder="e.g. 800-477-1477"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Education Information */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Education Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="grade" className="text-base font-semibold">
                            Grade <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                            <Select
                              value={registrationForm.grade}
                              onValueChange={(value) => setRegistrationForm({ ...registrationForm, grade: value })}
                            >
                              <SelectTrigger className="h-12 pl-10">
                                <SelectValue placeholder="Select Grade" />
                              </SelectTrigger>
                              <SelectContent>
                                {grades.map((grade) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schoolName" className="text-base font-semibold">
                            School Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <School className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="schoolName"
                              type="text"
                              value={registrationForm.schoolName}
                              onChange={(e) => setRegistrationForm({ ...registrationForm, schoolName: e.target.value })}
                              placeholder="e.g. St. Annes Convent School"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Account Security
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-base font-semibold">
                            Password <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="password"
                              type="password"
                              value={registrationForm.password}
                              onChange={(e) => setRegistrationForm({ ...registrationForm, password: e.target.value })}
                              placeholder="Create a password"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-base font-semibold">
                            Confirm Password <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={registrationForm.confirmPassword}
                              onChange={(e) =>
                                setRegistrationForm({ ...registrationForm, confirmPassword: e.target.value })
                              }
                              placeholder="Confirm your password"
                              required
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Membership Info */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-orange-800 text-lg">Lifetime Membership</h4>
                          <p className="text-orange-600">One-time payment • Full access to all features</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-orange-600">$30</div>
                          <Badge className="bg-orange-500 text-white">USD</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                          </div>
                        ) : (
                          <>
                            Continue to Payment
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <>
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <CreditCard className="h-6 w-6" />
                    Step 2: Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-green-800 text-lg">Welcome, {member?.first_name}!</h4>
                          <p className="text-green-600">Complete your $30 lifetime membership payment</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">$30.00</div>
                          <Badge className="bg-green-500 text-white">Lifetime Access</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h3>
                      <RadioGroup
                        value={paymentForm.method}
                        onValueChange={(value) => setPaymentForm({ ...paymentForm, method: value })}
                        className="space-y-4"
                      >
                        {/* Zelle Option */}
                        <div className="relative">
                          <div
                            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                              paymentForm.method === "zelle"
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="zelle" id="zelle" />
                              <div className="flex-1">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">Z</span>
                                  </div>
                                  <div>
                                    <Label htmlFor="zelle" className="text-lg font-semibold cursor-pointer">
                                      Pay with Zelle
                                    </Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge className="bg-green-100 text-green-800">Recommended</Badge>
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
                            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                              paymentForm.method === "paypal"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <div className="flex-1">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <CreditCard className="h-8 w-8 text-white" />
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
                    </div>

                    {/* Payment Details */}
                    {paymentForm.method === "zelle" && (
                      <Card className="border-purple-200 bg-purple-50">
                        <CardHeader>
                          <CardTitle className="text-purple-800 flex items-center gap-2">
                            <Smartphone className="h-5 w-5" />
                            Zelle Payment Instructions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="bg-white rounded-lg p-6 space-y-4">
                            <h4 className="font-semibold text-gray-900">Step-by-Step Guide:</h4>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                              <li>Open your mobile banking app or Zelle app</li>
                              <li>Select "Send Money" or "Pay with Zelle"</li>
                              <li>
                                Enter recipient email: <strong>framework4future@gmail.com</strong>
                              </li>
                              <li>
                                Enter amount: <strong>$30.00</strong>
                              </li>
                              <li>Add memo: "Membership Registration"</li>
                              <li>Complete the transfer and copy the transaction ID</li>
                            </ol>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 text-center">
                              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                              <p className="font-semibold text-gray-900">No Fees</p>
                              <p className="text-sm text-gray-600">100% goes to membership</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                              <p className="font-semibold text-gray-900">Instant Transfer</p>
                              <p className="text-sm text-gray-600">Processed immediately</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                              <p className="font-semibold text-gray-900">Bank Network</p>
                              <p className="text-sm text-gray-600">100+ major banks</p>
                            </div>
                          </div>

                          <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="transactionId" className="text-base font-semibold">
                                Transaction ID <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="transactionId"
                                type="text"
                                value={paymentForm.transactionId}
                                onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                                placeholder="e.g. 165144524311"
                                required
                                className="h-12 text-base"
                              />
                              <p className="text-sm text-gray-600">
                                Enter the transaction ID from your Zelle confirmation
                              </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => setCurrentStep(1)}
                                className="flex-1"
                              >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                              </Button>
                              <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                  </div>
                                ) : (
                                  <>
                                    Complete Registration
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    {paymentForm.method === "paypal" && (
                      <Card className="border-blue-200 bg-blue-50">
                        <CardHeader>
                          <CardTitle className="text-blue-800 flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            PayPal Payment
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="bg-white rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Secure Payment with PayPal</h4>
                            <p className="text-gray-700 mb-4">
                              Pay securely with your PayPal account, credit card, or debit card. Your payment
                              information is protected by PayPal's advanced security.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                <p className="font-semibold text-gray-900">Secure Payment</p>
                                <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="font-semibold text-gray-900">Instant Processing</p>
                                <p className="text-sm text-gray-600">Immediate confirmation</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              size="lg"
                              onClick={() => setCurrentStep(1)}
                              className="flex-1"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Back
                            </Button>
                            <Button
                              onClick={handlePayPalPayment}
                              size="lg"
                              disabled={isSubmitting}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Processing with PayPal...
                                </div>
                              ) : (
                                <>
                                  Pay $30.00 with PayPal
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <>
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Step 3: Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-12 text-center">
                  {/* Animated Success Icon */}
                  <div className="relative mb-8">
                    <div className="mx-auto w-32 h-32 relative">
                      {/* Floating elements */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="absolute -top-1 -right-3 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                      <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-500"></div>
                      <div className="absolute -bottom-1 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-700"></div>

                      {/* Main success circle */}
                      <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                        <CheckCircle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        Welcome to Framework for Future! 🎉
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                        Thank you for becoming a member of Framework4Future, {member?.first_name}! Once your payment has
                        been verified, you will be contacted through email with more directions. We are excited to have
                        you as part of our team!
                      </p>
                    </div>

                    {/* Success Features */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <Mail className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">Email Confirmation</p>
                          <p className="text-sm text-gray-600">Check your inbox soon</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">Secure Payment</p>
                          <p className="text-sm text-gray-600">Your payment is protected</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">Lifetime Access</p>
                          <p className="text-sm text-gray-600">Welcome to the family</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <Link href="/">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Home className="mr-2 h-5 w-5" />
                          Return to Homepage
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog (Alternative display) */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Registration Complete! 🎉
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Your membership registration has been successfully completed. You'll receive a confirmation email
                shortly with next steps and access information.
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
