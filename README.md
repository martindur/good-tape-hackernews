# HackerNews App

## About

This is a web app built using Svelte and TailwindCSS, built with Vite.

It's effectively an SPA that consumes data from the HackerNews API on load.
All styling is done via TailwindCSS.
Icons in `src/assets/icons` are converted to css in `tailwind.config.js` making it possible to use classes, e.g. `icon-user` for UI icons.

The app should look like this when running:

![app preview](good-tape-hackernews.png?raw=true)

## Dependencies

`nodejs`
`npm`

## Run locally

Run these commands

```bash
npm install
npm run build
npm run preview
```

Visit `http://localhost:4173` - Vite app is running and should be serving content
