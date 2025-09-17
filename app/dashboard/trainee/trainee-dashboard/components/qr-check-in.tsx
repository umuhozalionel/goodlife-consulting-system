"use client"

import { useEffect, useRef, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, CheckCircle, Camera } from "lucide-react"

interface QRCheckInProps {
  onClose: () => void
}

export function QRCheckIn({ onClose }: QRCheckInProps) {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false,
      )

      scanner.render(
        (decodedText) => {
          setResult(decodedText)
          handleCheckIn(decodedText)
          scanner.clear()
          setScanning(false)
        },
        (error) => {
          // Ignore scanning errors, they're normal
        },
      )

      scannerRef.current = scanner

      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear()
        }
      }
    }
  }, [scanning])

  const handleCheckIn = async (qrData: string) => {
    try {
      // Simulate API call to check in
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - in real app, validate QR data format
      if (qrData.includes("gym-") || qrData.includes("session-")) {
        setSuccess(true)
        setError(null)
      } else {
        throw new Error("Invalid QR code for check-in")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Check-in failed")
      setSuccess(false)
    }
  }

  const startScanning = () => {
    setScanning(true)
    setError(null)
    setResult(null)
    setSuccess(false)
  }

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
    }
    setScanning(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>QR Check-In</CardTitle>
              <CardDescription>Scan the QR code to check in to your session</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!scanning && !success && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <Button onClick={startScanning} className="w-full">
                Start QR Scanner
              </Button>
            </div>
          )}

          {scanning && (
            <div className="space-y-4">
              <div id="qr-reader" className="w-full"></div>
              <Button variant="outline" onClick={stopScanning} className="w-full bg-transparent">
                Stop Scanning
              </Button>
            </div>
          )}

          {success && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Successfully checked in! Your attendance has been recorded.</AlertDescription>
              </Alert>
              <Button onClick={onClose} className="w-full">
                Done
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && !success && !error && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Scanned: {result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
