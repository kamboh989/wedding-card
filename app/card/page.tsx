"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stars from "@/app/components/stars";
import { GUESTS } from "@/app/data/guests";
import { normalizePhone } from "@/app/utils/phone";

export default function CardPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const phone = sp.get("phone") || "";
  const [loading, setLoading] = useState(false);

  const guest = useMemo(() => {
    const p = normalizePhone(phone);
    return GUESTS.find((g) => normalizePhone(g.phone) === p) || null;
  }, [phone]);

  // If invalid, send back
  if (!guest) {
    return (
      <main className="min-h-screen bg-envelope relative">
        <div className="absolute inset-0 envelope-lines" />
        <Stars />
        <div className="relative z-10 mx-auto max-w-xl px-5 py-12 text-center">
          <h1 className="text-3xl font-semibold text-[color:var(--ink)]">Invitation Not Found</h1>
          <p className="mt-2 text-[color:var(--ink)]/65">
            Please go back and enter a valid invited phone number.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-2xl bg-white/70 px-5 py-3 border border-black/5 hover:opacity-90"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  const mapEmbed =
    "https://www.google.com/maps?q=Royal%20Marquee%20Lahore&output=embed";

  const events = [
    { key: "Mehndi", date: "Friday • 10 May 2026", time: "8:00 PM", venue: "Royal Marquee, Lahore" },
    { key: "Barat", date: "Saturday • 11 May 2026", time: "9:00 PM", venue: "Royal Marquee, Lahore" },
    { key: "Walima", date: "Sunday • 12 May 2026", time: "8:30 PM", venue: "Royal Marquee, Lahore" },
  ].filter((e) => guest.invitedTo.includes(e.key));

  function simulateReveal() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  }

  return (
    <main className="relative min-h-screen bg-envelope text-[color:var(--ink)]">
      <div className="absolute inset-0 envelope-lines" />
      <Stars />

      <div className="relative z-10 mx-auto max-w-2xl px-5 py-10">
        {/* Top video (put hero.mp4 in /public) */}
        <div className="rounded-3xl overflow-hidden soft-shadow border border-white/25">
          <div className="relative bg-black/10">
            <video
              className="w-full h-[240px] sm:h-[320px] object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="/set.mp4
"
            />
           {/* Overlay gradient */}
<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

{/* Content */}
<div className="absolute bottom-6 left-4 right-4 text-center">
  {/* small intro */}
  <p className="text-[11px] tracking-[0.35em] uppercase text-white/80 mb-2">
    You Are Cordially Invited
  </p>

  {/* Names */}
  <h1 className="relative inline-block text-3xl sm:text-4xl font-semibold leading-tight">
    <span className="bg-gradient-to-b from-[#f6e6b3] via-[#e6c86a] to-[#cfa33f] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
      Umer
    </span>

    <span className="mx-2 text-white/70 font-light">&</span>

    <span className="bg-gradient-to-b from-[#f6e6b3] via-[#e6c86a] to-[#cfa33f] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
      Mrs Umer
    </span>

    {/* underline glow */}
    <span className="absolute -bottom-2 left-1/2 h-[2px] w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#e6c86a] to-transparent opacity-80" />
  </h1>

  {/* subtitle */}
  <p className="mt-4 text-sm sm:text-base text-white/80 italic tracking-wide">
    Together with their families
  </p>

  {/* divider */}
  <div className="mt-3 flex justify-center">
    <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
</div>

</div>
        </div>

        {/* Personalized card */}
        <div className="mt-8 card-3d">
          <div className="relative rounded-[28px] glass soft-shadow p-5 sm:p-7 overflow-hidden">
            {/* subtle shine */}
            <div className="pointer-events-none absolute -left-1/2 top-[-60%] h-[220%] w-1/2 bg-white/35 blur-2xl opacity-20 animate-[shine_2.4s_ease-in-out_infinite]" />

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[color:var(--ink)]/55">
                  Personalized Invitation
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
                  Dear <span className="gold-text">{guest.name}</span>
                </h2>
              </div>

              <button
                onClick={simulateReveal}
                className="rounded-2xl bg-white/60 border border-black/5 px-4 py-2 text-sm hover:opacity-90"
              >
                3D Reveal
              </button>
            </div>

            {loading ? (
              <div className="mt-6 rounded-2xl bg-white/40 border border-black/5 p-4 text-center reveal">
                <p className="text-sm text-[color:var(--ink)]/70">Unsealing your invitation…</p>
                <div className="mt-3 h-2 w-full rounded-full bg-white/40 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-[color:var(--gold)]/60 animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-4 reveal">
                <div className="rounded-2xl bg-white/45 border border-black/5 p-4">
                  <p className="text-sm text-[color:var(--ink)]/75">
                    Seats Reserved:
                    <span className="font-semibold"> {guest.persons}</span>
                    {guest.withFamily ? (
                      <span className="ml-2 text-[color:var(--ink)]/65">• With Family</span>
                    ) : (
                      <span className="ml-2 text-[color:var(--ink)]/65">• Guests</span>
                    )}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--ink)]/70">
                    You are invited to:
                    <span className="font-semibold"> {guest.invitedTo.join(", ")}</span>
                  </p>
                </div>

                <div className="grid gap-3">
                  {events.map((e) => (
                    <div key={e.key} className="rounded-2xl bg-white/40 border border-black/5 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold gold-text">{e.key}</h3>
                          <p className="text-sm text-[color:var(--ink)]/70">{e.date}</p>
                          <p className="text-sm text-[color:var(--ink)]/70">{e.time}</p>
                          <p className="text-sm text-[color:var(--ink)]/70">{e.venue}</p>
                        </div>
                        <span className="inline-flex rounded-full border border-[color:var(--gold)]/30 bg-white/35 px-3 py-1 text-xs text-[color:var(--ink)]/70">
                          VIP Card
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Location content */}
                <div className="rounded-2xl bg-white/45 border border-black/5 p-4">
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="mt-1 text-sm text-[color:var(--ink)]/70">
                    Royal Marquee, Lahore — Please arrive 15 minutes early.
                  </p>
                </div>

                {/* Real map embed */}
                <div className="rounded-3xl overflow-hidden border border-white/25 soft-shadow">
                  <iframe
                    src={mapEmbed}
                    className="w-full h-[260px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Footer */}
                <div className="pt-4 text-center text-xs text-[color:var(--ink)]/55">
                  <p>With love,</p>
                  <p className="mt-1 font-semibold">
                    Umer <span className="text-[color:var(--ink)]/60">&</span> Mrs Umer
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-2xl bg-white/60 border border-black/5 px-5 py-3 hover:opacity-90"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
