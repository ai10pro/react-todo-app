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
  showFlag: boolean;
  setShowModal: (flag: boolean) => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const InputTodoModal = (props: Props) => {
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(1);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");

  const closeModal = () => {
    props.setShowModal(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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
    }
  };

  // todoDeadline_新しいタスクの期限設定の関数
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  return (
    <>
      {props.showFlag ? (
        <div
          className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/50"
          onClick={handleOverlayClick}
        >
          <div className="mt-5 w-3/4 max-w-2xl space-y-2 rounded-sm bg-white p-10">
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
              {["低", "中", "高"].map((value, index) => (
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default InputTodoModal;
