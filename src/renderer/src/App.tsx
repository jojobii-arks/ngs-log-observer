import { useEffect } from 'react';
import useSWR from 'swr';

export default function App(): JSX.Element {
  const { data: gameDirectory } = useSWR(
    'gameDirectory',
    async () => await api.getGameDirectory()
  );

  useEffect(() => {
    /** Initialize API Listeners */
    api.onAlert((_, value) => {
      alert(value);
    });

    /** Remove listeners on unmount */
    return () => {
      api.clear();
    };
  });
  return (
    <main className="p-8">
      <header className="rounded-xl bg-base-300 p-4">
        <h1 className="mb-2 text-4xl font-black">NGS Log Observer</h1>
        <p>Using logs from {gameDirectory}</p>
      </header>
      <div>
        <ul></ul>
      </div>
    </main>
  );
}
