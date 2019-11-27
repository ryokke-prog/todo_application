const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

describe('test 「GET /api/todos」', () => {
  it('returns todos in response.body', async () => {
    const response = await requestHelper.request({
      method: 'get',
      endPoint: '/api/todos',
      statusCode: 200
    });

    const todos = response.body;
    assert.strictEqual(Array.isArray(todos), true);
    todos.forEach(todo => {
      assert.strictEqual(typeof todo.id === 'number', true);
      assert.strictEqual(typeof todo.title === 'string', true);
      assert.strictEqual(typeof todo.body === 'string', true);
      assert.strictEqual(typeof todo.createdAt === 'string', true);
      assert.strictEqual(typeof todo.updatedAt === 'string', true);
    });
  });
});