import React from "react";

type Props = {
  href: string;              // e.g. https://wa.me/85620XXXXXXXX
  label?: string;            // button text
  size?: "sm" | "md" | "lg"; // icon + padding
  className?: string;        // override/add styles
};

/**
 * WhatsApp button using official brand SVG placed at /public/whatsapp.svg
 */
export function WhatsAppButton({
  href,
  label = "Chat on WhatsApp",
  size = "md",
  className = "",
}: Props) {
  const sizes =
    size === "sm"
      ? "px-4 py-2 text-sm gap-2"
      : size === "lg"
      ? "px-7 py-3.5 text-base gap-3"
      : "px-6 py-3 text-sm gap-3";

  const iconSizes = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-7 h-7" : "w-6 h-6";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center rounded-full font-medium text-white",
        "bg-gradient-to-r from-teal-400 to-cyan-500",
        "shadow-lg transition hover:scale-[1.03] hover:shadow-xl active:scale-[0.99]",
        sizes,
        className,
      ].join(" ")}
      aria-label="WhatsApp"
    >
      <img src="/whatsapp.svg" className={[iconSizes, "object-contain"].join(" ")} alt="WhatsApp" />
      <span>{label}</span>
    </a>
  );
}

export function WhatsAppFloating({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "fixed bottom-6 right-6 z-50",
        "rounded-full p-4 shadow-2xl",
        "bg-gradient-to-r from-teal-400 to-cyan-500",
        "transition hover:scale-110 active:scale-100",
      ].join(" ")}
      aria-label="WhatsApp"
    >
      <img src="/whatsapp.svg" className="w-7 h-7 object-contain" alt="WhatsApp" />
    </a>
  );
}
