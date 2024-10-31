import React from "react";
import { Todo } from "./types";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  todos: Todo[];
};

const numToStar = (num: number) => {
  return "★".repeat(4 - num);
};

const TodoList = (props: Props) => {
  const todos = [...props.todos].sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    } else {
      const aDeadline = a.deadline ? a.deadline.getTime() : 0;
      const bDeadline = b.deadline ? b.deadline.getTime() : 0;
      return aDeadline - bDeadline;
    }
  });

  if (todos.length === 0) {
    return <div className="text-red-500">やることがありません！</div>;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={twMerge(
            "rounded-md border border-slate-400 bg-white px-3 py-2 drop-shadow-sm hover:scale-105 transition-transform duration-200",
            todo.isDone && "bg-blue-50 opacity-50",
            todo.deadline && todo.deadline < new Date() && "bg-red-100"
          )}
        >
          <div className="flex items-baseline text-slate-700">
            <FontAwesomeIcon
              icon={todo.isDone ? faFileCircleCheck : faFile}
              className="mr-1"
            />
            <div
              className={twMerge(
                "text-lg font-bold mx-2",
                todo.isDone && "line-through decoration-2"
              )}
            >
              {todo.name}
            </div>
            <div className="ml-2">優先度 </div>
            <div className={twMerge("ml-2 text-orange-400")}>
              {numToStar(todo.priority)}
            </div>
          </div>
          <div className="">
            {todo.deadline ? (
              <div className="pl-6 text-base text-slate-500">
                期限:{" "}
                {todo.deadline.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
