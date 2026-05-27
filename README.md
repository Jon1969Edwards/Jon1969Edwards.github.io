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

## Blog (coming soon)

Add Markdown files under `src/content/posts/` when post support is wired up. The `/blog` route shows a placeholder until then.

## Legacy site

The previous Start Bootstrap template lives in [legacy/](legacy/) for reference.

## License

Site content © Jonathan C. Edwards. Template portions in `legacy/` retain their original MIT license.
