import Link from "next/link"
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckIcon,
  MapPinIcon,
  ServerOffIcon,
  StarIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import BookingCard from "@/components/booking-card"
import DestinationHero from "@/components/destination-hero"
import { playfairDisplay } from "@/lib/fonts"
import { formatDuration } from "@/lib/format-duration"
import EditDestinationDialog from "@/components/EditDestinationDialog"
import DeleteDestination from "@/components/DeleteDestination"
import { IDestination } from "@/types/destination"

const DETAIL_API =
  process.env.NEXT_PUBLIC_DESTINATION_API ?? "http://localhost:8000/destination"

// type DestinationDetail = {
//   id: string
//   name: string
//   country: string
//   category: string
//   price: string
//   duration: string
//   departureDate: string
//   imageUrl: string | null
//   description: string
// }

/** The API doesn't send highlights yet — show a curated set per category. */
const HIGHLIGHTS: Record<string, string[]> = {
  Beach: [
    "Luxury beachfront accommodation",
    "Guided snorkeling and reef tour",
    "Sunset cruise along the coast",
    "Fresh seafood dinners by the shore",
    "Sunrise beach yoga session",
  ],
  City: [
    "Centrally located boutique hotel",
    "Guided old-town walking tour",
    "Skip-the-line entry to landmarks",
    "Local food and market tasting",
    "Free day for independent exploring",
  ],
  Mountain: [
    "Handpicked mountain lodge stays",
    "Scenic cable-car and ridge hikes",
    "Guided sunrise summit trek",
    "Alpine cuisine tasting evening",
    "Free day for photography",
  ],
  Adventure: [
    "Expert local adventure guides",
    "All safety gear and transfers included",
    "White-water rafting and zip-lining",
    "Campfire night under the stars",
    "Airport pickup and drop-off",
  ],
  Cultural: [
    "Family-run guesthouse stays",
    "Heritage sites with a local guide",
    "Traditional cooking and craft workshop",
    "Folk performance evening",
    "Temple etiquette briefing",
  ],
}

const DEFAULT_HIGHLIGHTS = [
  "Handpicked accommodation",
  "Guided highlights of the destination",
  "Local experiences with expert guides",
  "Airport transfers included",
  "Free day for independent exploring",
]

const str = (record: Record<string, unknown>, key: string): string => {
  const value = record[key]
  return typeof value === "string" ? value.trim() : ""
}

function toDestinationDetail(payload: unknown): IDestination | null {
  if (!payload || typeof payload !== "object") return null

  const record = payload as Record<string, unknown>
  const name = str(record, "name")
  // A record without a name is unusable (same rule as the list page).
  if (!name) return null

  return {
    id:
      typeof record._id === "string"
        ? record._id
        : typeof record.id === "string"
          ? record.id
          : name.toLowerCase().replace(/\s+/g, "-"),
    name,
    country: str(record, "country"),
    category: str(record, "category"),
    price: str(record, "price"),
    duration: str(record, "duration"),
    departureDate: str(record, "departureDate"),
    imageUrl: str(record, "imageUrl") || null,
    description: str(record, "description"),
  }
}

async function getDestination(id: string): Promise<IDestination | null> {
  try {
    const res = await fetch(`${DETAIL_API}/${id}`, {
      headers:{
        authorization: 'users logged in'
      }
     
      })
    if (!res.ok) throw new Error(`API responded with ${res.status}`)

    const destination = toDestinationDetail(await res.json())
    if (!destination) throw new Error("Unexpected response shape")

    return destination
  } catch (error) {
    console.error(`Failed to load destination ${id}:`, error)
    return null
  }
}

/**
 * The API has no rating/review fields, so derive stable placeholders from the
 * record — the same destination always renders the same numbers (the list
 * cards do the same thing with a fixed 4.5 default).
 */
function getSocialProof(id: string): { rating: number; reviews: number } {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }

  return {
    rating: 4.5 + (hash % 50) / 100, // 4.50 – 4.99
    reviews: 80 + (hash % 400),
  }
}

const DestinationDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const destination = await getDestination(id)

  const toolbar = (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Link
        href="/destinations"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Back to Destinations
      </Link>

      <div className="flex items-center gap-3">
        {/* Only meaningful once we actually have a record to edit/delete. */}
        {destination && (
          <>
            <EditDestinationDialog destination={destination} />
            <DeleteDestination id={destination.id} />
          </>
        )}
      </div>
    </div>
  )

  if (!destination) {
    return (
      <section className="bg-background py-10">
        <div className="mx-auto max-w-6xl px-6">
          {toolbar}
          <Alert className="mt-6 border-destructive/40">
            <ServerOffIcon />
            <AlertTitle>Couldn&apos;t load this destination</AlertTitle>
            <AlertDescription>
              The travel service at{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                localhost:8000
              </code>{" "}
              didn&apos;t respond with this trip — it may have been removed or
              the link is out of date. Make sure the service is running, then
              refresh the page.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    )
  }

  const { rating, reviews } = getSocialProof(destination.id)
  const highlights = (
    HIGHLIGHTS[destination.category] ?? DEFAULT_HIGHLIGHTS
  ).slice(0, 5)

  return (
    <section className="bg-background py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-6">
        {toolbar}

        {/* `src` handles missing URLs, the hero falls back to local art on load errors. */}
        <div className="mt-6">
          <DestinationHero src={destination.imageUrl} alt={destination.name} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon className="size-4" aria-hidden />
              {destination.country || destination.category || "—"}
            </p>

            <h1
              className={`${playfairDisplay.className} mt-2 text-4xl leading-[1.05] text-foreground md:text-5xl`}
            >
              {destination.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
              <span className="flex items-center gap-1.5">
                <StarIcon
                  className="size-4 fill-emerald-500 text-emerald-500"
                  aria-hidden
                />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({reviews} reviews)
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDaysIcon className="size-4" aria-hidden />
                {formatDuration(destination.duration)}
              </span>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <h2
                  className={`${playfairDisplay.className} text-xl text-foreground`}
                >
                  Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {destination.description ||
                    "No description has been added for this trip yet."}
                </p>
              </section>

              <section>
                <h2
                  className={`${playfairDisplay.className} text-xl text-foreground`}
                >
                  Highlights
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Everything that&apos;s included in this package — hand-picked
                  by our travel designers.
                </p>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <CheckIcon
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Booking sidebar */}
          <BookingCard
            
            departureDate={destination.departureDate}
            destination={destination}
          />
        </div>
      </div>
    </section>
  )
}

export default DestinationDetailPage