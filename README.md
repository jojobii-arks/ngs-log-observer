# NT NGS Log Observer

An _ActionLog_ viewer for [PSO2:NGS©️](https://pso2.com/), but in Tauri this time!

## [Landing Page](https://jojobii-arks.github.io/nt-ngs-log-observer/)

## Repository Information

- [`/app`](app) includes application source code.
- [`/web`](web) includes landing page source code.

## Differences from [`ngs-log-observer`](https://github.com/jojobii-arks/ngs-log-observer)

- Built with [Tauri](https://tauri.studio/) instead of Electron.
- Less CPU usage for a bit more RAM usage (I think?).

![Memory Usage](web/public/images/memory-usage.png)

- Starts up **hella** quick.
- `~3MB` installer size compared to `~60MB` for Electron portable binary.

## Features

- Watch item drops from a dedicated window as they happen in the game.
- View total N-Meseta gained during your play session.

## [Click here to view releases!](https://github.com/jojobii-arks/nt-ngs-log-observer/releases/)

- The application is packaged in an installer.
- Auto-detects the most recently used game directory if you play on multiple versions.
- **NOTE:** The code is unsigned, I'm too stingy for a certificate rn 🤣

## Credit Notes

- Implementation based off of [`@masayoshi4649/PSO2NGSLogViewer`](https://github.com/masayoshi4649/PSO2NGSLogViewer)

---

## Previews (v1.0.4)

![Filled Item Log](web/public/images/preview-filled-log.png) 

---

##### _This application is not affiliated with SEGA or any of its subsidiaries._