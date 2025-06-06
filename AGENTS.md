# Repository Instructions

If a change modifies any `.js`, `.html`, `.css`, or `.py` file:
1. Run `npm ci`.
2. Run `coverage run -m pytest` followed by `coverage html && coverage report`.
3. Run `npx eslint docs --fix`.
4. Run `npx prettier --check "docs/**/*.{js,html,css}"`.
5. Run `mypy .`.
6. Run `npm audit --omit=dev`.
7. Run `bandit -r .`.

If only markdown or text files change:
1. Run `codespell` on the repository root.
2. Run `npx markdown-link-check README.md` and any new markdown files.
