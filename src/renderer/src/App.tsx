import { useEffect } from 'react'

export default function App(): JSX.Element {
  useEffect(() => {
    api.onPing(() => {
      console.log('pong')
    })

    return () => {
      api.clear()
    }
  })
  return (
    <main>
      <h1 className="bg-black text-4xl font-black">hello there!</h1>
    </main>
  )
}
