import dynamic from "next/dynamic"
import { Suspense } from "react"
import Loading from "./loading"

// Disable SSR for the home client component
const HomeClient = dynamic(() => import("./home-client"), {
  ssr: false,
  loading: () => <Loading />,
})

// Prevent static generation
const preventStaticGeneration = "force-dynamic"

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient />
    </Suspense>
  )
}
