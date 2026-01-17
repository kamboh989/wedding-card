export default function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* subtle golden sparkle dots */}
      <div className="absolute inset-0 opacity-60">
        {Array.from({ length: 28 }).map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const size = 2 + Math.random() * 3;
          const delay = Math.random() * 2;
          return (
            <span
              key={i}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
              }}
              className="absolute rounded-full bg-[color:var(--gold)]/70 animate-[floaty_3.8s_ease-in-out_infinite]"
            />
          );
        })}
      </div>

      {/* soft glow blobs */}
      <div className="absolute -top-24 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-[-90px] left-[-80px] h-[280px] w-[280px] rounded-full bg-white/18 blur-3xl" />
      <div className="absolute bottom-[-110px] right-[-90px] h-[320px] w-[320px] rounded-full bg-white/16 blur-3xl" />
    </div>
  );
}
