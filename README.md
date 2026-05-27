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

Pushes to `main`, `master`, or `develop` trigger [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

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

### One-time setup (Netlify + GitHub OAuth)

Your site stays on **GitHub Pages**. Netlify is only used for the GitHub login handshake (free).

1. **Add this repo as a Netlify site**
   - [Netlify](https://app.netlify.com) → Add new site → Import from Git → this repo → branch `master`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy once (you can keep using GitHub Pages as the public URL)

2. **Note your Netlify site URL** from Site overview, e.g. `https://something-random.netlify.app`

3. **Create a GitHub OAuth App** ([Developer settings → OAuth Apps](https://github.com/settings/developers))
   - **Homepage URL**: `https://jon1969edwards.github.io/`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done` (exactly this)
   - Copy the **Client ID** and generate a **Client Secret**

4. **Connect OAuth in Netlify**
   - Site configuration → **Access & security** → **OAuth**
   - Install provider → **GitHub** → paste Client ID and Client Secret → Save

5. **Update `public/admin/config.yml`**
   - Set `site_domain` to your Netlify subdomain only, e.g. `something-random.netlify.app` (no `https://`)
   - Commit and push to `master` (or tell your agent the URL to update it for you)

### Using the CMS

- Visit `https://jon1969edwards.github.io/admin/`
- Log in with GitHub
- Edit JSON content + upload images
- Changes are committed to `master` (and trigger the Pages workflow)

## Blog (coming soon)

Add Markdown files under `src/content/posts/` when post support is wired up. The `/blog` route shows a placeholder until then.

## Legacy site

The previous Start Bootstrap template lives in [legacy/](legacy/) for reference.

## License

Site content © Jonathan C. Edwards. Template portions in `legacy/` retain their original MIT license.
