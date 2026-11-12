import { useState } from "react"
import { signInWithPopup } from "firebase/auth"
import { cn } from "cn"
import { FaGoogle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { auth, googleProvider } from "../firebase.js"
import { login } from "../features/auth.js"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice.js"

export function LoginForm({ className, ...props }) {
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const handleGoogleLogin = async () => {
    try {
      setError("")
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      const data = await login(token)
      console.log(data)
      dispatch(setUserData(data))
    } catch (error) {
      console.error(error)
      setError(
        error?.response?.data?.error ||
          error?.message ||
          "Unable to sign in with Google."
      )
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
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Login with Google
      </Button>
      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
