// GameOverScreen — encouraging screen shown when the player picks a wrong answer.
// Props:
//   failedQuestion: { english: string, correct: { characters, jyutping } }
//   onReset: fn

import Mo from "./Mo";

export default function GameOverScreen({ failedQuestion, onReset }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center py-10 px-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <Mo mood="sad" speechBubble={null} />

        <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold text-center text-gray-800">
          Don't worry! Mo believes in you! Try again? 💪
        </h1>

        {failedQuestion && (
          <div className="mt-6 bg-white rounded-3xl shadow-md p-5 text-center w-full">
            <p className="text-gray-600 mb-2">The answer was:</p>
            <p className="text-lg font-semibold text-gray-800">
              "{failedQuestion.english}" ={" "}
              <span className="text-2xl">{failedQuestion.correct.characters}</span>{" "}
              / {failedQuestion.correct.jyutping}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onReset}
          className="mt-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 text-lg shadow-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
