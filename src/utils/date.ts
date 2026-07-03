type TimeUnit = "seconds" | "minutes" | "hours";

export function getTimeElapsed(
  timestamp: string,
  unit: TimeUnit = "seconds",
): number {
  const now = new Date();
  const lastUpdated = new Date(timestamp);
  const seconds = (now.getTime() - lastUpdated.getTime()) / 1000;

  if (unit === "seconds") return seconds;
  if (unit === "minutes") return seconds / 60;
  if (unit === "hours") return seconds / 3600;
  return seconds;
}

export function getTimeElapsedBetweenDates(
  timestamp1: string,
  timestamp2: string,
  unit: TimeUnit = "seconds",
): number {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  const seconds = (date2.getTime() - date1.getTime()) / 1000;

  if (unit === "seconds") return seconds;
  if (unit === "minutes") return seconds / 60;
  if (unit === "hours") return seconds / 3600;
  return seconds;
}

export function getFormattedTimeElapsed(timestamp: string): string {
  const seconds = getTimeElapsed(timestamp);

  return formatElapsedTime(seconds);
}

export function formatElapsedTime(totalSeconds: number): string {
  if (totalSeconds < 0) return "Just now";

  // Less than 60 seconds -> show seconds
  if (totalSeconds < 60) {
    return `${Math.floor(totalSeconds)}s ago`;
  }

  // Greater than 60 seconds, less than 60 minutes -> show minutes
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  // Greater than 60 minutes -> show hours
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  // Fallback for days just in case
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
