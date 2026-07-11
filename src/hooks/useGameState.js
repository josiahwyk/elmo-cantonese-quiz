import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTIONS } from "../data/questions";

const TOTAL_QUESTIONS = QUESTIONS.length;
const ADVANCE_DELAY_MS = 2000;

// Fisher-Yates shuffle — returns a new array, does not mutate the input.
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Build the 4 shuffled options for a given question.
function buildOptions(question) {
  return shuffle([question.correct, ...question.wrong]);
}

export function useGameState() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    buildOptions(QUESTIONS[0])
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintEliminatedOption, setHintEliminatedOption] = useState(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState(() =>
    Array(TOTAL_QUESTIONS).fill(false)
  );
  const [gamePhase, setGamePhase] = useState("playing");

  // Tracks whether the current question has already had a wrong guess, so we
  // only award "first try" credit when the very first pick is correct.
  const attemptedRef = useRef(false);
  const advanceTimerRef = useRef(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Clean up any pending advance timer on unmount.
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const selectAnswer = useCallback(
    (option) => {
      // Ignore clicks while an answer is already being resolved.
      if (selectedAnswer !== null) return;

      const correct = option === currentQuestion.correct;
      setSelectedAnswer(option);
      setIsCorrect(correct);

      if (correct) {
        const wasFirstTry = !attemptedRef.current;
        if (wasFirstTry) {
          setFirstTryCorrect((prev) => {
            const next = [...prev];
            next[currentQuestionIndex] = true;
            return next;
          });
        }

        advanceTimerRef.current = setTimeout(() => {
          const nextIndex = currentQuestionIndex + 1;
          if (nextIndex >= TOTAL_QUESTIONS) {
            setGamePhase("won");
            return;
          }
          // Advance to the next question and reset per-question state.
          attemptedRef.current = false;
          setCurrentQuestionIndex(nextIndex);
          setShuffledOptions(buildOptions(QUESTIONS[nextIndex]));
          setSelectedAnswer(null);
          setIsCorrect(null);
          setHintUsed(false);
          setHintEliminatedOption(null);
        }, ADVANCE_DELAY_MS);
      } else {
        attemptedRef.current = true;
        advanceTimerRef.current = setTimeout(() => {
          setGamePhase("gameover");
        }, ADVANCE_DELAY_MS);
      }
    },
    [selectedAnswer, currentQuestion, currentQuestionIndex]
  );

  const useHint = useCallback(() => {
    if (hintUsed) return;

    // Eliminate one wrong option that is still on the board.
    const wrongOnBoard = shuffledOptions.filter(
      (opt) => opt !== currentQuestion.correct
    );
    if (wrongOnBoard.length === 0) return;

    const toEliminate = wrongOnBoard[Math.floor(Math.random() * wrongOnBoard.length)];
    setHintEliminatedOption(toEliminate);
    setHintUsed(true);
  }, [hintUsed, shuffledOptions, currentQuestion]);

  const resetGame = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    attemptedRef.current = false;
    setCurrentQuestionIndex(0);
    setShuffledOptions(buildOptions(QUESTIONS[0]));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setHintUsed(false);
    setHintEliminatedOption(null);
    setFirstTryCorrect(Array(TOTAL_QUESTIONS).fill(false));
    setGamePhase("playing");
  }, []);

  return {
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
  };
}
