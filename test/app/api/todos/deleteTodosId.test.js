const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

const getTodos = async () => {
  const response = await requestHelper.request({
    method: 'get',
    endPoint: '/api/todos',
    statusCode: 200
  });

  return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 9999999999;

describe('test 「DELETE /api/todos/:id」', () => {
  it('IDが不正な場合はエラーになる', async () => {
    const response = await requestHelper.request({
      method: 'delete',
      endPoint: `/api/todos/${INVALID_ID}`,
      statusCode: 400
    });

    assert.deepEqual(response.body, {
      message: 'idに該当するtodoが存在しません'
    });
  });

  it('存在するIDを送信したら成功する', async () => {
    const oldTodos = await getTodos();

    const response = await requestHelper.request({
      method: 'delete',
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 200
    });

    const deletedTodo = response.body;
    assert.deepEqual(deletedTodo, {
      id: VALID_ID,
      title: deletedTodo.title,
      body: deletedTodo.body,
      createdAt: deletedTodo.createdAt,
      updatedAt: deletedTodo.updatedAt
    });

    const currentTodos = await getTodos();
    assert.strictEqual(
      oldTodos.length,
      currentTodos.length + 1,
      '削除後はデータが一件減っている'
    );

    assert.deepEqual(
      deletedTodo,
      oldTodos[0],
      `削除前の1件目のデータは、ID:${VALID_ID}のデータである`
    );

    assert.notDeepEqual(
      deletedTodo,
      currentTodos[0],
      `削除後の1件目のデータは、ID:${VALID_ID}のデータではない`
    );
  });
});