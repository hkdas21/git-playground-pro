
Goal: Fix the GitHub Pages pipeline so dependency install no longer fails.

What I found:
- `.github/workflows/deploy.yml` currently runs `npm ci --legacy-peer-deps`.
- `package.json` includes `framer-motion@^12.38.0`.
- `package-lock.json` does not contain `framer-motion`, `motion-dom`, or `motion-utils` (so it is out of sync with `package.json`).
- `bun.lock` does include those packages, which indicates lockfile drift between npm and bun.
- `framer-motion` is actually used in the app (`src/pages/Index.tsx`, `Learn.tsx`, `Play.tsx`), so removing it is not correct.

Implementation plan:
1. Update CI install strategy in `.github/workflows/deploy.yml`:
   - Change install step from:
     - `npm ci --legacy-peer-deps`
   - To:
     - `npm install --legacy-peer-deps`
   - Why: `npm install` tolerates lockfile drift and will install from `package.json`, avoiding the `npm ci` sync error.

2. Keep the rest of the workflow unchanged:
   - `npm run build`
   - Pages artifact upload and deploy steps stay as-is.

3. Add a short comment in the workflow above install step clarifying why `npm install` is used (lockfile drift from dual lockfiles / peer constraints), so future edits don’t revert this accidentally.

Technical notes:
- The failure is no longer peer-resolution (`ERESOLVE`) only; it is now strict lockfile validation (`EUSAGE`) from `npm ci`.
- Because this repo has both `bun.lock` and `package-lock.json`, `npm ci` is fragile unless `package-lock.json` is actively regenerated whenever dependencies change.
- Long-term hardening (optional after unblocking deploy):
  - Standardize on one package manager for CI and lockfile ownership, or
  - Regenerate and commit `package-lock.json` whenever dependencies change.

Validation plan:
1. Push the workflow change.
2. Trigger Actions run (push or manual dispatch).
3. Confirm:
   - Install dependencies step passes
   - Build step passes
   - Deploy step outputs page URL successfully
4. Open published URL and verify app loads.
