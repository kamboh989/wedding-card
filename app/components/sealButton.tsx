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
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div
          className="
            relative h-28 w-28 rounded-full overflow-hidden
            shadow-[0_22px_45px_rgba(0,0,0,0.25)]
            border border-black/10
            transform-gpu transition
            active:scale-[0.98]
          "
        >
          {/* wax body */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.92),rgba(245,240,232,.78)_45%,rgba(224,216,204,.95)_78%,rgba(200,190,175,1)_100%)]" />

          {/* inner pressed ring */}
          <div className="absolute inset-[14px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.55),rgba(0,0,0,.06)_70%)] shadow-[inset_0_6px_14px_rgba(0,0,0,.18),inset_0_-6px_12px_rgba(255,255,255,.55)] border border-black/10" />

          {/* center stamp (MAKE IT BIGGER + CLIP TEXT) */}
          <div
            className="
              absolute inset-[22px]
              rounded-full
              grid place-items-center
              overflow-hidden
              bg-[rgba(255,255,255,.10)]
              shadow-[inset_0_5px_12px_rgba(0,0,0,.14),inset_0_-6px_14px_rgba(255,255,255,.55)]
              border border-black/10
              px-1
            "
          >
            <span
              className="
                inline-flex items-center justify-center whitespace-nowrap
                leading-none
                font-[cursive]
                text-[24px]
                tracking-wide
                text-[rgba(120,110,95,.92)]
              "
              style={{
                textShadow:
                  "1px 1px 0 rgba(255,255,255,0.60), -1px -1px 0 rgba(0,0,0,0.08)",
              }}
            >
              {/* split to keep & smaller */}
              <span>U</span>
              <span className="mx-1 text-[20px] text-[rgba(120,110,95,.70)]">
                &
              </span>
              <span>M</span>
            </span>
          </div>

          {/* subtle shine */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/2 top-[-35%] h-[200%] w-1/2 bg-white/55 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </button>
  );
}
