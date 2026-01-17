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
      className="group relative grid place-items-center select-none"
      aria-label="Open Invitation"
    >
      {/* outer wax */}
      <div className="relative h-20 w-20 rounded-full bg-white/80 shadow-[0_14px_40px_rgba(40,15,8,.22)] border border-black/5">
        {/* inner stamp */}
        <div className="absolute inset-[10px] rounded-full border border-black/10 bg-white/70 grid place-items-center">
          <span className="font-[cursive] text-[color:var(--ink)]/70 text-lg tracking-wide">
            {initials}
          </span>
        </div>

        {/* shine sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute -left-1/2 top-[-40%] h-[180%] w-1/2 bg-white/50 blur-lg opacity-0 group-hover:opacity-100 animate-[shine_1.3s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* hover ring */}
      <div className="absolute -inset-3 rounded-full border border-[color:var(--gold)]/30 opacity-0 group-hover:opacity-100 transition" />

      {/* small hint */}
      <span className="mt-2 text-xs text-[color:var(--ink)]/55">
        Tap to open
      </span>
    </button>
  );
}
