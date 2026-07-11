// WinScreen — celebration screen shown when all questions are answered.
// Props:
//   firstTryCorrect: boolean[]
//   onReset: fn

import Confetti from "./Confetti";
import Mo from "./Mo";
import { QUESTIONS } from "../data/questions";

export default function WinScreen({ firstTryCorrect, onReset }) {
  return (
    <div className="relative min-h-full flex flex-col items-center justify-start py-10 px-4 overflow-y-auto">
      <Confetti />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <Mo mood="dancing" speechBubble={null} />

        <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold text-center text-pink-600">
          🎉 You're a Cantonese superstar! Mo is SO proud of you! 🎉
        </h1>

        <div className="mt-8 w-full bg-white rounded-3xl shadow-md p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
            Your Score
          </h2>
          <ul className="flex flex-col gap-2">
            {QUESTIONS.map((q, i) => (
              <li
                key={q.id}
                className="flex items-center justify-between border-b border-gray-100 pb-1.5 last:border-0"
              >
                <span className="font-semibold text-gray-700">{q.english}</span>
                <span className="flex items-center gap-2 text-gray-500">
                  <span>{q.correct.characters}</span>
                  <span>{firstTryCorrect[i] ? "✅" : "❌"}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 text-lg shadow-md transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
