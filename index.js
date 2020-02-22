const lib = require("./lib");

(async () => {
  const owner = "11ty";
  const repo = "eleventy";
  const releases = await lib.getReleases(
    owner,
    repo,
    new Date(2019, 11, 1),
    10
  );

  console.log("Latest release:", releases[0]);

  console.log("Recent releases:");
  for (const release of releases) {
    console.log(
      `[${release.tag_name}] "${release.name}" on ${release.created_at}`
    );
  }

  const latestTag = await lib.latestTag(owner, repo);
  console.log("Latest tag:", latestTag);
})();
