import type React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[#0a1a2f]/80 border-b border-slate-800/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="Mavoid Logo" fill className="object-contain" priority />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#5bbddf] to-[#0055a4] bg-clip-text text-transparent">
            MAVOID
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" active>
            Portfolio
          </NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <Link
          href="/contact"
          className="bg-[#2a9ed9] hover:bg-[#0055a4] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </header>
  )
}

function NavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${active ? "text-white" : "text-slate-300 hover:text-white"}`}
    >
      {children}
    </Link>
  )
}
