import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks((prev) => [res.data, ...prev]);
      showToast('Task added and saved to MongoDB Atlas!');
    } catch (err) {
      showToast('Error adding task: ' + err.message);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTask(task._id || task.id, { completed: !task.completed });
      setTasks((prev) =>
        prev.map((t) => ((t._id || t.id) === (task._id || task.id) ? updated.data : t))
      );
      showToast('Task status updated in MongoDB Atlas!');
    } catch (err) {
      showToast('Error updating task: ' + err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== id));
      showToast('Task deleted from MongoDB Atlas!');
    } catch (err) {
      showToast('Error deleting task: ' + err.message);
    }
  };

  return (
    <div className="fullstack-app">
      <header className="app-header">
        <h1>Jash Baldha <span>Task Manager (24CE004)</span></h1>
        <p>Practical 6: Integrated React + Express + MongoDB Atlas Solution</p>
      </header>

      {notification && <div className="toast-notification">{notification}</div>}

      <main className="app-main">
        <TaskForm onAddTask={handleAddTask} />

        <div className="task-section">
          <h2>Atlas Database Overview ({tasks.length})</h2>

          {loading && <div className="spinner">Loading tasks from MongoDB Atlas...</div>}
          {error && (
            <div className="error-banner">
              <p>⚠️ {error}</p>
              <button className="btn-retry" onClick={loadTasks}>Retry Connection</button>
            </div>
          )}

          {!loading && !error && (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
