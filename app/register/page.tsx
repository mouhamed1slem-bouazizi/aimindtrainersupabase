import { Suspense } from "react"
import RegisterForm from "./register-form"
import RegisterSkeleton from "./register-skeleton"

// Prevent static generation
export const dynamic = "force-dynamic"

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterSkeleton />}>
      <RegisterForm />
    </Suspense>
  )
}
