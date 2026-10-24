import React from 'react';

function AnalyticsPage() {
  const benchmarks = [
    { metric: 'Initial JS Bundle Size', before: '486 kB', after: '138 kB', gain: '-71.6%' },
    { metric: 'First Contentful Paint (FCP)', before: '2.1 s', after: '0.6 s', gain: '-71.4%' },
    { metric: 'Time to Interactive (TTI)', before: '3.4 s', after: '1.1 s', gain: '-67.6%' },
    { metric: 'Speed Index', before: '3.0 s', after: '0.9 s', gain: '-70.0%' },
    { metric: 'Lighthouse Performance Score', before: '68 / 100', after: '97 / 100', gain: '+42.6%' }
  ];

  return (
    <div>
      <h2 className="page-title">📊 Heavy Analytics (Lazy-Loaded Chunk)</h2>
      <p className="page-desc">
        This component simulates a heavy data processing and chart visualization module.
        Notice that this code was NOT included in the initial page download!
      </p>

      <table className="benchmark-table">
        <thead>
          <tr>
            <th>Performance Metric</th>
            <th>Monolithic Bundle</th>
            <th>Lazy Code-Split</th>
            <th>Improvement</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((row, idx) => (
            <tr key={idx}>
              <td><strong>{row.metric}</strong></td>
              <td>{row.before}</td>
              <td>{row.after}</td>
              <td><span className="gain-pill">{row.gain}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsPage;
