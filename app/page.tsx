/* app/page.tsx (UPDATED) */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SealButton from "@/app/components/sealButton";
import { GUESTS } from "@/app/data/guests";
import { normalizePhone } from "@/app/utils/phone";

export default function HomePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [opening, setOpening] = useState(false);

  const matched = useMemo(() => {
    const p = normalizePhone(phone);
    return GUESTS.find((g) => normalizePhone(g.phone) === p) || null;
  }, [phone]);

  function openCard() {
    if (!phone.trim()) return setErr("Please enter phone number.");
    if (!matched) return setErr("This number is not in the guest list.");
    setErr("");

    setOpening(true);

    setTimeout(() => {
      router.push(`/card?phone=${encodeURIComponent(phone)}`);
    }, 2350);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-envelope text-[color:var(--ink)]">
      {/* ALWAYS show folds/cross on top of photo */}
      <div className="absolute inset-0 envelope-folds" />

      {/* ✅ OPENING overlay: ONLY TOP FLAP MOVES, WHITE REVEALS UNDER IT */}
      {opening && (
        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
          {/* ✅ WHITE BASE (this will reveal) */}
          <div className="absolute inset-0 bg-white" />

          {/* ✅ STATIC envelope body (covers white) */}
          <div className="env-piece env-bottom" />
          <div className="env-piece env-left" />
          <div className="env-piece env-right" />

          {/* ✅ TOP FLAP moves out => white shows */}
          <div className="env-piece env-top" />

          {/* center seal stays */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
       <div className="w-full max-w-xs mt-6">
  <div
    className="
      rounded-2xl
       backdrop-blur-md
      border border-black/25
      shadow-[0_12px_35px_rgba(0,0,0,0.15)]
      px-4 py-3
    "
  >
    <input
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="(e.g. 03025676234)"
      className="
        w-full bg-transparent text-center
        text-base font-medium tracking-wide
        text-[color:var(--ink)]
        placeholder:text-black/45
        outline-none
      "
    />
  </div>

  {err ? (
    <p className="mt-2 text-xs text-red-600/80 text-center">
      {err}
    </p>
  ) : (
    <p className="mt-2 text-[13px] text-gray-600 text-center">
      Please enter the inivited number
    </p>
  )}
</div>


        <div className="mt-10 mb-15">
          <SealButton initials="U & M" onClick={openCard} />
        </div>

        <div className="text-center">
          <p className="envelope-script text-2xl leading-tight text-black/45">
            This invitation is
            <br />
            exclusively for you
          </p>
        </div>
      </div>
    </main>
  );
}
