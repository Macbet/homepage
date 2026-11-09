"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HamburgerMenuProps {
  links: {
    href: string;
    icon: string;
    text: string;
  }[];
}

export default function HamburgerMenu({ links }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isOpen]);

  return (
    <div className="hamburger-menu" ref={rootRef}>
      <button
        className="hamburger-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className={`hamburger-icon ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isOpen && (
        <nav className="mobile-menu" id="mobile-menu" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} className="mobile-menu-item" href={link.href} onClick={() => setIsOpen(false)}>
              <Image src={link.icon} alt="" width={16} height={16} />
              {link.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
