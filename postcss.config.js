const autoprefixer  = require("autoprefixer");
const cssnano       = require("cssnano");
const postcssimport = require("postcss-import");
const purgecss      = require("@fullhuman/postcss-purgecss");
const tailwindcss   = require("tailwindcss");

// Constant flag to indicate whether or not we should build for production.
const PRODUCTION = process.env.NODE_ENV === "production";

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://purgecss.com/extractors.html#creating-an-extractor
const tailwindCssExtractor = content => {
  return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
};

module.exports = ctx => ({
  map:    ctx.options.map,
  parser: ctx.options.parser,

  plugins: [
    // All
    autoprefixer,
    postcssimport,
    tailwindcss,

    // Production
    PRODUCTION && purgecss({
      content: ["./src/**/*.html", "./src/**/*.js"],
      css: ["./src/**/*.css"],
      extractors: [
        {
          extractor: tailwindCssExtractor,
          extensions: ["html", "css", "js"],
        },
      ],
      whitelist: [],
      whitelistPatternsChildren: [],
    }),
    PRODUCTION && cssnano({
      preset: "default",
    }),
  ],
});
