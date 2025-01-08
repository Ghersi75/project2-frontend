import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// https://www.geeksforgeeks.org/how-to-format-date-in-typescript/
// Steam api seems to return unix time in seconds
export function formatTime(unix: number): string {
  const locale = 'en-US'
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric"
  }
  const formatter = Intl.DateTimeFormat(locale, options)
  const formattedDate = formatter.format(unix * 1000)

  return formattedDate
}

export function capitalizeFirst(word: string) {
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
}