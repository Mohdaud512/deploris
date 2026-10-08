export function ComparisonTable({
  headers,
  rows,
}: {
  headers: [string, string, string];
  rows: [string, string, string][];
}) {
  return (
    <section aria-label="Comparison" className="container py-8">
      <div className="overflow-hidden rounded-2xl border border-brand-900/10 dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 dark:bg-white/5">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-brand-900 dark:text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-900/10 dark:divide-white/10">
            {rows.map((r, i) => (
              <tr key={i} className="align-top">
                {r.map((cell, j) => (
                  <td
                    key={j}
                    className={
                      j === 0
                        ? 'bg-brand-50/50 px-4 py-3 font-medium text-brand-900 dark:bg-white/5 dark:text-white'
                        : 'px-4 py-3 text-brand-900/85 dark:text-white/85'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
