"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stars from "@/app/components/stars";
import { GUESTS } from "@/app/data/guests";
import { normalizePhone } from "@/app/utils/phone";
import Scroll from "@/app/components/scroll";

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
      >
        {/* 🎥 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/card.jpg" // fallback image (optional but recommended)
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/v.mp4" type="video/mp4" />
        </video>

        {/* readability overlay (very soft) */}
        <div className="absolute inset-0 bg-white/25" />

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
          <div className="mt-5 px-5 py-4">
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

          {/* footer */}
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
                Amna
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
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mt-5 space-y-6 reveal">
          {/* ✅ Personalized Invitation (IMAGE CARD) */}
          <Scroll from="up">
            <div
              className="
                relative rounded-[15px] overflow-hidden
                border border-black/10
                shadow-[0_25px_70px_rgba(0,0,0,0.18)]
              "
              style={{
                backgroundImage: "url(/card2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* readability overlay */}
              <div className="absolute inset-0" />

              {/* content inside image */}
              <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16 text-center">
                <p className="text-[11px] tracking-[0.35em] uppercase text-[#6b5f58]/70">
                  Personalized Invitation
                </p>

                <h2 className="mt-3 text-2xl sm:text-3xl font-[serif] font-semibold text-[#3a2f2a]">
                  Dear <span className="gold-text">{guest.name}</span>
                </h2>

                <div className="my-4 flex justify-center">
                  <span className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#cbbfae] to-transparent" />
                </div>

                <p className="text-sm text-[#5a4e47]">
                  Invitation:&nbsp;
                  <span className="font-semibold">
                    {guest.withFamily ? "With Family" : `${guest.persons} Persons`}
                  </span>
                </p>

                <p className="mt-2 text-sm text-[#5a4e47]">
                  You are invited to:&nbsp;
                  <span className="font-semibold">
                    {guest.invitedTo.join(", ")}
                  </span>
                </p>
              </div>
            </div>
          </Scroll>

          {/* ✅ Floral Frame Event Cards */}
          <div className="grid gap-5">
            {events.map((e, idx) => (
              <Scroll
                key={e.key}
                from={idx % 2 === 0 ? "left" : "right"}
                delayMs={idx * 80}
              >
                <FrameEventCard
                  title={e.key}
                  date={e.date}
                  time={e.time}
                  venue={e.venue}
                />
              </Scroll>
            ))}
          </div>

          {/* 🌙 Islamic Verse – Image Based */}
          <Scroll from="left">
            <div
              className="
                relative mt-10 rounded-[20px] overflow-hidden
                border border-black/10
                shadow-[0_25px_70px_rgba(0,0,0,0.18)]
              "
              style={{
                backgroundImage: "url(/long.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* soft overlay for readability */}
              <div className="absolute inset-0 bg-white/30" />

              {/* CONTENT */}
              <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16 text-center">
                <p className="text-lg sm:text-xl font-[serif] gold-text leading-relaxed">
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
                </p>

                <div className="my-4 flex justify-center">
                  <span className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#d6c8a5] to-transparent" />
                </div>

                <p className="text-sm sm:text-base text-[#5a4e47] leading-relaxed">
                  ور اُس کی نشانیوں میں سے یہ ہے کہ اُس نے تم ہی میں سے تمہارے لیے
                  جوڑے پیدا کیے تاکہ تم اُن سے سکون حاصل کرو۔
                </p>

                <p className="mt-3 text-xs tracking-wide text-[#6b5f58]/70">
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
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  This joyous union is made possible by the endless prayers, love,
                  and guidance of our parents and elders. We seek your prayers as
                  we begin this sacred journey together.
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-xl bg-[color:var(--gold)]/10" />
                <div className="relative rounded-3xl p-6 text-center">
                  <h3 className="text-lg font-semibold gold-text">
                    Nikah & Celebration
                  </h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    Join us as two hearts unite in faith, love, and commitment,
                    celebrating a bond written by destiny and sealed with prayers.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-white/45 border border-black/5 p-6 text-center soft-shadow">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  May Allah fill our lives with mercy, affection, and peace, and
                  grant us a marriage filled with barakah and love.
                </p>
              </div>
            </div>
          </Scroll>

          {/* ✅ Video Section (Above Location & Map) */}
          <Scroll from="right">
            <div className="rounded-3xl overflow-hidden border border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
              <div className="relative">
                <video
                  className="w-full h-[260px] sm:h-[340px] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/thanks.mp4"
                >
                  <source src="/thanks.mp4" type="video/mp4" />
                </video>

                {/* soft overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                {/* optional text on video */}
                <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                  <div>
                    <p className="text-[11px] tracking-[0.35em] uppercase text-white/80">
                      Venue Preview
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-[serif] font-semibold text-white">
                      Royal Marquee, Lahore
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Scroll>

          {/* Map */}
          <Scroll from="left" delayMs={60}>
            <div className="rounded-3xl overflow-hidden border border-white/25 soft-shadow">
              <iframe
                src={mapEmbed}
                className="w-full h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Scroll>

          {/* Footer */}
          <Scroll from="up" delayMs={80}>
            <div className="pt-2 text-center text-xs text-[color:var(--ink)]/55">
              <p>With love,</p>
              <p className="mt-1 font-semibold">
                Umer <span className="text-[color:var(--ink)]/60">&</span> Amna
              </p>
            </div>
          </Scroll>

          <Scroll from="up" delayMs={100}>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="rounded-2xl bg-white/60 border border-black/5 px-6 py-3 hover:opacity-90"
              >
                Back to Home
              </button>
            </div>
          </Scroll>

          <div className="h-10" />
        </div>
      </div>
    </main>
  );
}
