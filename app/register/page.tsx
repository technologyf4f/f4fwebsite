"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  FileText,
  PenLine,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { createMember, updateMemberPayment } from "@/lib/members-api"
import type { Member, RegistrationStep } from "@/lib/types"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [member, setMember] = useState<Member | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Waiver state
  const [waiverAgreed, setWaiverAgreed] = useState(false)
  const [signatureName, setSignatureName] = useState("")
  const [hasSignature, setHasSignature] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

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
      title: "Registration",
      description: "Create your account",
      isComplete: currentStep > 1,
    },
    {
      step: 2,
      title: "Payment",
      description: "Complete membership",
      isComplete: currentStep > 2,
    },
    {
      step: 3,
      title: "Waiver",
      description: "Sign the release form",
      isComplete: currentStep > 3,
    },
    {
      step: 4,
      title: "Confirmation",
      description: "Welcome to the community",
      isComplete: currentStep > 4,
    },
  ]

  // ── Canvas drawing helpers ──────────────────────────────────────────
  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ("touches" in e) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#1e3a5f"
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  useEffect(() => {
    if (currentStep === 3) {
      // Small timeout to let DOM mount
      setTimeout(() => initCanvas(), 50)
    }
  }, [currentStep, initCanvas])

  const startDraw = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    isDrawingRef.current = true
    lastPosRef.current = getPos(e, canvas)
  }, [])

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawingRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const pos = getPos(e, canvas)
    if (lastPosRef.current) {
      ctx.beginPath()
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
    lastPosRef.current = pos
    setHasSignature(true)
  }, [])

  const stopDraw = useCallback(() => {
    isDrawingRef.current = false
    lastPosRef.current = null
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener("mousedown", startDraw)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDraw)
    canvas.addEventListener("mouseleave", stopDraw)
    canvas.addEventListener("touchstart", startDraw, { passive: false })
    canvas.addEventListener("touchmove", draw, { passive: false })
    canvas.addEventListener("touchend", stopDraw)

    return () => {
      canvas.removeEventListener("mousedown", startDraw)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", stopDraw)
      canvas.removeEventListener("mouseleave", stopDraw)
      canvas.removeEventListener("touchstart", startDraw)
      canvas.removeEventListener("touchmove", draw)
      canvas.removeEventListener("touchend", stopDraw)
    }
  }, [startDraw, draw, stopDraw])

  const clearSignature = () => {
    initCanvas()
    setHasSignature(false)
  }

  // ── Step handlers ───────────────────────────────────────────────────
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setCurrentStep(3)
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
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setCurrentStep(3)
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

  const handleWaiverSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!waiverAgreed) {
      alert("Please read and agree to the waiver before continuing.")
      return
    }
    if (!signatureName.trim()) {
      alert("Please type your full name.")
      return
    }
    if (!hasSignature) {
      alert("Please provide your electronic signature in the signature box.")
      return
    }
    setCurrentStep(4)
    setShowConfirmation(true)
  }

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Join Framework for Future
            </h1>
            <p className="text-xl text-gray-600 mb-8">Complete your membership registration in 4 simple steps</p>

            {/* Progress Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <Progress value={progressPercentage} className="h-3 mb-6" />
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
                      <p className="font-semibold text-xs md:text-sm">{step.title}</p>
                      <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <Card className="shadow-xl border-0">

            {/* ── Step 1: Registration ── */}
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
                          <p className="text-orange-600">One-time payment &bull; Full access to all features</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-orange-600">$30</div>
                          <Badge className="bg-orange-500 text-white">USD</Badge>
                        </div>
                      </div>
                    </div>

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

            {/* ── Step 2: Payment ── */}
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
                      </RadioGroup>
                    </div>

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
                              <li>Select &quot;Send Money&quot; or &quot;Pay with Zelle&quot;</li>
                              <li>
                                Enter recipient email: <strong>executivecommittee@framework4future.org</strong>
                              </li>
                              <li>
                                Enter amount: <strong>$30.00</strong>
                              </li>
                              <li>Add memo: &quot;Membership Registration&quot;</li>
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
                                    Continue to Waiver
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </>
            )}

            {/* ── Step 3: Waiver ── */}
            {currentStep === 3 && (
              <>
                <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Step 3: Volunteer Waiver &amp; Release Form
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleWaiverSubmit} className="space-y-8">

                    {/* Waiver text */}
                    <div>
                      <p className="text-gray-600 mb-4 text-sm">
                        Please read the full waiver below, then provide your electronic signature at the bottom.
                        Fields marked with <span className="text-red-500">*</span> are required.
                      </p>
                      <ScrollArea className="h-80 rounded-lg border border-amber-200 bg-amber-50">
                        <div className="p-6 text-sm text-gray-800 leading-relaxed space-y-4">
                          <h2 className="text-lg font-bold text-center text-gray-900 uppercase tracking-wide">
                            Waiver and Release Form
                          </h2>
                          <h3 className="text-base font-bold text-center text-gray-900 uppercase">
                            Release of Liability
                          </h3>

                          <p>
                            In return for being allowed to participate in Framework For Future volunteer activities
                            and all related activities, including any activities incidental to such participation
                            (&quot;Volunteer Activities&quot;), the undersigned Volunteer or Parent/Legal Guardian
                            of Volunteer if Volunteer is under age 18 (hereafter referred to using &quot;I&quot;,
                            &quot;me&quot;, or &quot;my&quot;) releases and agrees not to sue the Framework for
                            Future or its officers, directors, employees, sub-contractors, sponsors, agents and
                            affiliates (&quot;the Organization&quot;) from all present and future claims that may
                            be made by me, my family, estate, heirs, or assigns for property damage, personal
                            injury, or wrongful death arising as a result of my participation in the Volunteer
                            Activities wherever, whenever, or however the same may occur.
                          </p>

                          <p>
                            I understand and agree that the Organization are not responsible for any injury or
                            property damage arising out of the Volunteer Activities, even if caused by their
                            ordinary negligence or otherwise.
                          </p>

                          <p>
                            I understand that participation in the Volunteer Activities involves certain risks,
                            including, but not limited to, serious injury and death. I am voluntarily
                            participating in the Volunteer Activities with knowledge of the danger involved and I
                            agree to accept all risks of participation.
                          </p>

                          <p>
                            I also agree to indemnify and hold harmless the Organization for all claims arising
                            out of my participation in the Volunteer Activities.
                          </p>

                          <p>
                            I understand that this document is intended to be as broad and inclusive as permitted
                            by the laws of the state in which the Volunteer Activities take place and agree that
                            if any portion of this Agreement is invalid, the remainder will continue in full
                            legal force and effect.
                          </p>

                          <p>
                            I also acknowledge that the Organization have not arranged and do not carry any
                            insurance of any kind for my benefit or that of Volunteer (if Volunteer is under 18),
                            my parents, guardians, trustees, heirs, executors, administrators, successors and
                            assigns.
                          </p>

                          <p>
                            I represent that, to the best of my knowledge, the Volunteer is in good health and
                            suffers from no physical condition that would make participation in the Volunteer
                            Activities inadvisable.
                          </p>

                          <p>
                            I understand and acknowledge that this is a Release of Liability and a contract
                            between myself and the Organization and I agree to be bound by it.
                          </p>

                          <p>
                            By signing below, I indicate that I have read, understood, and agreed to the terms
                            of this Waiver and Release Form. I further acknowledge that no oral representations,
                            statements, or inducements apart from the foregoing written agreement have been made.
                          </p>
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Agreement checkbox */}
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <input
                        type="checkbox"
                        id="waiverAgreed"
                        checked={waiverAgreed}
                        onChange={(e) => setWaiverAgreed(e.target.checked)}
                        className="mt-1 h-5 w-5 rounded border-gray-300 accent-amber-600 cursor-pointer"
                      />
                      <label htmlFor="waiverAgreed" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                        <span className="font-semibold">I have read and agree</span> to the Waiver and Release
                        Form above. I release and agree not to sue Framework for Future or its officers,
                        directors, employees, sub-contractors, sponsors, agents and affiliates from all present
                        and future claims for property damage, personal injury, or wrongful death arising from
                        my participation in Volunteer Activities. I voluntarily accept all risks of
                        participation.{" "}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>

                    {/* Typed name */}
                    <div className="space-y-2">
                      <Label htmlFor="signatureName" className="text-base font-semibold flex items-center gap-2">
                        <PenLine className="h-4 w-4 text-amber-600" />
                        Full Name (typed) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="signatureName"
                        type="text"
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        placeholder="Type your full legal name"
                        className="h-12 text-base"
                      />
                      <p className="text-xs text-gray-500">
                        Type your full name exactly as it appears on your ID.
                      </p>
                    </div>

                    {/* Electronic signature pad */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold flex items-center gap-2">
                          <PenLine className="h-4 w-4 text-amber-600" />
                          Electronic Signature <span className="text-red-500">*</span>
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearSignature}
                          className="text-gray-500 border-gray-300 hover:text-red-600 hover:border-red-300"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Clear
                        </Button>
                      </div>

                      <div className="relative rounded-xl border-2 border-dashed border-amber-300 bg-white overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          width={800}
                          height={200}
                          className="w-full cursor-crosshair touch-none block"
                          style={{ height: "180px" }}
                        />
                        {!hasSignature && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-gray-400 text-sm select-none">
                              Sign here using your mouse or finger
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-gray-500">
                        Draw your signature in the box above. Use your mouse (click &amp; drag) or touch screen (tap &amp; drag).
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                      >
                        Submit &amp; Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {/* ── Step 4: Confirmation ── */}
            {currentStep === 4 && (
              <>
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Step 4: Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-12 text-center">
                  {/* Animated Success Icon */}
                  <div className="relative mb-8">
                    <div className="mx-auto w-32 h-32 relative">
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="absolute -top-1 -right-3 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                      <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-500"></div>
                      <div className="absolute -bottom-1 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-700"></div>
                      <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                        <CheckCircle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        Welcome to Framework for Future!
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                        Thank you for becoming a member of Framework4Future, {member?.first_name}! Once your payment has
                        been verified, you will be contacted through email with more directions. We are excited to have
                        you as part of our team!
                      </p>
                    </div>

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

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Registration Complete!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Your membership registration and waiver have been successfully completed. You&apos;ll receive a
                confirmation email shortly with next steps and access information.
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
