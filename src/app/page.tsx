import LoginForm from "@/components/forms/LoginForm"
import SignupForm from "@/components/forms/SignupForm"

export default function Home({
  searchParams,
}: {
  searchParams: { mode?: string }
}) {
  const mode = searchParams.mode || "login"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {mode === "login" && <LoginForm />}
        {mode === "signup" && <SignupForm />}
      </div>
    </div>
  )
}
