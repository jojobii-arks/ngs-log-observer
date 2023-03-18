import type { BrowserWindow } from 'electron';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export default function runtime(window: BrowserWindow): void {
  console.log('Starting application...');
}
