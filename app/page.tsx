"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Stars from "@/app/components/stars";
import SealButton from "@/app/components/sealButton";
import { GUESTS } from "@/app/data/guests";
import { normalizePhone } from "@/app/utils/phone";

export default function HomePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");

  const matched = useMemo(() => {
    const p = normalizePhone(phone);
    return GUESTS.find((g) => normalizePhone(g.phone) === p) || null;
  }, [phone]);

  function openCard() {
    if (!phone.trim()) return setErr("Please enter phone number.");
    if (!matched) return setErr("This number is not in the guest list.");
    setErr("");
    router.push(`/card?phone=${encodeURIComponent(phone)}`);
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-[#120b08] to-black text-white overflow-hidden">
      {/* subtle lines */}
      <div className="absolute inset-0 envelope-lines opacity-25" />

      {/* stars */}
      <Stars />

      {/* golden cross pattern + shimmer */}
      <div className="bg-golden-cross" />
      <div className="bg-golden-shimmer" />

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col px-5 py-10">
        {/* ===== HEADER ===== */}
        <header className="text-center mt-4">
          <p className="text-xs tracking-[0.35em] uppercase text-white/70">
            Wedding Announcement
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold leading-tight">
            <span className="bg-gradient-to-b from-[#f6e6b3] via-[#e6c86a] to-[#cfa33f] bg-clip-text text-transparent drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
              Umer
            </span>{" "}
            <span className="text-white/50 font-light">&</span>{" "}
            <span className="bg-gradient-to-b from-[#f6e6b3] via-[#e6c86a] to-[#cfa33f] bg-clip-text text-transparent drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
              Mrs Umer
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/70 italic tracking-wide">
            Request the pleasure of your company as we celebrate our union.
          </p>

          {/* divider */}
          <div className="mt-6 flex justify-center">
            <span className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e6c86a]/70 to-transparent" />
          </div>

          <p className="mt-4 text-xs tracking-[0.18em] uppercase text-white/60">
            Private Invitation • Verified Access
          </p>
        </header>

        {/* ===== INPUT SECTION ===== */}
        <section className="mt-12">
          <div className="rounded-3xl p-4 sm:p-5 border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">
            <p className="text-sm font-medium text-white/80 text-center">
              Enter your invited phone number
            </p>

            <div className="mt-4 flex gap-2">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0300 1234567"
                className="w-full rounded-2xl bg-black/30 border border-white/15 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#e6c86a]/40"
              />
            </div>

            {err ? (
              <p className="mt-2 text-xs text-red-300/80 text-center">{err}</p>
            ) : (
              <p className="mt-2 text-xs text-white/60 text-center">
                please ensure the number is correct
              </p>
            )}
          </div>
        </section>

        {/* ===== SEAL BUTTON ===== */}
        <section className="mt-12 flex justify-center">
          <SealButton initials="U & M" onClick={openCard} />
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="mt-auto pt-12 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Umer & Mrs Umer • All rights reserved
        </footer>
      </div>
    </main>
  );
}
