import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GameBenefitsProps {
  benefits: string[]
}

export function GameBenefits({ benefits }: GameBenefitsProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">Benefits</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="bg-primary/20 text-primary rounded-full p-1 mr-2 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
