"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Gift, Star } from "lucide-react"
import { useUser } from "@/context/user-context"

export function SubscriptionSettings() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Current Plan
              </CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            {user?.isPremium ? <Badge className="bg-yellow-500">Premium</Badge> : <Badge variant="outline">Free</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          {user?.isPremium ? (
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Billing cycle</span>
                <span className="font-medium">Monthly</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Next billing date</span>
                <span className="font-medium">July 15, 2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment method</span>
                <span className="font-medium flex items-center">
                  <CreditCard className="h-3 w-3 mr-1" />
                  •••• 4242
                </span>
              </div>

              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="w-full text-destructive">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You're currently on the free plan. Upgrade to Premium for advanced features.
              </p>
              <Button className="w-full">Upgrade to Premium</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Free Plan</CardTitle>
            <CardDescription>Current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">
              $0<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Basic cognitive games</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Limited progress tracking</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Basic AI coaching</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">Premium Plan</CardTitle>
                <CardDescription>Unlock all features</CardDescription>
              </div>
              <Badge className="bg-yellow-500">Best Value</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">
              $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">All cognitive games (30+)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Advanced progress analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Personalized AI coaching</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Custom training plans</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">No ads</span>
              </li>
            </ul>
            <Button className="w-full">Upgrade Now</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Gift className="h-4 w-4 mr-2 text-primary" />
            Redeem Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="Enter promo code" className="flex-1" />
            <Button>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Missing Input component
import { Input } from "@/components/ui/input"
