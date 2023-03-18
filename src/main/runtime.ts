import type { BrowserWindow } from 'electron'

const timer = (ms) => new Promise((res) => setTimeout(res, ms))

export default function runtime(window: BrowserWindow): void {
  console.log('Starting application...')
  ;(async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await timer(1000)
      console.log('pinging')
      window.webContents.send('ping')
    }
  })()
}
