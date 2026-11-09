import { useState } from "react"
import { signInWithPopup } from "firebase/auth"
import { cn } from "cn"
import { FaGoogle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { auth, googleProvider } from "../firebase.js"

export function LoginForm({ className, ...props }) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState("")

  async function SignInWithPop() {
    return signInWithPopup(auth, googleProvider)
  }

  async function handleGoogleSignIn() {
    setIsSigningIn(true)
    setError("")

    try {
      const result = await SignInWithPop()
      console.log("Signed-in user:", result.user)
    } catch (signInError) {
      setError(signInError.message || "Google sign-in failed. Please try again.")
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div
      className={cn("text-white", className)}
      {...props}
    >
      <div className="mb-7 text-center">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Welcome to Automate AI
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to build and manage your AI agents.
        </p>
      </div>
      <Button
        variant="outline"
        type="button"
        className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] hover:text-white"
        onClick={handleGoogleSignIn}
        disabled={isSigningIn}
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        {isSigningIn ? "Connecting to Google..." : "Login with Google"}
      </Button>
      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
