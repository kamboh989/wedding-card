export default function Loading() {
  return (
    <main className="relative min-h-screen bg-envelope overflow-hidden flex items-center justify-center">
      {/* background lines */}
      <div className="absolute inset-0 envelope-lines" />

      {/* TOP ENVELOPE PANEL */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-[color:var(--peach-2)] origin-top animate-[openTop_1.6s_ease-in-out_forwards]" />

      {/* BOTTOM ENVELOPE PANEL */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[color:var(--peach-3)] origin-bottom animate-[openBottom_1.6s_ease-in-out_forwards]" />

      {/* SEAL */}
      <div className="relative z-10 flex flex-col items-center animate-[sealFade_1.2s_ease-in-out_forwards]">
        <div className="h-20 w-20 rounded-full bg-white/80 border border-black/5 shadow-lg grid place-items-center">
          <span className="font-[cursive] text-lg text-[color:var(--ink)]">
            U & M
          </span>
        </div>

        <p className="mt-4 text-sm tracking-[0.25em] uppercase text-[color:var(--ink)]/70">
          Opening Invitation
        </p>
      </div>

      {/* GOLD DUST */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[color:var(--gold)] opacity-70 animate-[sparkle_1.8s_ease-in-out_infinite]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>
    </main>
  );
}
