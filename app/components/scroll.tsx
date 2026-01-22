"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  from?: "left" | "right" | "up";
  delayMs?: number;
  once?: boolean;
  className?: string;
};

export default function RevealOnScroll({
  children,
  from = "up",
  delayMs = 0,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShow(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShow(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const startTranslate =
    from === "left"
      ? "-translate-x-10"
      : from === "right"
      ? "translate-x-10"
      : "translate-y-8";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        "transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        show ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${startTranslate}`,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
