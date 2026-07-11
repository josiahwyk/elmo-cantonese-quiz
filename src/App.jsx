import { useEffect } from "react";
import { useGameState } from "./hooks/useGameState";
import { speakEnglish, speakCantonese } from "./utils/speech";
import Mo from "./components/Mo";
import QuestionCard from "./components/QuestionCard";
import AnswerOption from "./components/AnswerOption";
import PrizeLadder from "./components/PrizeLadder";
import Lifeline from "./components/Lifeline";
import WinScreen from "./components/WinScreen";
import GameOverScreen from "./components/GameOverScreen";

export default function App() {
  const {
    currentQuestion,
    shuffledOptions,
    selectedAnswer,
    isCorrect,
    hintUsed,
    hintEliminatedOption,
    firstTryCorrect,
    gamePhase,
    currentQuestionIndex,
    selectAnswer,
    useHint,
    resetGame,
  } = useGameState();

  // Speak the English prompt whenever a new question loads.
  useEffect(() => {
    if (gamePhase === "playing") {
      speakEnglish(currentQuestion.english);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, gamePhase]);

  // Speak the Cantonese answer whenever the player gets it right.
  useEffect(() => {
    if (isCorrect === true) {
      speakCantonese(currentQuestion.correct.characters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect]);

  if (gamePhase === "won") {
    return (
      <div className="min-h-full bg-sky-50">
        <WinScreen firstTryCorrect={firstTryCorrect} onReset={resetGame} />
      </div>
    );
  }

  if (gamePhase === "gameover") {
    return (
      <div className="min-h-full bg-sky-50">
        <GameOverScreen failedQuestion={currentQuestion} onReset={resetGame} />
      </div>
    );
  }

  // --- Playing phase ---

  // Mo's mood follows the answer state.
  let moMood = "idle";
  if (isCorrect === true) moMood = "happy";
  else if (isCorrect === false) moMood = "sad";

  // Mo's speech bubble.
  let speechBubble = null;
  if (isCorrect === true) speechBubble = "Woooo! Mo loves that! 🎉";
  else if (isCorrect === false)
    speechBubble = "Oops! That's okay, you'll get it next time! 💛";
  else if (hintUsed)
    speechBubble = `Mo thinks it starts with ${currentQuestion.hint}! 🤫`;

  const answered = selectedAnswer !== null;

  function optionState(option) {
    if (answered) {
      if (option === currentQuestion.correct) return "correct";
      if (option === selectedAnswer) return "wrong";
      return "default";
    }
    if (hintEliminatedOption === option) return "eliminated";
    return "default";
  }

  return (
    <div className="min-h-full bg-sky-50 flex flex-col lg:flex-row">
      {/* Main game area */}
      <main className="flex-1 flex flex-col items-center gap-6 px-4 py-6 max-w-2xl mx-auto w-full">
        <Mo mood={moMood} speechBubble={speechBubble} />

        <QuestionCard question={currentQuestion} onSpeakEnglish={speakEnglish} />

        <div className="grid grid-cols-2 gap-3 w-full">
          {shuffledOptions.map((option, i) => (
            <AnswerOption
              key={`${currentQuestionIndex}-${i}`}
              option={option}
              state={optionState(option)}
              onSelect={selectAnswer}
              onSpeak={speakCantonese}
              disabled={answered}
            />
          ))}
        </div>

        <Lifeline used={hintUsed} onUse={useHint} />
      </main>

      {/* Prize ladder sidebar */}
      <aside className="lg:w-56 w-full bg-white/60 border-t lg:border-t-0 lg:border-l border-gray-200 px-4 py-6">
        <h3 className="text-center font-bold text-gray-700 mb-3">Prize Ladder</h3>
        <PrizeLadder currentIndex={currentQuestionIndex} />
      </aside>
    </div>
  );
}
