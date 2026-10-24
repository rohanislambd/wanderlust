import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { playfairDisplay } from "@/lib/fonts"
import { cn } from "cn"

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "date", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "people", label: "People", placeholder: "5-10" },
]

export default function Banner() {
  return (
    <section className="relative isolate flex min-h-[max(600px,calc(100vh_-_5rem))] w-full flex-col overflow-hidden">
      {/* Background image + contrast overlay */}
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/30" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1
          className={`${playfairDisplay.className} text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl`}
        >
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-md bg-linear-to-r from-[#3cc6e3] to-brand px-7 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-md transition hover:brightness-110"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center rounded-md border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition hover:bg-white/20"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar pinned to the bottom of the banner */}
      <div className="relative z-10 w-full border-t border-white/15 bg-white/20 backdrop-blur-md">
        <form className="flex w-full flex-col gap-3 p-4 md:flex-row md:items-stretch md:gap-0 md:p-0">
          {searchFields.map((field, index) => (
            <div
              key={field.id}
              className={cn(
                "flex flex-1 flex-col justify-center gap-1 px-5 py-3",
                index > 0 && "md:border-l md:border-white/25"
              )}
            >
              <label
                htmlFor={field.id}
                className="text-[13px] font-semibold text-white"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>
          ))}
          <button
            type="button"
            className="shrink-0 bg-brand px-12 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#007e97] md:self-stretch"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  )
}
