// Confetti — pure-CSS falling confetti overlay. No animation library, no JS
// tick loop. Renders 40 randomised pieces that fall from top to bottom.

const COLORS = ["red", "gold", "blue", "green", "orange", "purple"];
const PIECE_COUNT = 40;

const CONFETTI_STYLES = `
@keyframes confetti-fall {
  0%   { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 1; }
}
`;

// Generated once at module load so pieces don't reshuffle on every render.
const PIECES = Array.from({ length: PIECE_COUNT }, (_, i) => {
  const size = 6 + Math.random() * 6; // 6–12px
  return {
    key: i,
    left: Math.random() * 100, // 0–100%
    delay: Math.random() * 3, // 0–3s
    duration: 2.5 + Math.random() * 2, // fall speed variety
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size,
  };
});

export default function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>{CONFETTI_STYLES}</style>
      {PIECES.map((p) => (
        <span
          key={p.key}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
