# octokit-rest-test

Testing the [@octokit/rest](https://www.npmjs.com/package/@octokit/rest) GitHub package for getting repository information for a specific org/repo.

## SETUP

Because GitHub has API limits for people who don't bother getting API keys, I fetch and cache the GitHub responses into the [./src/_data](src/_data) directories. So before running <kbd>eleventy</kbd>, you'll need to run <kbd>npm run seed-data</kbd>.

## GETTING STARTED

```sh
git clone https://github.com/pdehaan/octokit-rest-test.git
cd octokit-rest-test
npm run seed-data
npm run serve
```
