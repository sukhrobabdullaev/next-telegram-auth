import { LoginForm } from "@/components/auth/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access the admin dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
