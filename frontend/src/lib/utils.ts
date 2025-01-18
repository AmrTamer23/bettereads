import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectLanguage(text: string): "english" | "arabic" | "mixed" {
  // Regular expression for Arabic characters
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  // Regular expression for English alphabet characters
  const englishRegex = /[a-zA-Z]/;

  const hasArabic = arabicRegex.test(text);
  const hasEnglish = englishRegex.test(text);

  if (hasArabic && hasEnglish) {
    return "mixed";
  } else if (hasArabic) {
    return "arabic";
  } else if (hasEnglish) {
    return "english";
  } else {
    return "mixed"; // or you can return 'unknown' if neither Arabic nor English detected
  }
}
