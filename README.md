# Jonathan Edwards — Portfolio

Personal portfolio site built with [Vite](https://vite.dev/) and [React](https://react.dev/).

**Live site:** [https://jon1969edwards.github.io/](https://jon1969edwards.github.io/)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Production output is in `dist/`. The build copies `index.html` to `404.html` so client-side routes work on GitHub Pages.

## Deploy

Pushes to `main`, `master`, or `develop` run [.github/workflows/deploy.yml](.github/workflows/deploy.yml). Only **`master`** / **`main`** deploy to GitHub Pages (`develop` runs build only).

In the GitHub repo, enable **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Editing content

| File | What it controls |
|------|------------------|
| [src/content/site.json](src/content/site.json) | Name, hero, about, social links, contact |
| [src/content/clients.json](src/content/clients.json) | Client / featured work |
| [src/content/projects.json](src/content/projects.json) | Project cards (`featured` or `archive`) |
| [src/content/timeline.json](src/content/timeline.json) | About timeline |
| [public/img/](public/img/) | Images |

## Git-based CMS (Decap)

This repo includes a browser-based editor at `/admin` powered by [Decap CMS](https://decapcms.org/). It commits changes directly to GitHub (no database, no custom backend for content).

### One-time setup (Netlify OAuth proxy + GitHub)

Your site stays on **GitHub Pages**. Netlify (`jon-portfolio-cms`) runs a small OAuth function only.

1. **Netlify site** — import this repo, branch `master`, build `npm run build`, publish `dist` (already done if you use `jon-portfolio-cms`).

2. **GitHub OAuth App** ([Developer settings → OAuth Apps](https://github.com/settings/developers))
   - **Homepage URL**: `https://jon1969edwards.github.io/`
   - **Authorization callback URL**: `https://jon-portfolio-cms.netlify.app/callback`
   - Copy **Client ID** and generate **Client Secret**

3. **Netlify environment variables** (Site configuration → Environment variables)
   - `GITHUB_CLIENT_ID` = your Client ID
   - `GITHUB_CLIENT_SECRET` = your Client Secret  
   Redeploy after saving (Deploys → Trigger deploy).

4. You do **not** need Netlify “OAuth providers” under Access & security for this setup — the function in `netlify/functions/auth.cjs` handles login.

### Using the CMS

- Visit **`https://jon-portfolio-cms.netlify.app/admin/`**, or `https://jon1969edwards.github.io/admin/` (redirects to Netlify for GitHub login)
- The `#/` in the URL is normal (Decap’s router)
- Log in with GitHub (allow popups)
- Edit JSON content + upload images
- Changes are committed to `master` (and trigger the Pages workflow)

## Blog (coming soon)

Add Markdown files under `src/content/posts/` when post support is wired up. The `/blog` route shows a placeholder until then.

## Legacy site

The previous Start Bootstrap template lives in [legacy/](legacy/) for reference.

## License

Site content © Jonathan C. Edwards. Template portions in `legacy/` retain their original MIT license.
