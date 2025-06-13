import dynamic from "next/dynamic"
import { Suspense } from "react"
import Loading from "./loading"

// Prevent static generation
const forceDynamic = "force-dynamic"

// Disable SSR for the home client component
const HomeClient = dynamic(() => import("./home-client"), {
  ssr: false,
  loading: () => <Loading />,
})

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient />
    </Suspense>
  )
}
