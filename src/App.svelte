<script>
  import { fade } from "svelte/transition";
  import { fetchStories } from "./lib/hackernews_api";
  import { sortStoriesByScore, timestampToPrettyFormat } from "./lib/util";

  let contentLoaded = false;
</script>

<main class="antialiased max-w-screen-lg mx-auto bg-white">
  <div
    class="sticky top-0 z-50 bg-white flex flex-col pt-4 pb-8 px-2 shadow h-[10dvh]"
  >
    <h1 class="text-2xl">HackerNews</h1>
    <h2
      class="text-lg text-end px-2 rounded text-white font-semibold bg-orange-400 tracking-wide"
    >
      10 top stories
    </h2>
  </div>
  {#await fetchStories()}
    <div
      transition:fade
      on:introstart={() => (contentLoaded = false)}
      on:outroend={() => (contentLoaded = true)}
      class="flex flex-col gap-4 md:gap-6 py-4 p-2 shadow-inner h-[90dvh]"
    >
      <div class="w-full flex items-center justify-center bg-white h-full">
        <span class="icon-spinner text-orange-400 w-24 h-24" />
      </div>
    </div>
  {:then stories}
    {#if contentLoaded}
      <div
        transition:fade
        class="flex flex-col gap-4 md:gap-5 py-4 p-2 md:p-4 shadow-inner"
      >
        {#each sortStoriesByScore(stories) as story}
          <a
            href={story.url}
            target="_blank"
            class="flex border rounded-xl p-2 pr-4 md:p-4 md:pr-6 shadow-md hover:shadow-lg hover:bg-slate-100 transition-all duration-100"
          >
            <div class="flex gap-2 w-full">
              <span class="icon-user shrink-0 w-8 h-8 text-slate-400" />
              <div class="flex flex-col gap-7 w-full">
                <div class="flex gap-2 pt-1.5 text-sm">
                  <p>{story.by}</p>
                  <p>·</p>
                  <p class="text-orange-300">
                    <span class="font-semibold">{story.karma}</span>
                    karma
                  </p>
                </div>
                <h1 class="text-lg md:text-xl font-semibold">
                  {story.title}
                </h1>
                <div class="flex justify-between text-slate-400 text-sm">
                  <div class="flex gap-1 items-center">
                    <span class="icon-clock w-6 h-6" />
                    <p>{timestampToPrettyFormat(story.time)}</p>
                  </div>
                  <div class="flex gap-1 items-center text-orange-400">
                    <span class="icon-star w-6 h-6" />
                    <p class="font-semibold flex items-center">
                      {story.score}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  {/await}
</main>
