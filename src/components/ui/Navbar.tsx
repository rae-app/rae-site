"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LucideAppWindow, Menu, X } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center px-8 py-6 bg-white relative">
      <div className="flex items-center">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/icon.svg"
              alt="Rae Logo"
              width={32}
              height={32}
              className="w-8 h-8 invert"
            />
            <span className="text-xl font-bold text-black">Rae</span>
          </div>
        </Link>
      </div>

      {/* Center Links*/}
      <div className="hidden md:flex flex-1 justify-center space-x-8">
        <Link href="/info/about" className="text-gray-600 hover:text-gray-900 font-medium">
          ABOUT
        </Link>
        <Link href="/info/waitlist" className="text-gray-600 hover:text-gray-900 font-medium">
          WAITLIST
        </Link>
        <a href="/info/price" className="text-gray-600 hover:text-gray-900 font-medium">
          PRICING
        </a>
      </div>

      {/* CTA (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-end">
        <Link
          href="/get-started"
          className="flex items-center gap-2 px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
        >
          <LucideAppWindow size={18} />
          Get Started
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden ml-auto text-black">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-50">
          <Link href="/info/about" className="text-gray-600 hover:text-gray-900 font-medium">
            ABOUT
          </Link>
          <Link href="/info/waitlist" className="text-gray-600 hover:text-gray-900 font-medium">
            WAITLIST
          </Link>
          <a href="/info/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
            PRICING
          </a>
          <Link
            href="/get-started"
            className="flex items-center gap-2 px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            <LucideAppWindow size={18} />
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
