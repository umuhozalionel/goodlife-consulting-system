"use client"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthGuard } from "@/components/auth-guard"
import { GoogleAuthButton } from "@/components/google-auth-button"
import { MagicLinkForm } from "@/components/magic-link-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TraineeSignupPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "invalid-link":
        return "Invalid magic link. Please request a new one."
      case "expired-link":
        return "Magic link has expired. Please request a new one."
      case "verification-failed":
        return "Verification failed. Please try again."
      default:
        return "An error occurred. Please try again."
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Trainee</CardTitle>
            <CardDescription className="text-center">Sign in to access your training dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{getErrorMessage(error)}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="magic-link" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
                <TabsTrigger value="oauth">Google</TabsTrigger>
              </TabsList>

              <TabsContent value="magic-link" className="space-y-4">
                <MagicLinkForm />
              </TabsContent>

              <TabsContent value="oauth" className="space-y-4">
                <GoogleAuthButton />
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By signing in, you agree to our{" "}
                <a href="/terms" className="underline hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
