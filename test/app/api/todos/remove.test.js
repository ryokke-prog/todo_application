const assert = require('power-assert');
const Todo = require('../../../../models/Todo');

describe('Todo.remove', () => {
  it('Todo.removeはメソッドである', () => {
    assert.strictEqual(typeof Todo.remove === 'function', true);
  });

  it('メソッド実行時、引数idの値が1以上の数値以外の場合はエラーになる', () => {
    const invalidIdList = [0, -1, null, {}, [], '1'];

    invalidIdList.forEach(data => {
      try {
        Todo.remove(data);
        assert.fail();
      } catch (error) {
        assert.strictEqual(error.message, 'idは必須です(1以上の数値)');
      }
    });
  });

  it('メソッド実行時、idに紐づくデータがないとエラーになる', () => {
    const notExistedId = 9999999;
    try {
      Todo.remove(notExistedId);
      assert.fail();
    } catch (error) {
      assert.strictEqual(error.message, 'idに該当するtodoが存在しません');
    }
  });

  it('メソッド実行時、正しいIDを渡すとidに該当する既存todoを削除して、削除したtodoを返す', () => {
    const oldTodos = Todo.findAll();
    const existedId = 3;

    const removedTodo = Todo.remove(existedId);
    assert.deepEqual(removedTodo, {
      id: existedId,
      title: removedTodo.title,
      body: removedTodo.body,
      createdAt: removedTodo.createdAt,
      updatedAt: removedTodo.updatedAt
    });

    const currentTodos = Todo.findAll();
    assert.strictEqual(
      oldTodos.length,
      currentTodos.length + 1,
      'Todo.removeメソッドが成功すると、1件少なくなっているはず'
    );
  });
});