import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { playfairDisplay } from "@/lib/fonts"

export default function CallToAction() {
  return (
    <section className="relative isolate flex min-h-80 w-full items-center justify-center overflow-hidden">
      {/* Background image + contrast overlay */}
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      {/* CTA content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-20 text-center">
        <h2
          className={`${playfairDisplay.className} text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl`}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="group mt-8 inline-flex items-center gap-3 rounded-md bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-foreground uppercase shadow-md transition hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
