export function randomSelection(count, max) {
  return [...new Array(count)].map(() => Math.floor(Math.random() * max));
}

export function sortStoriesByScore(stories) {
  return stories.sort((a, b) => (a.score < b.score ? 1 : -1));
}

export function timestampToPrettyFormat(timestamp) {
  const now_seconds = new Date().getTime() / 1000;

  const seconds_passed = Math.abs(now_seconds - timestamp);
  const minutes_passed = seconds_passed / 60;
  const hours_passed = minutes_passed / 60;
  const days_passed = hours_passed / 24;

  if (days_passed >= 1) {
    return `${Math.floor(days_passed)} d ago`;
  }

  if (hours_passed >= 1) {
    return `${Math.floor(hours_passed)} h ago`;
  }

  if (minutes_passed >= 1) {
    return `${Math.floor(minutes_passed)} min ago`;
  }
}
