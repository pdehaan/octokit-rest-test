// HACK: Internally, 11ty uses markdown-it module, so I can abuse the node_modules
// instead of including it as a direct dependency. This is a very bad idea...
// Don't be like me.
const MarkdownIt = require("markdown-it");

module.exports = eleventyConfig => {
  const md = new MarkdownIt();
  eleventyConfig.addFilter("markdown", value => md.render(value));
  // HACK: the `eleventyConfig.DateTime` object seems to be a Luxon instance,
  // so use that hidden gem instead of including Luxon as a dependency.
  eleventyConfig.addFilter("relativeDate", date =>
    eleventyConfig.DateTime.fromJSDate(new Date(date)).toRelative()
  );

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
