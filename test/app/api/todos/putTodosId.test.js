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
const INVALID_ID = 99999999;

describe('test 「PUT /api/todos/:id」', () => {
  it('idが不正な場合はエラーになる', async () => {
    const putData = {
      title: 'test title',
      body: 'test body'
    };

    const response = await requestHelper.request({
      method: 'put',
      endPoint: `/api/todos/${INVALID_ID}`,
      statusCode: 400
    }).send(putData);

    assert.deepEqual(response.body, {
      message: 'idに該当するtodoが存在しません'
    });
  });

  it('titleを送らなかったらエラーになる', async () => {
    const putData = {
      body: 'test body'
    };

    const response = await requestHelper.request({
      method: 'put',
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 400
    }).send(putData);

    assert.deepEqual(response.body, {
      message: 'titleは必須です'
    });
  });

  it('bodyを送らなかったらエラーになる', async () => {
    const putData = {
      title: 'test title'
    };

    const response = await requestHelper.request({
      method: 'put',
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 400
    }).send(putData);

    assert.deepEqual(response.body, {
      message: 'bodyは必須です'
    });
  });

  it('不備なくデータを送信したら成功する', async () => {
    const oldTodos = await getTodos();

    const putData = {
      title: 'test title',
      body: 'test body'
    };

    const response = await requestHelper.request({
      method: 'put',
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 200
    }).send(putData);

    const updatedTodo = response.body;
    assert.deepEqual(updatedTodo, {
      id: VALID_ID,
      title: putData.title,
      body: putData.body,
      createdAt: updatedTodo.createdAt,
      updatedAt: updatedTodo.updatedAt
    });

    const currentTodos = await getTodos();
    assert.notDeepEqual(
      oldTodos,
      currentTodos,
      '更新前後で一致しないはず'
    );
  });
});