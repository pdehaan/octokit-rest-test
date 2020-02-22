const pkg = require("./package.json");
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  userAgent: `${pkg.name} v${pkg.version}`,
  timeZone: "America/Vancouver",
  baseUrl: "https://api.github.com",
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  }
});

module.exports = {
  getReleases,
  latestTag,
  getCommit,
  recentCommits
};

async function getReleases(owner, repo, since = new Date(0), count = 10) {
  const $releases = await octokit.repos.listReleases({
    owner,
    repo,
    per_page: count
  }).then(res => res.data);

  const releases = $releases
    .map(release => {
      return {
        name: release.name,
        tag_name: release.tag_name,
        url: release.html_url,
        author: release.author.login,
        created_at: new Date(release.created_at),
        published_at: new Date(release.published_at),
        releasenotes_md: release.body
      };
    })
    .filter(release => release.created_at > since);
  return { releases, $meta: {owner, repo, since} };
}

async function latestTag(owner, repo) {
  const tag = await octokit.repos
    .listTags({
      owner,
      repo,
      // NOTE: I only care about the most recent tag, so set the page size to "1".
      per_page: 1
    })
    .then(res => res.data[0]);
  tag.commit = await getCommit(owner, repo, tag.commit.sha);
  tag.$meta = { owner, repo };
  return tag;
}

async function getCommit(owner, repo, commit_sha) {
  const commit = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: commit_sha
  });

  return commit.data;
}

async function recentCommits(owner, repo, since = new Date(0)) {
  const commits = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 100
  }).then(res => res.data);

  const recentCommits = commits.filter(commit => {
    if (commit.commit.message.startsWith("Merge ")) return false;
    let commitDate;
    try {
      commitDate = new Date(commit.commit.author.date);
    } catch (err) {
      commitDate = new Date(commit.commit.committer.date);
    }
    return commitDate > since;
  });

  return {
    commits: recentCommits,
    $meta: { owner, repo, since }
  };
}
