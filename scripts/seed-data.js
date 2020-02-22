const fs = require("fs").promises;
const path = require("path");

const lib = require("../lib");

const DATA_DIR = (filename) => path.join(__dirname, "../src/_data", filename);
const PRETTY = process.env.ELEVENTY_ENV === "production" ? 0 : 2;

const since = new Date("2019/12/01");
main("11ty", "eleventy", since, 10);

async function main(owner, repo, since, count=10) {
  const releases = await lib.getReleases(owner, repo, since, count);
  await writeFile("recent_releases.json", releases);

  const latestTag = await lib.latestTag(owner, repo);
  await writeFile("latest_tag.json", latestTag,);

  const recentCommits = await lib.recentCommits(owner, repo, since);
  await writeFile("recent_commits.json", recentCommits);
}

async function writeFile(name, data) {
  const contents = stringify(data);
  await fs.writeFile(DATA_DIR(name), contents);
}

function stringify(value) {
  return JSON.stringify(value, null, PRETTY);
}
