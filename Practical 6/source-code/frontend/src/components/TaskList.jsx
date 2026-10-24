import React from 'react';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (tasks.length === 0) {
    return <div className="empty-tasks">No tasks found in MongoDB Atlas. Create a new task above!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id || task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
            />
            <div className="task-info">
              <h4 className="task-title">{task.title}</h4>
              {task.description && <p className="task-desc">{task.description}</p>}
            </div>
          </div>
          <div className="task-right">
            <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
            <button className="btn-delete" onClick={() => onDeleteTask(task._id || task.id)}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
