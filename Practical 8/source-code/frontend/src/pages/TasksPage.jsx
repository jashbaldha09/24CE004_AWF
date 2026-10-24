import React, { useState } from 'react';

function TasksPage() {
  const [tasks] = useState([
    { id: 1, title: 'Configure Code Splitting in vite.config.js', chunk: 'TasksPage.chunk.js', status: 'Completed' },
    { id: 2, title: 'Wrap Routes in React <Suspense> with fallback', chunk: 'TasksPage.chunk.js', status: 'Completed' },
    { id: 3, title: 'Profile Network Waterfall with DevTools Slow 3G', chunk: 'TasksPage.chunk.js', status: 'In Progress' }
  ]);

  return (
    <div>
      <h2 className="page-title">📝 Tasks Management (On-Demand Chunk)</h2>
      <p className="page-desc">
        This route chunk is only fetched when the user navigates to /tasks.
      </p>

      <table className="benchmark-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Associated Chunk</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td><span className="chunk-badge">{t.chunk}</span></td>
              <td><span className="gain-pill">{t.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TasksPage;
