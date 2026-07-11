// PrizeLadder — vertical 10-level money ladder shown in the sidebar.
// Props:
//   currentIndex: number (0-based index of the active question)

const PRIZES = [
  "$100",
  "$200",
  "$500",
  "$1,000",
  "$2,000",
  "$5,000",
  "$10,000",
  "$50,000",
  "$100,000",
  "$1,000,000",
];

export default function PrizeLadder({ currentIndex }) {
  return (
    <ol className="flex flex-col-reverse gap-1 text-sm">
      {PRIZES.map((amount, i) => {
        const isCurrent = i === currentIndex;
        const isCompleted = i < currentIndex;

        let rowClass = "text-gray-500";
        if (isCurrent) rowClass = "bg-yellow-400 text-gray-900 font-bold";
        else if (isCompleted) rowClass = "text-green-600 font-semibold";

        return (
          <li
            key={amount}
            className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${rowClass}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-5 text-right tabular-nums">{i + 1}</span>
              <span>{amount}</span>
            </span>
            {isCompleted && <span aria-label="completed">✓</span>}
          </li>
        );
      })}
    </ol>
  );
}
