"use client";

export default function SealButton({
  initials = "U & M",
  onClick,
  disabled,
}: {
  initials?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Open Invitation"
      className="group relative flex flex-col items-center select-none"
    >
      {/* WRAPPER with fixed width so text never wraps */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* OUTER WAX SEAL */}
        <div
          className="
            relative h-24 w-24 rounded-full
            overflow-hidden
            border border-black/5
            shadow-[0_22px_55px_rgba(40,15,8,.32)]
            transform-gpu
            animate-[sealFloat_2.8s_ease-in-out_infinite]
            group-hover:animate-none
            group-hover:scale-[1.05]
            active:scale-[0.97]
            transition
          "
        >
          {/* Wax gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.55),transparent_45%),radial-gradient(circle_at_70%_85%,rgba(214,178,94,.45),transparent_55%),linear-gradient(135deg,#f7c7b6,#f2b3a3,#f7d7c7,#e9c46a)]" />

          {/* Texture */}
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,.35)_1px,transparent_2px)] [background-size:10px_10px]" />

          {/* Inner ring */}
          <div className="absolute inset-[10px] rounded-full border border-white/45 shadow-inner bg-white/15" />

          {/* Center stamp */}
          <div className="absolute inset-[18px] rounded-full grid place-items-center border border-black/10 bg-white/25 shadow-inner">
            <span className="flex items-center gap-1 whitespace-nowrap font-[cursive] text-[color:var(--ink)]/80 text-xl leading-none">
  {initials}
</span>

          </div>

          {/* Shine */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/2 top-[-40%] h-[200%] w-1/2 bg-white/50 blur-xl opacity-0 group-hover:opacity-100 animate-[shine_1.4s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* OUTER RING – controlled (not too big) */}
        <div
          className="
            pointer-events-none absolute
            inset-0
            rounded-full
            border border-[color:var(--gold)]/35
            animate-[ringPulse_2.2s_ease-in-out_infinite]
          "
        />
      </div>

      {/* LABEL – guaranteed single row */}
      <span className="mt-3 text-lg tracking-wide text-gray-300 whitespace-nowrap">
        Open Invitation
      </span>
    </button>
  );
}
