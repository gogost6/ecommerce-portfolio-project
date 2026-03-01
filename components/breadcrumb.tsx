"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function formatLabel(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4 px-4">
      <ol className="flex flex-wrap items-center gap-2">
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              {index !== 0 && <span>{">"}</span>}
              {isLast ? (
                <span>{formatLabel(segment)}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-black transition-colors"
                >
                  {formatLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
