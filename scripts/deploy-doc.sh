#!/usr/bin/env sh

# abort on errors
set -e

rev=$(git rev-parse --short HEAD)
release_message="Updated at ${rev}"

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

git config --global user.name "CI Bot"
git config --global user.email "bot@linagora.com"

git init
git add -A
git commit --allow-empty -m "$release_message"

git push -f https://${GITHUB_TOKEN}@github.com/linagora/openpaas-dashboard.git master:gh-pages

cd -
