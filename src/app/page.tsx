import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default function Home({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  const mode = searchParams.mode || "login";
  return (
    <div className="min-h-screen w-full p-10">
      {mode === "login" && <LoginForm />}
      {mode === "signup" && <SignupForm />}
    </div>
  );
}
