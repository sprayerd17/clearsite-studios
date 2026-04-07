"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [bottom, setBottom] = useState(24);

  useEffect(() => {
    function measureBanner() {
      const banner = document.getElementById("cookie-banner");
      setBottom(banner ? banner.offsetHeight + 16 : 24);
    }

    measureBanner();

    const observer = new MutationObserver(measureBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5); }
          70% { box-shadow: 0 0 0 12px rgba(124, 58, 237, 0); }
          100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
        }
        .whatsapp-btn {
          animation: whatsapp-pulse 2.5s infinite;
        }
      `}</style>
      <a
        href="https://wa.me/27603979279"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          bottom: `${bottom}px`,
          right: "24px",
          zIndex: 9999,
          transition: "bottom 0.3s ease",
        }}
      >
        <span
          className="whatsapp-btn"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#7c3aed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="#ffffff"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.25a.75.75 0 0 0 .918.919l5.444-1.468A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.98-1.371l-.356-.214-3.697.997.992-3.67-.233-.376A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </span>
      </a>
    </>
  );
}
