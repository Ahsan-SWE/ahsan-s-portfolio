# Secure CMS Setup

The portfolio CMS now publishes through server-side API routes. GitHub credentials are not entered in the browser and are never exposed through `NEXT_PUBLIC_*` variables.

## One-time local setup

Create `.env.local` in the project root and add:

```env
CMS_GITHUB_TOKEN=github_pat_replace_me
CMS_GITHUB_REPO=Ahsan-SWE/ahsan-s-portfolio
CMS_GITHUB_BRANCH=cms-test
ADMIN_PASSWORD=replace_with_a_strong_password
CMS_SESSION_SECRET=replace_with_a_long_random_secret
```

For final production publishing, change `CMS_GITHUB_BRANCH` to `main`.

The GitHub fine-grained token only needs access to this repository with **Contents: Read and write** permission.

## One-time Vercel setup

In the Vercel project, open **Settings > Environment Variables** and add:

- `CMS_GITHUB_TOKEN`
- `CMS_GITHUB_REPO`
- `CMS_GITHUB_BRANCH`
- `ADMIN_PASSWORD`
- `CMS_SESSION_SECRET`

Redeploy once after adding or changing environment variables.

## Daily publishing workflow

1. Open `/admin` on the deployed site.
2. Enter the admin password.
3. Choose Blog, Gallery, or Portfolio.
4. Add or edit the content and optionally choose an image.
5. Click the publish button once.
6. The server uploads the image when needed, updates the JSON content in GitHub, and Vercel deploys the new commit automatically.
7. Delete removes the content immediately after confirmation. Uploaded images that are no longer referenced are removed from GitHub automatically.

No GitHub token entry, `git pull`, local dev server restart, or terminal command is required for normal production publishing.

## Blog routing

All blog posts are read from `src/content/blog.json`. The dynamic blog route supports CMS-created slugs, so new posts are included when Vercel rebuilds after the CMS commit.

## Security notes

- Never commit `.env.local`.
- Never use `NEXT_PUBLIC_` for the GitHub token, admin password, or session secret.
- Use a unique admin password and a separate long random session secret.
- Keep the GitHub token limited to this repository only.
