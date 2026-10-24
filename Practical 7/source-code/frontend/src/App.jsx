import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('awf_jwt_token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('awf_user') || 'null'));
  
  // Auth Form State
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Task State
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskError, setTaskError] = useState('');

  // Fetch tasks if authenticated
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data.data || []);
      } else {
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const endpoint = authMode === 'register' ? '/auth/register' : '/auth/login';
    const payload = authMode === 'register' ? { name, email, password } : { email, password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || (data.errors ? data.errors.join(', ') : 'Authentication failed.'));
        return;
      }

      localStorage.setItem('awf_jwt_token', data.token);
      localStorage.setItem('awf_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setAuthSuccess(`${authMode === 'register' ? 'Registration' : 'Login'} successful! JWT token generated.`);
    } catch (err) {
      setAuthError('Unable to connect to authentication server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('awf_jwt_token');
    localStorage.removeItem('awf_user');
    setToken('');
    setUser(null);
    setTasks([]);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setTaskError('');

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: taskTitle, description: taskDesc })
      });
      const data = await res.json();

      if (!res.ok) {
        setTaskError(data.errors ? data.errors.join(', ') : (data.error || 'Validation error'));
        return;
      }

      setTaskTitle('');
      setTaskDesc('');
      fetchTasks();
    } catch (err) {
      setTaskError('Network error adding task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      await fetch(`${API_BASE}/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !task.completed })
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="header-card">
        <div className="title-group">
          <h1>🔐 AWF Practical 7: JWT Authentication & Middleware</h1>
          <span className="student-tag">Student ID: 24CE004 | Name: Jashkumar Baldha</span>
        </div>
        {token && user && (
          <div className="auth-badge">
            <div className="user-name">👤 {user.name}</div>
            <div className="jwt-status">● Bearer Token Verified</div>
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        )}
      </header>

      {/* Main Flow: Unauthenticated vs Authenticated */}
      {!token ? (
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => { setAuthMode('login'); setAuthError(''); }}
            >
              Log In
            </button>
            <button
              className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => { setAuthMode('register'); setAuthError(''); }}
            >
              Register
            </button>
          </div>

          {authError && <div className="alert-box alert-danger">⚠️ {authError}</div>}
          {authSuccess && <div className="alert-box alert-success">✅ {authSuccess}</div>}

          <form onSubmit={handleAuth}>
            {authMode === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jashkumar Baldha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="24ce004@charusat.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password (min 6 characters)</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              {authMode === 'register' ? 'Create Account & Sign JWT' : 'Verify Credentials & Generate Token'}
            </button>
          </form>
        </div>
      ) : (
        <div className="dashboard-content">
          {/* JWT Token Live Inspector */}
          <div className="token-viewer">
            <div className="token-viewer-header">
              <h4>🔑 Active JSON Web Token (Bearer Payload attached to API Headers)</h4>
              <span className="jwt-status">Valid 1-Hour Session</span>
            </div>
            <div className="token-box">
              Bearer {token}
            </div>
          </div>

          <div className="tasks-section" style={{ marginTop: '20px' }}>
            {/* Create Task Form */}
            <div className="panel-card">
              <h3>Create Task (Server-Side Validation)</h3>
              {taskError && <div className="alert-box alert-danger">⚠️ {taskError}</div>}
              <form onSubmit={handleCreateTask}>
                <div className="form-group">
                  <label>Task Title (Required, Min 3 chars)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Configure JWT Middleware"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description (Optional)</label>
                  <textarea
                    rows="3"
                    className="form-input"
                    placeholder="Details about middleware execution flow"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  + Add Protected Task
                </button>
              </form>
            </div>

            {/* Task List */}
            <div className="panel-card">
              <h3>Protected Tasks Collection ({tasks.length})</h3>
              {tasks.length === 0 ? (
                <div className="empty-state">
                  No tasks recorded yet for user {user.name}. Add your first protected task on the left!
                </div>
              ) : (
                <div className="task-list">
                  {tasks.map((task) => (
                    <div key={task._id} className="task-item">
                      <div className="task-info">
                        <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                          {task.title}
                        </h4>
                        <p>{task.description || 'No description provided.'}</p>
                      </div>
                      <div className="task-actions">
                        <button
                          className={`btn-status ${task.completed ? 'completed' : 'pending'}`}
                          onClick={() => handleToggleTask(task)}
                        >
                          {task.completed ? '✓ Done' : '⏳ Pending'}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
