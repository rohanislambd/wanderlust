"use client"

import * as React from "react"
import Image from "next/image"

const FALLBACK_IMAGE = "/images/CTA.png"

/**
 * Full-width hero for the destination detail page.
 *
 * Image URLs come from the backend's free-text "Image URL" field, so they can
 * be any host — `remotePatterns` can't cover that and `next/image` throws
 * during SSR for unconfigured hosts, so the optimizer is bypassed per-image.
 */
export default function DestinationHero({
  src,
  alt,
}: {
  src: string | null
  alt: string
}) {
  const [currentSrc, setCurrentSrc] = React.useState(
    src?.trim() || FALLBACK_IMAGE
  )

  const handleImageError = () => {
    // Broken/missing remote image → local fallback.
    setCurrentSrc((value) => (value === FALLBACK_IMAGE ? value : FALLBACK_IMAGE))
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted md:aspect-[21/9]">
      <Image
        src={currentSrc}
        alt={alt}
        fill
        unoptimized
        sizes="(min-width: 1200px) 1152px, calc(100vw - 3rem)"
        className="object-cover"
        onError={handleImageError}
        // Above-the-fold hero image → start downloading it in <head>.
        preload
      />
    </div>
  )
}