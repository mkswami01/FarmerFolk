"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-green shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-white">
          Market<span className="text-brand-amber">Folk</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="/#workers"
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            Helpers
          </Link>
          <Link
            href="/#vendors"
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            Vendors
          </Link>
          <Link
            href="/waitlist"
            className="rounded-full bg-brand-amber px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 px-4 pb-4 sm:hidden">
          <Link
            href="/#workers"
            className="block py-2 text-sm font-medium text-white/90"
            onClick={() => setMenuOpen(false)}
          >
            Helpers
          </Link>
          <Link
            href="/#vendors"
            className="block py-2 text-sm font-medium text-white/90"
            onClick={() => setMenuOpen(false)}
          >
            Vendors
          </Link>
          <Link
            href="/waitlist"
            className="mt-2 block rounded-full bg-brand-amber px-4 py-2 text-center text-sm font-semibold text-brand-dark"
            onClick={() => setMenuOpen(false)}
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}
