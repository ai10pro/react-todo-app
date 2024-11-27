"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

import { Todo } from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

// Propsの型定義にsetTodosを追加
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  setShowModal: (flag: boolean) => void;
};

const EditTodoModal = (props: Props) => {
  const [todoName, setTodoName] = useState(props.todo.name);
  const [todoPriority, setTodoPriority] = useState(props.todo.priority);
  const [todoDeadline, setTodoDeadline] = useState<Date | null>(
    props.todo.deadline
  );
  const [todoNameError, setTodoNameError] = useState("");

  useEffect(() => {
    setTodoName(props.todo.name);
    setTodoPriority(props.todo.priority);
    setTodoDeadline(props.todo.deadline);
  }, [props.todo]);

  const closeModal = () => {
    props.setShowModal(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // タスクを編集する関数
  const editTodo = () => {
    const err = isValidTodoName(todoName);
    if (err !== "") {
      setTodoNameError(err);
      return;
    }
    const updatedTodo: Todo = {
      ...props.todo,
      name: todoName,
      priority: todoPriority,
      deadline: todoDeadline,
    };
    const updatedTodos = props.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    props.setTodos(updatedTodos); // props.setTodosを使用してtodosを更新
    setTodoName("");
    setTodoPriority(3);
    setTodoDeadline(null);
    closeModal();
  };

  // todoName_バリデーション定義
  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  // todoName_タスク名設定の関数
  const updateTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoNameError(isValidTodoName(e.target.value));
    setTodoName(e.target.value);
  };

  // todoPriority_タスクの優先度設定の関数
  const updateTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`UI操作で優先度が "${e.target.value}" に変更されました。`);
    switch (e.target.value) {
      case "1":
        setTodoPriority(1);
        break;
      case "2":
        setTodoPriority(2);
        break;
      case "3":
        setTodoPriority(3);
        break;
    }
  };

  // todoDeadline_タスクの期限設定の関数
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setTodoDeadline(dt === "" ? null : new Date(dt));
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/50"
        onClick={handleOverlayClick}
      >
        <div
          className="mt-5 w-3/4 max-w-2xl space-y-2 rounded-sm bg-white p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold">タスクの編集</h2>
          <div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="todoName">
                名前
              </label>
              <input
                id="todoName"
                type="text"
                value={todoName}
                onChange={updateTodoName}
                className={twMerge(
                  "grow rounded-md border p-2",
                  todoNameError && "border-red-500 outline-red-500"
                )}
                placeholder="2文字以上、32文字以内で入力してください"
              />
            </div>
            {todoNameError && (
              <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-0.5"
                />
                <div>{todoNameError}</div>
              </div>
            )}
          </div>

          <div className="flex gap-5">
            <div className="font-bold">優先度</div>
            {["低", "中", "高"].map((value, index) => (
              <label key={value} className="flex items-center space-x-1">
                <input
                  id={`priority-${index + 1}`}
                  name="priorityGroup"
                  type="radio"
                  value={index + 1}
                  checked={todoPriority === index + 1}
                  onChange={updateTodoPriority}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-x-2">
            <label htmlFor="deadline" className="font-bold">
              期限
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={
                todoDeadline
                  ? dayjs(todoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                  : ""
              }
              onChange={updateDeadline}
              className="rounded-md border border-gray-400 px-2 py-0.5"
            />
          </div>

          <button
            type="button"
            onClick={editTodo}
            className={twMerge(
              "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
              todoNameError && "cursor-not-allowed opacity-50"
            )}
          >
            保存
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTodoModal;
