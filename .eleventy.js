module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
  eleventyConfig.addPassthroughCopy({"src/robots.txt": "robots.txt"});

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
  });

  eleventyConfig.addFilter("dateToISO", function(date) {
    return new Date(date).toISOString().split('T')[0];
  });

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
