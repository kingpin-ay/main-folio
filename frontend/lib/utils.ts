import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitTextBySentenceAndWordCount(
  text: string,
  wordLimit: number
): string[] {
  // Split the text into sentences using punctuation marks.
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const result: string[] = [];

  let currentChunk = "";
  let currentWordCount = 0;

  for (const sentence of sentences) {
    const sentenceWordCount = sentence.trim().split(/\s+/).length;

    if (currentWordCount + sentenceWordCount <= wordLimit) {
      currentChunk += " " + sentence.trim();
      currentWordCount += sentenceWordCount;
    } else {
      if (currentChunk) {
        result.push(currentChunk.trim());
      }
      currentChunk = sentence.trim();
      currentWordCount = sentenceWordCount;
    }
  }

  if (currentChunk) {
    result.push(currentChunk.trim());
  }

  return result;
}
