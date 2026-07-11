// Thin wrappers around the Web Speech API.
// Both helpers cancel any in-progress speech first, and silently no-op when
// speechSynthesis is unavailable (e.g. SSR or unsupported browsers).

function speak(text, lang, rate) {
  if (
    typeof window === "undefined" ||
    !window.speechSynthesis ||
    typeof window.SpeechSynthesisUtterance === "undefined"
  ) {
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Silent fail — never crash the game over audio.
  }
}

export function speakEnglish(word) {
  speak(word, "en-US", 0.85);
}

export function speakCantonese(characters) {
  speak(characters, "zh-HK", 0.8);
}
