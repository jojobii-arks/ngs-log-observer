import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { ActionLogItem } from 'src/lib/types';

export default function App(): JSX.Element {
  const { data: gameDirectory } = useSWR('gameDirectory', async () =>
    (await api.getGameDirectory()).split('\\').at(-1)
  );

  const [log, setLog] = useState<ActionLogItem[]>([]);

  /**
   * TODO: User Preferences in React Context?
   */
  const [showMeseta, setShowMeseta] = useState<boolean>(true);

  /** Total amount of Meseta gained during runtime of app. Calculated from logs. Does not account for auto-sell of valuable items. */
  const sessionMesetaTotal = useMemo<number>(
    () =>
      [...log]
        .filter(
          (e) =>
            ['[Pickup]', '[DiscradExchange]'].includes(e.action_type) &&
            e.item_num?.includes('N-Meseta')
        )
        .reduce(
          (total: number, action) =>
            total + Number(/\d+(?=\))(?!\()/.exec(action.item_num ?? '')),
          0
        ),
    [log]
  );

  useEffect(() => {
    /** Initialize API Listeners */
    api.onAlert((_, value) => {
      alert(value);
    });

    api.onNewAction((_, value) => {
      console.log(value);
      setLog([...log, ...value]);
    });

    /** Remove listeners on unmount */
    return () => {
      api.clear();
    };
  });
  return (
    <main className="flex h-[100vh] flex-col overflow-y-clip">
      <header className="draggable select-none bg-base-300 p-4">
        <div>
          <h1 className="mb-1 text-2xl font-black">NGS Log Observer</h1>
          <p className="mb-2 text-sm">
            Using logs from{' '}
            <button
              className="link-hover link"
              onClick={() => {
                api.openGameDirectory();
              }}
            >
              {gameDirectory}
            </button>
          </p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="stats">
            <div className="no-drag stat">
              <div className="stat-title text-sm">Session 💰</div>
              <div className="stat-value select-text text-xl">
                {sessionMesetaTotal.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="no-drag label cursor-pointer">
              <span className="label-text mr-4">Show Meseta</span>
              <input
                type="checkbox"
                className="toggle"
                checked={showMeseta}
                onChange={() => setShowMeseta(!showMeseta)}
              />
            </label>
          </div>
        </div>
      </header>
      <div className="flex-auto overflow-y-scroll">
        <table className="table-compact relative table w-full">
          <thead className="sticky top-0">
            <tr>
              <th className="rounded-none">Type</th>
              <th>Data</th>
              <th className="rounded-none">Time</th>
            </tr>
          </thead>
          <tbody className="min-h-full">
            {[...log]
              .reverse()
              .filter((e) => {
                /** check if `showMeseta` is on, then filter accordingly */
                if (!showMeseta) {
                  if (e.item_num?.includes('N-Meseta')) return false;
                }
                /** only show pickups and sells */
                return ['[Pickup]', '[DiscradExchange]'].includes(
                  e.action_type
                );
              })
              .map((action) => (
                /** format action logs into rows */
                <tr key={action.action_id + action.log_time}>
                  <td>{action.item_num?.includes('N-Meseta') ? `💰` : `📥`}</td>
                  <td>
                    {action.item_name
                      ? action.item_name +
                        ' - x' +
                        /\d+(?=\))(?!\()/.exec(action.item_num ?? '')
                      : 'N-Meseta - x' +
                        /\d+(?=\))(?!\()/.exec(action.item_num ?? '')}
                  </td>
                  <td>{new Date(action.log_time).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
