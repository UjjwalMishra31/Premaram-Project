import { useEffect, useState } from 'react';
import { getAnalytics } from '../api/onboardingApi';

interface Analytics {
  stepCompletionRate: Array<{ _id: string; count: number }>;
  dropOffStep: number | null;
  averageTimeToActivationMs: number;
}

export const ProductHomePage = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    getAnalytics().then((res) => setAnalytics(res.data));
  }, []);

  return (
    <div className="space-y-4 rounded bg-white p-6 shadow">
      <h1 className="text-2xl font-semibold">Main Product View</h1>
      <p className="text-slate-600">User is activated and onboarding is complete.</p>

      <section>
        <h2 className="mb-2 text-lg font-medium">Basic Analytics</h2>
        {!analytics ? <p>Loading analytics...</p> : (
          <div className="space-y-2 text-sm">
            <p>Drop-off step index: {String(analytics.dropOffStep ?? 'N/A')}</p>
            <p>Average time to activation (ms): {analytics.averageTimeToActivationMs}</p>
            <div>
              <p className="font-medium">Step completion counts:</p>
              <ul className="list-disc pl-5">
                {analytics.stepCompletionRate.map((row) => (
                  <li key={row._id}>{row._id}: {row.count}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
