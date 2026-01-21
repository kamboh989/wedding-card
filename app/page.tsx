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
}, 2800); // animation complete hone ke baad


  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-envelope text-[color:var(--ink)]">
      {/* ALWAYS show folds/cross on top of photo */}
      <div className="absolute inset-0 envelope-folds" />

      {/* OPENING overlay (optional) */}
     {opening && (
  <div className="opening-overlay absolute inset-0 z-50 overflow-hidden pointer-events-none">
    {/* peach -> warm white reveal */}
    <div className="opening-reveal absolute inset-0" />
<div className="env-piece env-top" />
<div className="env-piece env-bottom" />
<div className="env-piece env-left" />
<div className="env-piece env-right" />


    {/* center seal stays */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-24 w-24 rounded-full bg-[#f1eee9] border border-black/10 shadow-[0_24px_55px_rgba(0,0,0,0.22)] grid place-items-center">
        <span className="font-[cursive] text-2xl text-[rgba(120,110,95,.92)]">
          U &amp; M
        </span>
      </div>
    </div>
  </div>
)}



      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
       <div className="w-full max-w-xs mt-6">
  <div
    className="
      rounded-2xl
      bg-white/80 backdrop-blur-md
      border border-black/20
      shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      px-4 py-3
    "
  >
    <input
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="e.g. 0302 567 6234"
      inputMode="numeric"
      className="
        w-full bg-transparent text-center
        text-base font-semibold tracking-wide
        text-[color:var(--ink)]
        placeholder:text-black/45
        outline-none
      "
    />
  </div>

  {err ? (
    <p className="mt-2 text-xs text-red-600/85 text-center">
      {err}
    </p>
  ) : (
    <p className="mt-2 text-[12px] text-black/45 text-center">
      Please enter the invited number
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
