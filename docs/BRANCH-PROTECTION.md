# Branch protection — merging only after CI

A GitHub Actions workflow runs tests, but **it cannot forbid a merge by itself**. The merge
gate is a repository setting: *require the status check `ci-success` before merging*.

This repository ships `.github/workflows/ci.yml` with one stable job for exactly that:

- `unit` → syntax check, 101 unit tests, generated seed is up to date
- `browser` → Playwright smoke tests + `selftest.html` (768 activities/screens)
- `ci-success` → fails unless both jobs passed

Require **`ci-success`**, not the individual jobs. Adding a job later never requires
touching the branch rule.

---

## Option A — GitHub UI (recommended)

1. Push any commit once, so the check appears (at least one finished `ci-success` run is
   needed before it can be selected).
2. **Settings → Rules → Rulesets → New branch ruleset** (or **Branches → Add branch
   protection rule** on older repositories).
3. Target branch: `main`.
4. Enable **Require a pull request before merging** (zero approvals is fine for a solo
   maintainer; this is what makes “merge only” true).
5. Enable **Require status checks to pass before merging**.
6. Search for and select **`ci-success`**.
7. Recommended:
   - **Require branches to be up to date before merging** — prevents “green on an old
     base”.
   - **Block force pushes** and **restrict deletions**.
   - **Do not allow bypassing** (except admins if you need an emergency path).
8. Save.

If the check does not appear in the search, the workflow has not run yet. Push a commit or
open a draft PR first.

---

## Option B — `gh` CLI

Requires admin rights and an authenticated `gh`.

```bash
cat > /tmp/bela-protection.json <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["ci-success"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 0 },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON

gh api --method PUT \
  repos/OWNER/REPO/branches/main/protection \
  --input /tmp/bela-protection.json
```

Replace `OWNER/REPO`. To also require one approving review, set
`"required_approving_review_count": 1`.

Check the result:

```bash
gh api repos/OWNER/REPO/branches/main/protection \
  --jq '.required_status_checks.contexts'
# ["ci-success"]
```

---

## What the CI actually runs

```yaml
unit:    npm run check        # syntax + node --test
         npm run seed         # then git diff --exit-code js/config/seed.js
browser: npx playwright test  # 5 shell checks + selftest 768/768
```

`npm run check` deliberately starts with a syntax pass over every JS file: the Node test
runner only loads what a test requires, so a broken engine could otherwise pass tests.

Playwright is installed in CI only (`--no-save`); the app itself has no dependencies.

---

## If you skip branch protection

Then a red CI is only a warning. GitHub will still allow “Merge pull request”. The workflow
is necessary but not sufficient; the setting above is the lock.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ci-success` not listed | Run the workflow once; only finished checks are selectable. |
| Check stuck on “Expected” | The job was renamed. Keep the `ci-success` name stable or update the rule. |
| Browser job fails only in CI | Open the uploaded `playwright-results` artifact; usually timing or a missing browser dependency. |
| Seed diff step fails | Run `npm run seed` locally and commit `js/config/seed.js`. |
| Fork PR shows no checks | Actions from forks require maintainer approval on the first run. |
