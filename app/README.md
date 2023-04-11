# ngs-log-observer/app

Application source code for [NGS Log Observer](https://jojobii-arks.github.io/ngs-log-observer).

## Key Notes

- Made with [`Tauri`](https://tauri.app/) and [SvelteKit](https://kit.svelte.dev/).
- Implementation based off of [`@masayoshi4649/PSO2NGSLogViewer`](https://github.com/masayoshi4649/PSO2NGSLogViewer)

## Development

- `pnpm install` to install dependencies.
- `cargo install tauri` to install Tauri CLI.
- `cargo tauri dev` to run app in development mode.
- `cargo tauri build` to build app for production.
  - Edit version number in `package.json` to alter version number of output.
  - Output bundles are located in `src-tauri/target/release/bundle/msi`.
  - Upload to GitHub Releases with a new tag including new version number.
