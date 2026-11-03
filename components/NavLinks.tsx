"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkItem {
  href: string;
  label: string;
  exact?: boolean; // true = only active on this exact path
}

interface NavLinksProps {
  links: NavLinkItem[];
  label: string; // accessible name for the nav
}

export default function NavLinks({ links, label }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((link) => {
          const isActive =
            link.exact || link.href === "/"
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "font-semibold underline underline-offset-4"
                    : "hover:underline underline-offset-4"
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
