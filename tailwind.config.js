const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchComponents, theme }) {
      let iconsDir = path.join(__dirname, "./src/assets/icons");
      let values = {};
      fs.readdirSync(iconsDir).forEach((file) => {
        let name = path.basename(file, ".svg");
        values[name] = { name, fullPath: path.join(iconsDir, file) };
      });
      matchComponents(
        {
          icon: ({ name, fullPath }) => {
            let content = fs
              .readFileSync(fullPath)
              .toString()
              .replace(/\r?\n|\r/g, "");
            return {
              [`--icon-${name}`]: `url('data:image/svg+xml;utf8,${content}')`,
              "-webkit-mask": `var(--icon-${name})`,
              mask: `var(--icon-${name})`,
              "mask-repeat": "no-repeat",
              "background-color": "currentColor",
              "vertical-align": "middle",
              display: "inline-block",
              width: theme("spacing.5"),
              height: theme("spacing.5"),
            };
          },
        },
        { values },
      );
    }),
  ],
};
