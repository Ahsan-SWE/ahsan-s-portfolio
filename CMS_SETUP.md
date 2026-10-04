# Secure CMS Setup

The portfolio CMS publishes through server-side API routes. GitHub credentials, CMS passwords, session secrets, and Vercel Deploy Hook URLs are never exposed through `NEXT_PUBLIC_*` variables.

## One-time local setup

Create `.env.local` in the project root and add:

```env
CMS_GITHUB_TOKEN=github_pat_replace_me
CMS_GITHUB_REPO=Ahsan-SWE/ahsan-s-portfolio
CMS_GITHUB_BRANCH=cms-test
ADMIN_PASSWORD=replace_with_a_strong_password
CMS_SESSION_SECRET=replace_with_a_long_random_secret
CMS_VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/replace_me