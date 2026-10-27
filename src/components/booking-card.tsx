"use client"

import { useState } from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function formatLongDate(isoDate: string): string {
  // `T00:00:00` keeps the date from shifting a day across timezones.
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function BookingCard({
  name,
  price,
  departureDate,
}: {
  name: string
  price: string
  departureDate: string
}) {
  const [date, setDate] = useState(
    ISO_DATE.test(departureDate) ? departureDate : ""
  )

  const handleBook = () => {
    if (!date) {
      toast.error("Pick a departure date to continue.")
      return
    }

    // Booking backend isn't wired up yet — confirm the selection for now.
    toast.success(`${name} reserved for ${formatLongDate(date)}.`)
  }

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-6">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-4xl font-bold text-brand">${price}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">per person</p>

      <div className="mt-5">
        <Label htmlFor="departure-date" className="sr-only">
          Departure date
        </Label>
        <Input
          id="departure-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="h-10"
        />
      </div>

      <Button
        type="button"
        onClick={handleBook}
        className="mt-4 h-11 w-full gap-2 bg-brand text-base font-semibold text-white hover:bg-brand-dark"
      >
        Book Now
        <ArrowRightIcon aria-hidden />
      </Button>

      <ul className="mt-5 space-y-3 border-t border-border pt-5">
        {PERKS.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  )
}