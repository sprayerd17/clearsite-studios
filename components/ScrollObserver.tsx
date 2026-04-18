"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const selector =
      ".anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in";

    // Delay long enough for ScrollToTop's synchronous scroll to settle before
    // we query element positions. Without this, mid-page elements would be
    // incorrectly treated as already in view.
    const timer = setTimeout(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const els = Array.from(document.querySelectorAll<Element>(selector));

      if (prefersReduced) {
        els.forEach((el) => el.classList.add("anim-visible", "anim-instant"));
        return;
      }

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

      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          // Already visible on load — show instantly, no animation
          el.classList.add("anim-visible", "anim-instant");
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
