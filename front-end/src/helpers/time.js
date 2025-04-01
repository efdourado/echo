export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const timeInSeconds = (timeString) => {
  const splitArray = timeString?.split(":") || ["0", "0"];
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);
  return seconds + minutes * 60;
};

export const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};