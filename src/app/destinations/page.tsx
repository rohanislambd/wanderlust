import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ServerOffIcon } from "lucide-react"
import { playfairDisplay } from "@/lib/fonts"
import DestinationCard, { type Destination } from "../../components/destination-card"

const API_URL = process.env.NEXT_PUBLIC_DESTINATIONS_API ?? "http://localhost:8000/destinations"

/**
 * The backend currently returns a bare array, but tolerate a wrapped
 * response (`{ destinations: [...] }` / `{ data: [...] }`) too.
 */
function toDestinationList(payload: unknown): Destination[] {
  const source = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object"
      ? (payload as { destinations?: unknown; data?: unknown }).destinations ??
        (payload as { data?: unknown }).data
      : undefined

  if (!Array.isArray(source)) return []

  return source.flatMap((item) => {
    if (!item || typeof item !== "object") return []

    const record = item as Record<string, unknown>
    const name = typeof record.name === "string" ? record.name.trim() : ""

    // Skip unusable records instead of rendering a broken card.
    if (!name) return []

    const rawRating = Number(record.rating)
    const price = Number.isFinite(Number(record.price))
      ? String(record.price)
      : "0"

    return [
      {
        id:
          typeof record._id === "string"
            ? record._id
            : typeof record.id === "string"
              ? record.id
              : name.toLowerCase().replace(/\s+/g, "-"),
        name,
        country: typeof record.country === "string" ? record.country : "",
        price,
        duration: typeof record.duration === "string" ? record.duration : "",
        imageUrl:
          typeof record.imageUrl === "string" && record.imageUrl.trim()
            ? record.imageUrl.trim()
            : null,
        rating: Number.isFinite(rawRating) ? rawRating : 4.5,
      } satisfies Destination,
    ]
  })
}

async function getDestinations(): Promise<{
  destinations: Destination[]
  failed: boolean
}> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" })
    if (!res.ok) throw new Error(`API responded with ${res.status}`)

    return { destinations: toDestinationList(await res.json()), failed: false }
  } catch (error) {
    console.error("Failed to load destinations:", error)
    return { destinations: [], failed: true }
  }
}

const AllDestinationPage = async () => {
  const { destinations, failed } = await getDestinations()

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1
          className={`${playfairDisplay.className} text-4xl leading-[1.05] text-foreground md:text-5xl`}
        >
          Explore All Destinations
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <p className="mt-10 text-sm text-muted-foreground">
          Showing {destinations.length} destination
          {destinations.length === 1 ? "" : "s"}
        </p>

        {failed ? (
          <Alert className="mt-6 border-destructive/40">
            <ServerOffIcon />
            <AlertTitle>Couldn&apos;t load destinations</AlertTitle>
            <AlertDescription>
              The travel service at{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                localhost:8000
              </code>{" "}
              didn&apos;t respond. Make sure it&apos;s running, then refresh this
              page.
            </AlertDescription>
          </Alert>
        ) : destinations.length === 0 ? (
          <Alert className="mt-6">
            <AlertTitle>No destinations yet</AlertTitle>
            <AlertDescription>
              Nothing has been listed so far. Add your first travel package to
              see it here.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AllDestinationPage
