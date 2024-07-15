import { Hints } from "./ActorHints";

export function checkHintsHashMapArraysAreAllEqualInSize(
  hints: Hints
): boolean {
  let prevLanguageArrSize: number | null = null;
  for (const languageKey in hints) {
    const currentLanguageArrSize = hints[languageKey].length;

    if (
      prevLanguageArrSize !== null &&
      currentLanguageArrSize !== prevLanguageArrSize
    ) {
      return false;
    }
    prevLanguageArrSize = currentLanguageArrSize;
  }
  return true;
}

export function checkHintsHashMapContainsNoZeroLengthArrays(
  hints: Hints
): boolean {
  for (const languageKey in hints) {
    let currentLanguageArrSize = hints[languageKey].length;
    if (currentLanguageArrSize === 0) return false;
  }
  return true;
}
