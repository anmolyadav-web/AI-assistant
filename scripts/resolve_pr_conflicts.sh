#!/usr/bin/env bash
set -euo pipefail

TARGET_BRANCH="${1:-origin/main}"

echo "Fetching latest refs..."
git fetch origin || {
  echo "No remote named 'origin' configured. Add remote first:" >&2
  echo "  git remote add origin <repo-url>" >&2
  exit 1
}

echo "Rebasing current branch onto ${TARGET_BRANCH}..."
set +e
git rebase "${TARGET_BRANCH}"
REBASERC=$?
set -e

while [ $REBASERC -ne 0 ]; do
  CONFLICTS="$(git diff --name-only --diff-filter=U || true)"
  if [ -z "${CONFLICTS}" ]; then
    echo "Rebase stopped but no conflicted files found. Aborting." >&2
    exit 1
  fi

  echo "Conflicts detected:"
  echo "${CONFLICTS}"

  # Keep this branch's changes for core runtime files.
  for f in backend/routes/notes.js backend/server.js package.json vercel.json; do
    if echo "${CONFLICTS}" | grep -qx "${f}"; then
      git checkout --ours -- "${f}"
      git add "${f}"
    fi
  done

  # README can safely use union behavior if configured; otherwise keep ours.
  if echo "${CONFLICTS}" | grep -qx "README.md"; then
    git checkout --ours -- README.md
    git add README.md
  fi

  # Add any manually resolved files and continue.
  git add -A
  set +e
  git rebase --continue
  REBASERC=$?
  set -e

done

echo "Rebase completed successfully."
echo "Push with: git push --force-with-lease"
