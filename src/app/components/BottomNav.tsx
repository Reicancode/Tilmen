"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/lessons", label: "Уроки" },
    { href: "/ai", label: "AgAi!" },
    { href: "/profile", label: "Профиль" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-16
                 bg-white border-t border-gray-200
                 flex justify-around items-center
                 z-50"
    >
      {items.map((item) => {
        const active = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-sm font-medium
              ${active ? "text-[var(--primary)]" : "text-gray-500"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
