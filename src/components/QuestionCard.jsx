// QuestionCard — displays the English prompt with a button to replay the audio.
// Props:
//   question: { english: string }
//   onSpeakEnglish: fn

export default function QuestionCard({ question, onSpeakEnglish }) {
  return (
    <div className="bg-white rounded-3xl shadow-md px-6 py-8 flex items-center justify-center gap-3">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        {question.english}
      </h2>
      <button
        type="button"
        aria-label="Play English audio"
        onClick={() => onSpeakEnglish && onSpeakEnglish(question.english)}
        className="text-2xl hover:scale-110 transition-transform"
      >
        🔊
      </button>
    </div>
  );
}
