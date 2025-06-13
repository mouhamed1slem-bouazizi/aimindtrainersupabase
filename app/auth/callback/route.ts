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

    // Check if this is a new user (first sign in with OAuth)
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      // Check if the user already has a profile
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

      // If no profile exists, create one
      if (!profile) {
        // Create user profile
        await supabase.from("profiles").insert({
          id: session.user.id,
          name: session.user.user_metadata.full_name || "",
          email: session.user.email,
          created_at: new Date().toISOString(),
        })

        // Initialize domain scores
        const domains = [
          "Memory",
          "Attention",
          "Processing Speed",
          "Problem Solving",
          "Verbal Fluency",
          "Spatial Reasoning",
          "Executive Function",
        ]

        for (const domain of domains) {
          await supabase.from("domain_scores").insert({
            user_id: session.user.id,
            domain,
            score: 50, // Starting score
            last_updated: new Date().toISOString(),
          })
        }

        // Initialize streak data
        await supabase.from("streaks").insert({
          user_id: session.user.id,
          current_streak: 0,
          longest_streak: 0,
          last_activity: null,
        })
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(redirect, requestUrl.origin))
}
