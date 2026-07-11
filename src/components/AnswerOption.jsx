// AnswerOption — pure display button for a single Cantonese answer choice.
// No game logic: all behaviour is delegated to the onSelect / onSpeak callbacks.
// Props:
//   option: { characters: string, jyutping: string }
//   state: "default" | "selected" | "correct" | "wrong" | "eliminated"
//   onSelect: fn
//   onSpeak: fn
//   disabled: boolean

const STATE_CLASSES = {
  default: "bg-white border-gray-300 hover:border-blue-400",
  selected: "bg-blue-50 border-blue-500",
  correct: "bg-green-500 border-green-600 text-white",
  wrong: "bg-red-500 border-red-600 text-white",
  eliminated: "bg-gray-100 border-gray-200 opacity-50",
};

export default function AnswerOption({
  option,
  state = "default",
  onSelect,
  onSpeak,
  disabled = false,
}) {
  const isEliminated = state === "eliminated";
  const isDisabled = disabled || isEliminated;

  const jyutpingColor =
    state === "correct" || state === "wrong" ? "text-white/80" : "text-gray-500";

  return (
    <button
      type="button"
      onClick={() => !isDisabled && onSelect && onSelect(option)}
      disabled={isDisabled}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 min-h-[96px] transition-colors ${STATE_CLASSES[state] || STATE_CLASSES.default} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className="text-2xl font-bold leading-tight">{option.characters}</span>
      {option.jyutping && (
        <span className={`text-sm mt-1 ${jyutpingColor}`}>{option.jyutping}</span>
      )}

      {/* Speak icon — stops propagation so it never triggers answer selection. */}
      <span
        role="button"
        tabIndex={-1}
        aria-label="Play pronunciation"
        onClick={(e) => {
          e.stopPropagation();
          if (onSpeak) onSpeak(option.characters);
        }}
        className="absolute top-1.5 right-1.5 text-lg leading-none hover:scale-110 transition-transform"
      >
        🔊
      </span>
    </button>
  );
}
