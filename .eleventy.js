module.exports = function(eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Collections
  eleventyConfig.addCollection("blog", function(collection) {
    return collection
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Filters
  eleventyConfig.addFilter("dateFormat", function(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  });

  eleventyConfig.addFilter("dateToISO", function(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split("T")[0];
  });

  // Config
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
