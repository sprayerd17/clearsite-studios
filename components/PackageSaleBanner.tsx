import { packages, whatsappLink } from "@/lib/sale";

/**
 * Sale strip for the individual /packages/* pages, whose body copy still
 * argues from the original full price. Sits directly under the navbar so the
 * reduced price is the first thing a visitor sees.
 */
export default function PackageSaleBanner({ planParam }: { planParam: string }) {
  const pkg = packages.find((p) => p.planParam === planParam);
  if (!pkg) return null;

  return (
    <div
      className="w-full py-4 px-4"
      style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
    >
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-center">
        <p className="text-white text-sm font-bold">
          Closing down —{" "}
          <span className="line-through" style={{ color: "rgba(255,255,255,0.65)" }}>
            {pkg.originalPrice}
          </span>{" "}
          now {pkg.salePrice} once-off.
        </p>
        <a
          href={whatsappLink(
            `Hi Divan, I saw the ClearSite closing-down sale and I'm interested in the ${pkg.planParam} package.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold underline underline-offset-4 text-white hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          WhatsApp me →
        </a>
      </div>
    </div>
  );
}
