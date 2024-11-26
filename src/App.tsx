import { useState, useEffect } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";

import InputModal from "./components/inputTodoModal";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";

  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
      console.log(JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  // タスクの完了状態を更新する関数
  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value }; // スプレッド構文
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };
  // 完了済みのタスクを削除する関数
  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };
  // タスクを削除する関数
  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />

      <button
        type="button"
        onClick={removeCompletedTodos}
        className={
          "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
        }
      >
        完了済みのタスクを削除
      </button>

      {/* 以下モーダル関連 */}
      <div>
        <button
          className="mt-5 rounded-md bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          新しいタスクを追加
        </button>
        <InputModal
          showFlag={showModal}
          setShowModal={setShowModal}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
};

export default App;
