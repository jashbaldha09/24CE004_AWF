import React, { useState } from 'react';

function App() {
  const [pipelineStatus, setPipelineStatus] = useState('PASS'); // 'PASS' or 'FAIL'
  const [activeStep, setActiveStep] = useState(4); // 0 to 4

  const passingLog = `Run npm test
> task-manager-backend@1.0.0 test
> jest --runInBand --detectOpenHandles --forceExit

PASS tests/taskApi.test.js
  Task Management API CI/CD Integration Test Suite
    ✓ GET /api/health - should return 200 OK and UP status (37 ms)
    ✓ GET /api/tasks - should return 200 OK and an array of tasks (6 ms)
    ✓ POST /api/tasks - should create a new task and return 201 Created (15 ms)
    ✓ POST /api/tasks - should return 400 Bad Request when title is missing (4 ms)
    ✓ GET /api/undefined-endpoint - should return 404 Not Found (5 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.545 s
Ran all test suites.
===================================================
CI Pipeline execution completed successfully.
===================================================
Workflow Status: SUCCESS (Green checkmark displayed on GitHub commit)`;

  const failingLog = `Run npm test
> task-manager-backend@1.0.0 test
> jest --runInBand --detectOpenHandles --forceExit

FAIL tests/taskApi.test.js
  Task Management API CI/CD Integration Test Suite
    ✕ GET /api/tasks - should return 200 OK (38 ms)
    ✓ POST /api/tasks - should create a new task (18 ms)
    ✓ POST /api/tasks - should return 400 Bad Request (12 ms)
    ✓ GET /api/undefined-endpoint - should return 404 Not Found (5 ms)

  ● Task Management API CI/CD Integration Test Suite › GET /api/tasks
    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 200

      13 |     const res = await request(app).get('/api/tasks');
    > 14 |     expect(res.statusCode).toBe(201); // Deliberate broken assertion for demonstration
         |                            ^
      15 |     expect(res.body.success).toBe(true);

Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        0.612 s
Error: Process completed with exit code 1.
===================================================
Workflow Status: FAILED (Red X displayed on GitHub commit)
===================================================`;

  const steps = [
    { num: 'Step 1', name: 'Checkout Code', status: 'Passed' },
    { num: 'Step 2', name: 'Setup Node 18', status: 'Passed' },
    { num: 'Step 3', name: 'npm ci', status: 'Passed' },
    { num: 'Step 4', name: 'npm test (Jest)', status: pipelineStatus === 'PASS' ? 'Passed' : 'Failed' },
    { num: 'Step 5', name: 'CI Summary', status: pipelineStatus === 'PASS' ? 'Success' : 'Aborted' }
  ];

  return (
    <div className="cicd-shell">
      {/* Top Banner */}
      <div className="top-bar">
        <div>
          <h1 className="brand-h1">🚀 Practical 12: CI/CD Pipeline with GitHub Actions</h1>
          <div className="student-tag">Student: Jashkumar Baldha (24CE004) | Subject: AWF (ITUE301)</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={`pipeline-badge ${pipelineStatus === 'PASS' ? 'badge-pass' : 'badge-fail'}`}>
            {pipelineStatus === 'PASS' ? '✔ build-and-test: passing' : '✖ build-and-test: failing'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            Branch: main | Runner: ubuntu-latest
          </div>
        </div>
      </div>

      {/* Workflow Pipeline Steps Indicator */}
      <div className="workflow-steps-bar">
        {steps.map((st, i) => (
          <div
            key={i}
            className={`step-card ${
              i === 3 && pipelineStatus === 'FAIL' ? 'active-fail' : 'active-pass'
            }`}
          >
            <div className="step-num">{st.num}</div>
            <div className="step-name">{st.name}</div>
            <div
              style={{
                fontSize: '0.72rem',
                marginTop: '4px',
                color: i === 3 && pipelineStatus === 'FAIL' ? '#ef4444' : '#10b981'
              }}
            >
              {st.status}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="main-content-grid">
        {/* Controls Panel */}
        <div className="panel">
          <h3>Automated Pipeline Triggers</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.4' }}>
            Simulate Git commits pushed to <code>origin/main</code> to observe automated GitHub Actions execution.
          </p>

          <button className="btn-run-pass" onClick={() => setPipelineStatus('PASS')}>
            ▶ Run Passing Pipeline (Green Checkmark)
          </button>

          <button className="btn-run-fail" onClick={() => setPipelineStatus('FAIL')}>
            ⚠ Simulate Deliberate Test Failure (Red X)
          </button>

          <div style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#e2e8f0' }}>Integration Tests Verified</h4>
            <div className="test-list-item">
              <span>GET /api/health (200 OK)</span>
              <span style={{ color: '#10b981' }}>PASSED</span>
            </div>
            <div className="test-list-item">
              <span>GET /api/tasks (200 OK)</span>
              <span style={{ color: pipelineStatus === 'PASS' ? '#10b981' : '#ef4444' }}>
                {pipelineStatus === 'PASS' ? 'PASSED' : 'FAILED'}
              </span>
            </div>
            <div className="test-list-item">
              <span>POST /api/tasks (201 Created)</span>
              <span style={{ color: '#10b981' }}>PASSED</span>
            </div>
            <div className="test-list-item">
              <span>Missing title validation (400)</span>
              <span style={{ color: '#10b981' }}>PASSED</span>
            </div>
            <div className="test-list-item">
              <span>Undefined route (404)</span>
              <span style={{ color: '#10b981' }}>PASSED</span>
            </div>
          </div>
        </div>

        {/* Live Terminal Output Panel */}
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3>GitHub Actions Runner Console Output</h3>
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: '#38bdf8' }}>
              Runner: ubuntu-latest
            </span>
          </div>

          <div className="terminal-box">
            {pipelineStatus === 'PASS' ? passingLog : failingLog}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
