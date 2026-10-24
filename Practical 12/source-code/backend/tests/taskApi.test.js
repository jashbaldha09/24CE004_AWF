const request = require('supertest');
const app = require('../app');

describe('Task Management API CI/CD Integration Test Suite', () => {
  // Test 1: Health Endpoint Check
  it('GET /api/health - should return 200 OK and UP status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  // Test 2: Fetch Tasks Collection
  it('GET /api/tasks - should return 200 OK and an array of tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test 3: Create Task with Validation
  it('POST /api/tasks - should create a new task and return 201 Created', async () => {
    const newTask = {
      title: 'Automate CI/CD Pipeline with GitHub Actions',
      status: 'in-progress'
    };

    const res = await request(app)
      .post('/api/tasks')
      .send(newTask)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(newTask.title);
  });

  // Test 4: Missing Title Rejection
  it('POST /api/tasks - should return 400 Bad Request when title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ status: 'pending' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // Test 5: 404 on Undefined Route
  it('GET /api/undefined-endpoint - should return 404 Not Found', async () => {
    const res = await request(app).get('/api/undefined-endpoint');
    expect(res.statusCode).toBe(404);
  });
});
