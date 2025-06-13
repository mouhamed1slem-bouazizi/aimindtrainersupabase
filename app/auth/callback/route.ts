import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirect = requestUrl.searchParams.get("redirect") || "/"

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user data
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If this is a new user, create a profile
    if (user) {
      const { data: existingProfile } = await supabase.from("user_profiles").select().eq("user_id", user.id).single()

      if (!existingProfile) {
        // Create a new profile
        await supabase.from("user_profiles").insert({
          user_id: user.id,
          full_name: user.user_metadata.full_name || "",
          email: user.email || "",
        })
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(redirect, requestUrl.origin))
}
