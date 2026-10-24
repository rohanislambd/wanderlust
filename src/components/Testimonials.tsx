"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { playfairDisplay } from "@/lib/fonts"

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Carousel opts={{ align: "start" }}>
          {/* Heading + carousel controls */}
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2
                className={`${playfairDisplay.className} text-4xl text-foreground md:text-5xl`}
              >
                What Travelers Say
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>

          {/* ml-0 removes the default -ml-4 gutter */}
          <CarouselContent className="ml-0 mt-10">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.name}
                // pl-0 removes the default pl-4 gutter
                className="basis-full pl-0 md:basis-1/2"
              >
                <div
                  className={`flex h-full items-center gap-5 pr-6 ${
                    index !== 0 ? "border-l border-border pl-6" : ""
                  }`}
                >
                  {/* min-w-0 lets the text column shrink and wrap */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">
                    <p className="text-sm leading-relaxed text-foreground capitalize">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="mt-8">
                      <p className="text-sm text-brand">— {testimonial.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={218}
                    height={264}
                    className="h-56 w-40 shrink-0 object-cover md:h-64 md:w-48"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}