import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { cn } from "cn"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  {label:"Add Destination", href:"/add-destination"},
  { label: "My Bookings", href: "/my-bookings" },
]

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background">
      <div className="relative flex h-16 items-center justify-end px-4 sm:px-6 md:h-20">
        {/* Left: primary navigation (hidden on mobile) */}
        <nav className="mr-auto hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === "/" ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand",
                link.href === "/"
                  ? "text-brand underline decoration-2 underline-offset-4"
                  : "text-foreground/75"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center: logo (absolutely centered regardless of side widths) */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* Right: account actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 text-sm font-medium text-foreground/75 transition-colors hover:text-brand sm:inline-flex"
          >
            <User className="size-4" />
            Profile
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-foreground/75 transition-colors hover:text-brand"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-foreground/75 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}
