"use client";
import React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";

import { Todo } from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

// Propsの型定義にsetTodosを追加
type Props = {
  todos: Todo[];
  setShowModal: (flag: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  closeModal: () => void;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const AddTodoModal = (props: Props) => {
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(1);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  // 新しいタスクを追加する関数
  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    const updatedTodos = [...props.todos, newTodo];
    props.setTodos(updatedTodos); // props.setTodosを使用してtodosを更新
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    props.closeModal();
  };

  // todoName_バリデーション定義
  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  // todoName_新しいタスク名設定の関数
  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  // todoPriority_新しいタスクの優先度設定の関数
  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`UI操作で優先度が "${e.target.value}" に変更されました。`);
    switch (e.target.value) {
      case "1":
        setNewTodoPriority(1);
        break;
      case "2":
        setNewTodoPriority(2);
        break;
      case "3":
        setNewTodoPriority(3);
        break;
      case "4":
        setNewTodoPriority(4);
        break;
      case "5":
        setNewTodoPriority(5);
        break;
    }
  };

  // todoDeadline_新しいタスクの期限設定の関数
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/50"
        onClick={props.handleOverlayClick}
      >
        <div className="size-full space-y-2 rounded-sm bg-white p-10 pt-20 md:h-auto md:w-3/4 md:max-w-2xl md:pt-10">
          <h2 className="text-lg font-bold">新しいタスクの追加</h2>
          <div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="newTodoName">
                名前
              </label>
              <input
                id="newTodoName"
                type="text"
                value={newTodoName}
                onChange={updateNewTodoName}
                className={twMerge(
                  "grow rounded-md border p-2",
                  newTodoNameError && "border-red-500 outline-red-500"
                )}
                placeholder="2文字以上、32文字以内で入力してください"
              />
            </div>
            {newTodoNameError && (
              <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-0.5"
                />
                <div>{newTodoNameError}</div>
              </div>
            )}
          </div>

          <div className="flex gap-5">
            <div className="font-bold">優先度</div>
            {["1", "2", "3", "4", "5"].map((value, index) => (
              <label key={value} className="flex items-center space-x-1">
                <input
                  id={`priority-${index + 1}`}
                  name="priorityGroup"
                  type="radio"
                  value={index + 1}
                  checked={newTodoPriority === index + 1}
                  onChange={updateNewTodoPriority}
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
                newTodoDeadline
                  ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                  : ""
              }
              onChange={updateDeadline}
              className="rounded-md border border-gray-400 px-2 py-0.5"
            />
          </div>

          <button
            type="button"
            onClick={addNewTodo}
            className={twMerge(
              "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
              newTodoNameError && "cursor-not-allowed opacity-50"
            )}
          >
            追加
          </button>
          <button
            type="button"
            onClick={props.closeModal}
            className={twMerge(
              "ml-3 rounded-md bg-slate-500 px-3 py-1 font-bold text-white hover:bg-red-400"
            )}
          >
            キャンセル
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTodoModal;
