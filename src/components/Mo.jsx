// Mo — an original fluffy red character rendered as inline SVG.
// Props:
//   mood: "idle" | "happy" | "sad" | "dancing"
//   speechBubble: string | null

const MO_STYLES = `
@keyframes mo-idle {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes mo-happy {
  0%   { transform: translateY(0) scale(1); }
  30%  { transform: translateY(-16px) scale(1.08); }
  60%  { transform: translateY(0) scale(1); }
  80%  { transform: translateY(-8px) scale(1.04); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes mo-dancing {
  0%   { transform: rotate(-8deg) scale(1); }
  25%  { transform: rotate(8deg) scale(1.05); }
  50%  { transform: rotate(-8deg) scale(1); }
  75%  { transform: rotate(8deg) scale(1.05); }
  100% { transform: rotate(-8deg) scale(1); }
}
@keyframes mo-sad {
  0%, 100% { transform: translateY(6px); }
}
.mo-idle    { animation: mo-idle 1.5s ease-in-out infinite; }
.mo-happy   { animation: mo-happy 0.6s ease-in-out 1; }
.mo-dancing { animation: mo-dancing 0.9s ease-in-out infinite; }
.mo-sad     { animation: mo-sad 0.4s ease-in-out forwards; }
`;

const MOOD_CLASS = {
  idle: "mo-idle",
  happy: "mo-happy",
  sad: "mo-sad",
  dancing: "mo-dancing",
};

export default function Mo({ mood = "idle", speechBubble = null }) {
  const moodClass = MOOD_CLASS[mood] || MOOD_CLASS.idle;

  return (
    <div className="flex flex-col items-center select-none">
      <style>{MO_STYLES}</style>

      {speechBubble && (
        <div className="relative mb-3 max-w-[220px]">
          <div className="bg-white rounded-2xl shadow-md px-4 py-2 text-center text-sm font-semibold text-gray-800 border border-gray-200">
            {speechBubble}
          </div>
          {/* Tail pointing down toward Mo */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white",
            }}
          />
        </div>
      )}

      <div className={moodClass}>
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Mo the character"
        >
          {/* Fuzzy arms */}
          <ellipse cx="30" cy="120" rx="16" ry="26" fill="#E8272A" transform="rotate(-25 30 120)" />
          <ellipse cx="170" cy="120" rx="16" ry="26" fill="#E8272A" transform="rotate(25 170 120)" />

          {/* Round fluffy body */}
          <circle cx="100" cy="110" r="72" fill="#E8272A" />

          {/* Eyes (whites) */}
          <ellipse cx="80" cy="92" rx="20" ry="24" fill="#ffffff" />
          <ellipse cx="120" cy="92" rx="20" ry="24" fill="#ffffff" />

          {/* Pupils */}
          <circle cx="83" cy="94" r="9" fill="#1a1a1a" />
          <circle cx="117" cy="94" r="9" fill="#1a1a1a" />
          <circle cx="86" cy="90" r="3" fill="#ffffff" />
          <circle cx="120" cy="90" r="3" fill="#ffffff" />

          {/* Orange oval nose */}
          <ellipse cx="100" cy="118" rx="14" ry="10" fill="#FF8C1A" />

          {/* Big curved smile */}
          <path
            d="M72 132 Q100 162 128 132"
            fill="none"
            stroke="#7a0f10"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
