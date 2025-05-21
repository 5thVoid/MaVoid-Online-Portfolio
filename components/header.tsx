import type React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <div className="sticky top-0 z-20 px-4 py-6">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo on the left side */}
        <Link href="https://mavoid.com/" className="flex items-center z-20">
          <div className="relative w-20 h-20">
            <Image src="/logo.png" alt="Mavoid Logo" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Floating navbar in the center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <nav className="backdrop-blur-md bg-[#0c1220]/70 px-8 py-3 rounded-full border border-slate-700/20 shadow-lg">
            <div className="flex items-center gap-8">
              <NavLink href="/" active>
                Portfolio
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Get in Touch button on the right side */}
        <Link
          href="https://mavoid.com/contactus"
          className="bg-transparent hover:bg-[#2a9ed9]/10 text-[#5bbddf] border border-[#5bbddf] px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-20"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}

function NavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${active ? "text-[#5bbddf]" : "text-slate-300 hover:text-[#5bbddf]"}`}
    >
      {children}
    </Link>
  )
}
