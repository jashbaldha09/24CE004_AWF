import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5002/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [eventLogs, setEventLogs] = useState([]);
  const [title, setTitle] = useState('');
  const [lastApiTime, setLastApiTime] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks/logs`);
      const data = await res.json();
      if (data.success) {
        setEventLogs(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchLogs();
    const interval = setInterval(fetchLogs, 500);
    return () => clearInterval(interval);
  }, []);

  const handleCreateTask = async (simulateError = false) => {
    const taskTitle = title.trim() || `Event Driven Workflow #${Date.now().toString().slice(-4)}`;
    try {
      const startTime = performance.now();
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskTitle,
          userId: '24CE004',
          simulateError
        })
      });
      const duration = (performance.now() - startTime).toFixed(1);
      const data = await res.json();

      setLastApiTime({
        iso: data.apiResponseTime,
        duration: `${duration}ms`
      });

      setTitle('');
      fetchTasks();
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shell">
      {/* Top Banner */}
      <div className="header">
        <div>
          <h1 className="brand-h1">⚡ Asynchronous Processing & Event-Driven Architecture</h1>
          <div className="student-badge">Student: Jashkumar Baldha (24CE004) | AWF (ITUE301)</div>
        </div>
        {lastApiTime && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#a78bfa' }}>Client Roundtrip: {lastApiTime.duration}</div>
            <div style={{ fontSize: '0.72rem', color: '#10b981' }}>HTTP 201 Dispatched Instantly</div>
          </div>
        )}
      </div>

      <div className="architecture-banner">
        <span>🔄</span>
        <div>
          <strong>Decoupled Event Flow:</strong> Client Request ➔ DB Write ➔ Immediate HTTP 201 Sent ➔ Background EventEmitter triggers AuditLogger &amp; Asynchronous Email Notification (200ms non-blocking).
        </div>
      </div>

      <div className="main-layout">
        {/* Task Trigger Card */}
        <div className="card">
          <h3>Create Task & Trigger Events</h3>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              className="input-box"
              placeholder="e.g. Asynchronous Pipeline Integration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button className="btn-submit" onClick={() => handleCreateTask(false)}>
            + Create Task (Emits task:created)
          </button>

          <button className="btn-simulate-error" onClick={() => handleCreateTask(true)}>
            🧪 Simulate Background Error (Emits error event)
          </button>

          {lastApiTime && (
            <div className="timing-verif">
              <strong>Execution Timing Verification:</strong><br />
              • HTTP 201 Response: <code style={{ color: '#fff' }}>{lastApiTime.iso}</code><br />
              • Client Latency: <code style={{ color: '#fff' }}>{lastApiTime.duration}</code> (Immediate response before 200ms background job completes!)
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: '#cbd5e1' }}>Tasks Committed ({tasks.length})</h4>
            <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
              {tasks.map((t) => (
                <div key={t.id} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', marginBottom: '6px', fontSize: '0.85rem' }}>
                  <strong>{t.title}</strong>
                  <span style={{ float: 'right', color: '#94a3b8', fontSize: '0.75rem' }}>ID: {t.id.slice(-6)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Event Stream Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3>Background Event Listener Stream</h3>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Live Monitoring</span>
          </div>

          <div className="event-feed">
            {eventLogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No events received yet. Create a task to observe decoupled background processing!
              </div>
            ) : (
              eventLogs.map((log) => {
                let tagClass = 'audit';
                if (log.source.includes('Email')) tagClass = 'email';
                if (log.source.includes('Error')) tagClass = 'error';

                return (
                  <div key={log.id} className="event-item">
                    <div className="event-header">
                      <span className={`source-tag ${tagClass}`}>{log.source}</span>
                      <span className="event-time">{log.timestamp.slice(11, 23)}</span>
                    </div>
                    <div className="event-msg">{log.message}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
