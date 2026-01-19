"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stars from "@/app/components/stars";
import { GUESTS } from "@/app/data/guests";
import { normalizePhone } from "@/app/utils/phone";

type EventItem = {
  key: string;
  date: string;
  time: string;
  venue: string;
};

export default function CardClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const phone = sp.get("phone") || "";

  const guest = useMemo(() => {
    const p = normalizePhone(phone);
    return GUESTS.find((g) => normalizePhone(g.phone) === p) || null;
  }, [phone]);

  // If invalid guest
  if (!guest) {
    return (
      <main className="min-h-screen bg-envelope relative">
        <div className="absolute inset-0" />
        <Stars />
        <div className="relative z-10 mx-auto max-w-xl px-5 py-12 text-center">
          <h1 className="text-3xl font-semibold text-[color:var(--ink)]">
            Invitation Not Found
          </h1>
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

  const allEvents: EventItem[] = [
    {
      key: "Mehndi",
      date: "Friday • 10 May 2026",
      time: "8:00 PM",
      venue: "Royal Marquee, Lahore",
    },
    {
      key: "Barat",
      date: "Saturday • 11 May 2026",
      time: "9:00 PM",
      venue: "Royal Marquee, Lahore",
    },
    {
      key: "Walima",
      date: "Sunday • 12 May 2026",
      time: "8:30 PM",
      venue: "Royal Marquee, Lahore",
    },
  ];

  const events = allEvents.filter((e) => guest.invitedTo.includes(e.key));

  const FrameEventCard = ({
    title,
    date,
    time,
    venue,
  }: {
    title: string;
    date: string;
    time: string;
    venue: string;
  }) => {
    return (
      <div
        className="
          relative overflow-hidden rounded-[28px]
          border border-black/5
          shadow-[0_18px_60px_rgba(0,0,0,0.10)]
          bg-white
        "
        style={{
          backgroundImage: `url(/card.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* readability overlay (very soft) */}
        <div className="absolute inset-0 bg-white/55" />

        {/* elegant top ribbon */}
        <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-white/90 to-transparent" />

        {/* content */}
        <div className="relative z-10 p-6 sm:p-7 text-center">
          {/* Title */}
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-10 bg-[#b9b2a2]/70" />
            <h3 className="text-xl sm:text-2xl font-semibold tracking-wide text-[#3a2f2a] font-[serif]">
              {title}
            </h3>
            <span className="h-[1px] w-10 bg-[#b9b2a2]/70" />
          </div>

          {/* subtle subtitle */}
          <p className="mt-2 text-xs tracking-[0.35em] uppercase text-[#6b5f58]/70">
            Wedding Festivities
          </p>

          {/* Details box */}
          <div
            className="
              mt-5 rounded-2xl
              bg-white/70 backdrop-blur-sm
              border border-[#d8cbb8]/55
              shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              px-5 py-4
            "
          >
            <div className="space-y-2">
              <p className="text-sm sm:text-[15px] text-[#3a2f2a]">
                <span className="font-semibold text-[#2f2622]">Date:</span>{" "}
                <span className="text-[#5a4e47]">{date}</span>
              </p>

              <p className="text-sm sm:text-[15px] text-[#3a2f2a]">
                <span className="font-semibold text-[#2f2622]">Time:</span>{" "}
                <span className="text-[#5a4e47]">{time}</span>
              </p>

              <p className="text-sm sm:text-[15px] text-[#3a2f2a]">
                <span className="font-semibold text-[#2f2622]">Venue:</span>{" "}
                <span className="text-[#5a4e47]">{venue}</span>
              </p>
            </div>

            {/* divider */}
            <div className="my-4 flex justify-center">
              <span className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#b9b2a2] to-transparent" />
            </div>

            {/* guest tag */}
            <div className="flex justify-center">
              <span
                className="
                  inline-flex items-center rounded-full
                  bg-[#f7f3ee]/90
                  border border-[#d8cbb8]/60
                  px-4 py-1 text-xs
                  text-[#5a4e47]
                "
              >
                Reserved for {guest.name}
              </span>
            </div>
          </div>

          {/* small footer line */}
          <p className="mt-4 text-[11px] tracking-[0.30em] uppercase text-[#6b5f58]/60">
            Please arrive 15 minutes early
          </p>
        </div>
      </div>
    );
  };

  return (
    <main
      className="
        relative min-h-screen
        bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f6f6f6_35%,_#ededed_65%,_#e2e2e2_100%)]
        text-[color:var(--ink)] overflow-hidden
      "
    >
      <div className="absolute inset-0 envelope-lines" />
      <Stars />

      {/* ✅ FULL BLEED VIDEO HEADER */}
      <div className="relative w-full">
        <video
          className="block w-full h-[420px] sm:h-[520px] object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/video.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

        {/* ✅ TEXT CENTERED ON VIDEO */}
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/80 mb-3">
              You Are Cordially Invited
            </p>

            <h1 className="relative inline-block text-3xl sm:text-4xl font-semibold leading-tight">
              <span className="bg-gradient-to-b from-[#f6e6b3] via-[#e6c86a] to-[#cfa33f] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                Umer
              </span>
              <span className="mx-2 text-white/70 font-light">&</span>
              <span className="bg-gradient-to-b from-[#f6e6b3] via-[#e6c86a] to-[#cfa33f] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                Mrs Umer
              </span>

              <span className="absolute -bottom-2 left-1/2 h-[2px] w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#e6c86a] to-transparent opacity-80" />
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/80 italic tracking-wide">
              Together with their families
            </p>

            <div className="mt-3 flex justify-center">
              <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ CONTENT */}
      <div className="relative z-10 mx-auto max-w-2xl px-5 py-12 sm:py-16">
        {/* Personalized card */}
        <div className="mt-10 card-3d">
          <div className="relative rounded-[28px] glass soft-shadow p-2 sm:p-9 overflow-hidden">
            <div className="pointer-events-none absolute -left-1/2 top-[-60%] h-[220%] w-1/2 bg-white/35 blur-2xl opacity-20 animate-[shine_2.4s_ease-in-out_infinite]" />

            <div className="flex items-center justify-between gap-3">
              <div className="p-3">
                <p className="text-xs tracking-[0.25em] uppercase text-[color:var(--ink)]/55">
                  Personalized Invitation
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-black">
                  Dear <span className="gold-text">{guest.name}</span>
                </h2>
              </div>
            </div>

            {/* Main content */}
            <div className="mt-7 space-y-6 reveal">
              <div className="rounded-2xl bg-white/45 border border-black/5 p-4">
                <p className="text-sm text-[color:var(--ink)]/75">
                  Invitation:
                  {guest.withFamily ? (
                    <span className="ml-2 font-semibold">With Family</span>
                  ) : (
                    <span className="ml-2 font-semibold">
                      {guest.persons} Persons
                    </span>
                  )}
                </p>

                <p className="mt-2 text-sm text-[color:var(--ink)]/70">
                  You are invited to:
                  <span className="font-semibold">
                    {" "}
                    {guest.invitedTo.join(", ")}
                  </span>
                </p>
              </div>

              {/* ✅ Floral Frame Event Cards */}
              <div className="grid gap-5">
                {events.map((e) => (
                  <FrameEventCard
                    key={e.key}
                    title={e.key}
                    date={e.date}
                    time={e.time}
                    venue={e.venue}
                  />
                ))}
              </div>

              {/* Islamic + Wedding sections */}
              <div className="mt-10 space-y-6">
                <div className="rounded-3xl bg-white/45 border border-black/5 p-6 text-center soft-shadow">
                  <p className="text-lg font-[serif] gold-text">
                    وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--ink)]/70 leading-relaxed">
                    ور اُس کی نشانیوں میں سے یہ ہے کہ اُس نے تم ہی میں سے تمہارے لیے
                    جوڑے پیدا کیے تاکہ تم اُن سے سکون حاصل کرو۔
                  </p>
                  <p className="mt-2 text-xs text-[color:var(--ink)]/60">
                    — Surah Ar-Rum (30:21)
                  </p>
                </div>

                <div className="flex justify-center py-2">
                  <span className="h-[1px] w-44 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent animate-pulse" />
                </div>

                <div className="rounded-3xl bg-white/45 border border-black/5 p-6 text-center soft-shadow">
                  <h3 className="text-lg font-semibold gold-text">
                    With the Blessings of Our Parents
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--ink)]/70 leading-relaxed">
                    This joyous union is made possible by the endless prayers, love,
                    and guidance of our parents and elders. We seek your prayers as
                    we begin this sacred journey together.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl blur-xl bg-[color:var(--gold)]/10" />
                  <div className="relative rounded-3xl bg-white/50 border border-[color:var(--gold)]/30 p-6 text-center">
                    <h3 className="text-lg font-semibold gold-text">
                      Nikah & Celebration
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--ink)]/70 leading-relaxed">
                      Join us as two hearts unite in faith, love, and commitment,
                      celebrating a bond written by destiny and sealed with prayers.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-white/45 border border-black/5 p-6 text-center soft-shadow">
                  <p className="text-sm text-[color:var(--ink)]/70 italic leading-relaxed">
                    May Allah fill our lives with mercy, affection, and peace, and
                    grant us a marriage filled with barakah and love.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl bg-white/45 border border-black/5 p-5">
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="mt-1 text-sm text-[color:var(--ink)]/70">
                  Royal Marquee, Lahore — Please arrive 15 minutes early.
                </p>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden border border-white/25 soft-shadow">
                <iframe
                  src={mapEmbed}
                  className="w-full h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="h-8" />

              {/* Footer */}
              <div className="pt-2 text-center text-xs text-[color:var(--ink)]/55">
                <p>With love,</p>
                <p className="mt-1 font-semibold">
                  Umer <span className="text-[color:var(--ink)]/60">&</span>{" "}
                  Mrs Umer
                </p>
              </div>

              <div className="h-10" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-2xl bg-white/60 border border-black/5 px-6 py-3 hover:opacity-90"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
