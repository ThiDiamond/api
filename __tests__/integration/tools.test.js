const app = require('../../src/app');
const mongoose = require('mongoose');
const request = require('supertest');
const { getRandomInt, getToolData } = require('../utils/functions');
describe('Tools controller', () => {
  let toolModel;

  beforeAll(async () => {
    const conect = require('../../databaseConfig');
    await conect();
    toolModel = mongoose.model('Tool');
  });

  beforeEach(async () => {
    await toolModel.deleteMany();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should list all tools without give tag filter', async () => {
    const count = getRandomInt();
    for (let i = 0; i < count; i++) {
      const toolData = getToolData();
      await toolModel.create(toolData);
    }
    const response = await request(app).get('/tools/');
    expect(response.body.error).toBe(undefined);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(count);
  });

  it('should list only tools with given tag filter', async () => {
    const count = getRandomInt();
    const tag = 'PHP';
    for (let i = 0; i < count; i++) {
      const toolData = getToolData();
      toolData.tags = ['node', 'python', 'java'];
      await toolModel.create(toolData);
    }
    const toolData = getToolData();
    toolData.tags = [tag];
    await toolModel.create(toolData);
    const response = await request(app).get(`/tools?tag=${tag}`);
    expect(response.body.error).toBe(undefined);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should list one tool with valid id', async () => {
    const toolData = getToolData();
    const tool = await toolModel.create(toolData);
    const response = await request(app).get(`/tools/${tool._id}`);
    expect(response.body.error).toBe(undefined);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(toolData.title);
    expect(response.body.link).toBe(toolData.link);
    expect(response.body.description).toBe(toolData.description);
    expect(response.body.tags).toStrictEqual(toolData.tags);
    expect(response.body._id).toBeDefined();
  });

  it('should not list one tool with invalid id and should return 404', async () => {
    const response = await request(app).get('/tools/15151').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not found');
  });

  it('should store and return tool with valid fields', async () => {
    const toolData = getToolData();
    toolData.tags = ['node', 'python', 'java'];
    const response = await request(app).post('/tools').send(toolData);

    expect(response.body.error).toBe(undefined);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(toolData.title);
    expect(response.body.link).toBe(toolData.link);
    expect(response.body.description).toBe(toolData.description);
    expect(response.body.tags).toStrictEqual(toolData.tags);
    expect(response.body._id).toBeDefined();
  });

  it('should not store tool with invalid fields', async () => {
    const toolData = {};
    const response = await request(app).post('/tools').send(toolData);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  it('should update and return tool with valid fields and id', async () => {
    const toolData = getToolData();
    const updatedTool = getToolData();
    toolData.tags = ['node', 'python', 'java'];
    const tool = await toolModel.create(toolData);
    const response = await request(app)
      .put(`/tools/${tool._id}`)
      .send(updatedTool);
    expect(response.body.error).toBe(undefined);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(updatedTool.title);
    expect(response.body.link).toBe(updatedTool.link);
    expect(response.body.description).toBe(updatedTool.description);
    expect(response.body.tags).toStrictEqual(updatedTool.tags);
    expect(response.body._id).toBeDefined();
  });

  it('should not update tool with invalid id', async () => {
    const toolData = {};
    const response = await request(app).put('/tools/15151').send(toolData);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not found');
  });
  it('should delete tool with valid id', async () => {
    const toolData = getToolData();
    const tool = await toolModel.create(toolData);
    const response = await request(app).delete(`/tools/${tool._id}`);
    expect(response.body.error).toBe(undefined);
    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });

  it('should not delete tool with invalid id and return 404', async () => {
    const response = await request(app).delete('/tools/15151').send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not found');
  });
});
