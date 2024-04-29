<script>
  import userIcon from "./assets/user.svg";
  import clockIcon from "./assets/clock.svg";
  import starIcon from "./assets/star.svg";

  const NEWSHACKER_API_URL = "https://hacker-news.firebaseio.com/v0";
  const TOP_STORIES_URL = `${NEWSHACKER_API_URL}/topstories.json`;
  const STORY_URL = `${NEWSHACKER_API_URL}/item/`;
  const USER_URL = `${NEWSHACKER_API_URL}/user/`;

  let stories = [];

  function generateStoryUrl(id) {
    return `${STORY_URL}${id}.json`;
  }

  function generateUserUrl(id) {
    return `${USER_URL}${id}.json`;
  }

  function randomSelection(count, max) {
    return [...new Array(count)].map(() => Math.floor(Math.random() * max));
  }

  async function fetchStories() {
    const response = await fetch(TOP_STORIES_URL);
    const data = await response.json();

    const indices = randomSelection(10, data.length);
    const selection = indices.map((i) => data[i]);

    stories = selection.map(async (id) => {
      const storyResponse = await fetch(generateStoryUrl(id));
      const storyData = await storyResponse.json();

      const authorResponse = await fetch(generateUserUrl(storyData.by));
      const { karma } = await authorResponse.json();

      return { ...storyData, karma };
    });

    return Promise.all(stories);
  }
</script>

<main class="p-2">
  <h1 class="text-2xl">HackerNews</h1>
  <div class="flex flex-col gap-2">
    {#await fetchStories()}
      Loading stories..
    {:then stories}
      {#each stories as story}
        <div class="flex border rounded-lg p-2 pr-3 shadow-md w-full">
          <div class="flex gap-2">
            <img src={userIcon} alt="user" class="w-10 h-10 text-slate-400" />
            <div class="flex flex-col gap-4">
              <div class="flex gap-2 pt-2">
                <p>{story.by}</p>
                <p>·</p>
                <p class="text-gray-600">
                  <span class="font-semibold">{story.karma}</span>
                  karma
                </p>
              </div>
              <h1 class="font-lg">{story.title}</h1>
              <div class="flex justify-between text-slate-400">
                <div class="flex gap-1">
                  <img src={clockIcon} class="w-6 h-6" alt="clock" />
                  <p>2 hours ago</p>
                </div>
                <div class="flex gap-1">
                  <img src={starIcon} class="w-6 h-6" alt="star" />
                  <p>score: {story.score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/await}
  </div>
</main>
