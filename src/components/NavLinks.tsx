"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Projects" },
  { href: "/prices", label: "Цены" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {LINKS.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link href={link.href} className={isActive ? "active" : ""}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}