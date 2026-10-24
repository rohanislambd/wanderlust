import Image from "next/image"
import { playfairDisplay } from "@/lib/fonts"

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-[#EDFCFF] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2
            className={`${playfairDisplay.className} text-4xl text-foreground md:text-5xl`}
          >
            Why Choose Wanderlust.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 md:p-8">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-9"
              />
              <h3
                className={`${playfairDisplay.className} mt-5 text-2xl text-foreground`}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
