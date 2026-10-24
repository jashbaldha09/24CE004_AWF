import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5001/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ hitCount: 0, missCount: 0, activeKeysCount: 0 });
  const [lastCacheStatus, setLastCacheStatus] = useState('UNINITIALIZED');
  const [lastResponseTime, setLastResponseTime] = useState('0.00ms');
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 20)]);
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      const cacheHeader = res.headers.get('X-Cache') || 'MISS';
      const timeHeader = res.headers.get('X-Response-Time') || '45ms';
      const data = await res.json();

      setTasks(data.data || []);
      setLastCacheStatus(cacheHeader);
      setLastResponseTime(timeHeader);

      addLog(`GET /tasks -> Status: ${cacheHeader} | Latency: ${timeHeader}`);
      fetchStats();
    } catch (err) {
      addLog(`Fetch error: ${err.message}`);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/cache/stats`);
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async () => {
    const title = `Optimized Query Task #${Date.now().toString().slice(-4)}`;
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category: 'Dynamic Invalidation' })
      });
      const data = await res.json();
      addLog(`POST /tasks -> Created "${title}" -> In-Memory Cache INVALIDATED!`);
      fetchTasks();
    } catch (err) {
      addLog(`Error adding task: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = stats.hitCount + stats.missCount;
  const ratio = total > 0 ? ((stats.hitCount / total) * 100).toFixed(1) : '0.0';

  return (
    <div className="dashboard-container">
      {/* Top Banner */}
      <div className="top-bar">
        <div>
          <h1 className="brand-h1">⚡ In-Memory Caching & Query Optimization</h1>
          <div className="tag-student">Student: Jashkumar Baldha (24CE004) | Subject: AWF (ITUE301)</div>
        </div>
        <div>
          <span className={`badge-status ${lastCacheStatus === 'HIT' ? 'badge-hit' : 'badge-miss'}`}>
            ● {lastCacheStatus}
          </span>
          <span className="timing-badge">⏱ {lastResponseTime}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-cols-3">
        <div className="metric-card">
          <div className="metric-label">Cache Hits (Sub-ms RAM)</div>
          <div className="metric-val hit">{stats.hitCount}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Cache Misses (DB Read)</div>
          <div className="metric-val miss">{stats.missCount}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Hit Efficiency Ratio</div>
          <div className="metric-val ratio">{ratio}%</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Tasks Collection ({tasks.length})</h3>
            <div>
              <button className="btn-fetch" onClick={fetchTasks}>
                🔄 Fetch (Cache Test)
              </button>
              <button className="btn-add" onClick={handleCreateTask}>
                + Create & Invalidate
              </button>
            </div>
          </div>

          <div>
            {tasks.map((task) => (
              <div key={task.id} className="task-row">
                <div>
                  <div style={{ fontWeight: 600 }}>{task.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Category: {task.category}</div>
                </div>
                <span className="badge-status" style={{ background: 'rgba(255,255,255,0.05)', color: '#38bdf8' }}>
                  {task.completed ? '✓ Cached' : '● Ready'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Invalidation & Request Trace */}
        <div className="content-card">
          <h3>Live Request & Cache Pipeline Trace</h3>
          <div className="log-console">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
