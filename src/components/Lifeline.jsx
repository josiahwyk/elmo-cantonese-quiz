// Lifeline — single "ask for a hint" button.
// Props:
//   used: boolean
//   onUse: fn

export default function Lifeline({ used, onUse }) {
  return (
    <button
      type="button"
      disabled={used}
      onClick={() => !used && onUse && onUse()}
      className={`rounded-full px-5 py-2.5 font-semibold border-2 transition-colors ${
        used
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 cursor-pointer"
      }`}
    >
      {used ? "Hint used" : "💡 Ask Mo for a hint"}
    </button>
  );
}
