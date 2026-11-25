# Deploy to GitHub Pages

The live site is served from:

**https://chindlab.github.io/learning-adventures/**

The app is plain static files, so Pages can host it without a build step. The CI workflow
contains two jobs: **build** (packages `_site` and uploads the Pages artifact) and
**deploy** (publishes it). Both run only after `ci-success` and only for `main`.

---

## One-time repository setup

1. Open the repository on GitHub.
2. **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
   Do **not** choose “Deploy from a branch”.
4. Nothing else is required — no base path, no build command, no `gh-pages` branch.

> If **Actions** shows internal runs named **“pages build and deployment”**, your source is
> still **Deploy from a branch**. Change it to **GitHub Actions**; otherwise the workflow’s
> deploy step cannot publish.

The first deployment starts with the next push to `main` (or a manual CI run). The URL
appears in **Settings → Pages** and in the `deploy` job’s environment link.

> Private repository? GitHub Pages for private repositories depends on your GitHub plan.
> On the free plan, make the repository public or use a local copy. The site itself
> contains no personal data.

---

## What gets published

The deploy job creates a `_site` folder and uploads only:

```
index.html
css/
js/          (core, content, engines, config/seed.js)
i18n/        (de-DE, fr-FR, it-IT, zh-CN, hi-IN, ne-NP, de-CH — translations; English is the source)
assets/      (inline-SVG logo, favicon)
```

Not published: tests, `selftest.html`, docs, tools, `bela.config.json`, CI files. The
artifact is served as-is; Jekyll is not involved.

All paths are relative (`css/style.css`, `js/…`), so the project works both at
`https://chindlab.github.io/learning-adventures/` and from `file://`.

---

## How a deploy runs

```
push to main
   └─ CI: unit ─┐
      CI: browser ─┴─ ci-success ─→ deploy ─→ GitHub Pages
```

- A failing test prevents the deploy; there is no “deploy anyway” button in the workflow.
- Pull requests run CI but never deploy.
- Manual re-deploy: **Actions → CI → Run workflow**, branch `main`. The `deploy` job runs
  because `workflow_dispatch` is allowed for `main`.
- Re-running only the deploy job from an old workflow run is also possible in the Actions
  UI, but it publishes that commit, not the latest.

---

## First checks after going live

- [ ] `https://chindlab.github.io/learning-adventures/` opens the map with 9 islands.
- [ ] No 404s in DevTools → Network for `css/`, `js/`, `assets/`.
- [ ] Header shows **Bela**; the golden gear opens the parent sum.
- [ ] Language switch works; reload keeps it.
- [ ] Add a star, reload, star is still there.
- [ ] Mobile/desktop widths; no horizontal scroll.

`https://chindlab.github.io/learning-adventures/selftest.html` is intentionally **not**
published. Run the self-test locally before merging.

---

## Storage changes on Pages

The site runs on a different origin than `file://`:

- `file://` progress and `https://chindlab.github.io` progress are **separate**.
- Use the parent area’s **Sicherung / Backup** to move a child between them.
- HTTPS gives you a proper origin; localStorage is more reliable than on `file://`.

No accounts, no server, no data sent anywhere.

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| 404 at the Pages URL | Pages source is not **GitHub Actions**, or the first deploy has not run yet. |
| Deploy job fails: “Get Pages site failed” / “Not Found” | Enable Pages once (Settings → Pages → Source: GitHub Actions). `GITHUB_TOKEN` cannot enable it automatically. |
| Deploy skipped | The push was not to `main`, or `ci-success` failed. |
| “No artifacts named `github-pages`” | Artifact race. The workflow splits build and deploy; re-run the failed deploy job once. If it persists, check GitHub status. |
| Site loads but CSS/JS 404 | Assets were not copied into `_site`; check the “Build static site” step. |
| Old version after deploy | Hard reload / check the deployment timestamp; Pages can take a minute. |
| “Environment github-pages is waiting” | Repository environment protection requires approval; approve it under Actions. |
| Private repo, no Pages option | Upgrade the plan or make the repo public. |

---

## Custom domain (optional)

Settings → Pages → Custom domain. Add the DNS records GitHub shows, wait for the
certificate, then enable **Enforce HTTPS**. Nothing in the app needs to change: all paths
are relative and the router uses the hash, not the path.
