"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selector =
      ".anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in";

    const timer = setTimeout(() => {
      const els = document.querySelectorAll<Element>(selector);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("anim-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
      );

      els.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
