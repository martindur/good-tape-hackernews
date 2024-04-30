import { randomSelection } from "./util";

const NEWSHACKER_API_URL = "https://hacker-news.firebaseio.com/v0";
const TOP_STORIES_URL = `${NEWSHACKER_API_URL}/topstories.json`;
const STORY_URL = `${NEWSHACKER_API_URL}/item/`;
const USER_URL = `${NEWSHACKER_API_URL}/user/`;

function generateStoryUrl(id) {
  return `${STORY_URL}${id}.json`;
}

function generateUserUrl(id) {
  return `${USER_URL}${id}.json`;
}

export async function fetchStories() {
  const response = await fetch(TOP_STORIES_URL);
  const data = await response.json();

  const indices = randomSelection(10, data.length);
  const selection = indices.map((i) => data[i]);

  const stories = selection.map(async (id) => {
    const storyResponse = await fetch(generateStoryUrl(id));
    const storyData = await storyResponse.json();

    const authorResponse = await fetch(generateUserUrl(storyData.by));
    const { karma } = await authorResponse.json();

    return { ...storyData, karma };
  });

  return Promise.all(stories);
}
