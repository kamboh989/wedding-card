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
    <main className="relative min-h-screen bg-envelope text-[color:var(--ink)]">
      <div className="absolute inset-0 envelope-lines" />
      <Stars />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col px-5 py-10">
        {/* Top public content */}
        <header className="text-center mt-4">
          <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--ink)]/55">
            Wedding Invitation
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold leading-tight">
            <span className="gold-text">Umer</span>{" "}
            <span className="text-[color:var(--ink)]/65">&</span>{" "}
            <span className="gold-text">Mrs Umer</span>
          </h1>

          <p className="mt-3 text-sm text-[color:var(--ink)]/65">
            “Esta invitación es exclusiva para ti”
          </p>

          <div className="mt-4 text-sm text-[color:var(--ink)]/70">
            <div>📅 12 May 2026</div>
            <div className="mt-1">📍 Royal Marquee, Lahore</div>
          </div>
        </header>

        {/* Input on page (no modal/prompt) */}
        <section className="mt-10">
          <div className="glass soft-shadow rounded-3xl p-4 sm:p-5">
            <p className="text-sm font-medium text-[color:var(--ink)]/70 text-center">
              Enter your invited phone number
            </p>

            <div className="mt-3 flex gap-2">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0300 1234567"
                className="w-full rounded-2xl bg-white/55 border border-black/5 px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30"
              />
            </div>

            {err ? (
              <p className="mt-2 text-xs text-red-700/70 text-center">{err}</p>
            ) : (
              <p className="mt-2 text-xs text-[color:var(--ink)]/55 text-center">
                +92 / 92 / 03 formats supported
              </p>
            )}
          </div>
        </section>

        {/* Seal button in middle */}
        <section className="mt-10 flex justify-center">
          <SealButton initials="U & M" onClick={openCard} />
        </section>

        {/* Small footer hint */}
        <footer className="mt-auto pt-10 text-center text-xs text-[color:var(--ink)]/50">
          © {new Date().getFullYear()} Umer & Mrs Umer • All rights reserved
        </footer>
      </div>
    </main>
  );
}
