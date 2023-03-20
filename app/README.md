# ngs-log-observer/app

Application source code for [NGS Log Observer](https://jojobii-arks.github.io/ngs-log-observer).

## Key Notes

- Made with [`electron-vite`](https://evite.netlify.app/)
- Implementation based off of [`@masayoshi4649/PSO2NGSLogViewer`](https://github.com/masayoshi4649/PSO2NGSLogViewer)

## Development

- `pnpm install` to install dependencies.
- `pnpm dev` to run app on dev server with HMR.
- `pnpm build:win` to build app.
  - Edit version number in `package.json` to alter version number of output.
  - Upload to GitHub Releases with a new tag including new version number.
