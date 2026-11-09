"use client";

import { useState } from "react";
import Image from "next/image";

interface HamburgerMenuProps {
  links: {
    href: string;
    icon: string;
    alt: string;
    text: string;
  }[];
}

export default function HamburgerMenu({ links }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hamburger-menu">
      <button
        className="hamburger-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className={`hamburger-icon ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isOpen && (
        <nav className="mobile-menu" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} className="mobile-menu-item" href={link.href} target="_blank" rel="noopener noreferrer">
              <Image src={link.icon} alt={link.alt} width={16} height={16} />
              {link.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
