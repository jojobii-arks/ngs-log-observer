import { useEffect, useState } from 'react';
import { ActionLogItem } from 'src/lib/types';
import useSWR from 'swr';

export default function App(): JSX.Element {
  const { data: gameDirectory } = useSWR(
    'gameDirectory',
    async () => await api.getGameDirectory()
  );
  const [log, setLog] = useState<ActionLogItem[]>([]);

  useEffect(() => {
    api.clear();

    /** Initialize API Listeners */
    api.onAlert((_, value) => {
      alert(value);
    });

    api.onNewAction((_, value) => {
      console.log(value);
      setLog([...log, value]);
    });

    /** Remove listeners on unmount */
    return () => {
      api.clear();
    };
  });
  return (
    <main className="flex h-[100vh] flex-col">
      <header className="rounded-b-xl bg-base-300 p-4">
        <h1 className="mb-2 text-4xl font-black">NGS Log Observer</h1>
        <p>Using logs from {gameDirectory}</p>
      </header>
      <div className="flex-auto overflow-y-scroll">
        <table className="table-compact table w-full">
          <thead>
            <th>Type</th>
            <th>Data</th>
            <th>Time</th>
          </thead>
          <tbody>
            {[...log].reverse().map((action: ActionLogItem) => (
              <tr key={action.action_id + action.log_time}>
                <td>{action.item_name ? `📥` : `💰`}</td>
                <td>{action.item_name ? action.item_name : action.item_num}</td>
                <td>{new Date(action.log_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
