"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatDuration } from "@/lib/format-duration"
import { ArrowUpRightIcon, CalendarDaysIcon, MapPinIcon, StarIcon } from "lucide-react"

export type Destination = {
  id: string
  name: string
  country: string
  price: string
  duration: string
  imageUrl: string | null
  rating: number
}

const FALLBACK_IMAGE = "/images/CTA.png"

export default function DestinationCard({
  destination,
}: {
  destination: Destination
}) {
  const [src, setSrc] = React.useState(
    destination.imageUrl?.trim() || FALLBACK_IMAGE
  )

  const handleImageError = () => {
    // Broken/missing remote image (e.g. a video URL) → local fallback.
    setSrc((current) => (current === FALLBACK_IMAGE ? current : FALLBACK_IMAGE))
  }

  return (
    <article className="group flex flex-col">
      {/* Image + rating badge */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
        <Image
          src={src}
          alt={destination.name}
          fill
          // Image URLs come from the backend's free-text "Image URL" field, so
          // they can be any host — `remotePatterns` can't cover that and
          // next/image throws during SSR for unconfigured hosts. The
          // optimizer is bypassed per-image instead of site-wide.
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={handleImageError}
        />
        <Badge
          className="absolute top-3 right-3 h-auto rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-foreground shadow-sm ring-1 ring-black/5 [&>svg]:fill-current"
          aria-label={`Rated ${destination.rating} out of 5`}
        >
          {destination.rating.toFixed(1)}
          <StarIcon />
        </Badge>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPinIcon className="size-4" aria-hidden />
        {destination.country || "—"}
      </div>

      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <h2 className="text-base leading-snug font-semibold">
          {destination.name}
        </h2>
        <p className="shrink-0 font-semibold">
          ${destination.price}
          <span className="text-xs font-normal text-muted-foreground">
            /Person
          </span>
        </p>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <CalendarDaysIcon className="size-4" aria-hidden />
        {formatDuration(destination.duration)}
      </div>

      {/* Detail page lives at /destinations/[id] */}
      <Link
        href={`/destinations/${destination.id}`}
        className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-bold text-brand uppercase transition-colors hover:text-brand-dark hover:underline"
      >
        Book Now
        <ArrowUpRightIcon className="size-3.5" aria-hidden />
      </Link>
    </article>
  )
}
