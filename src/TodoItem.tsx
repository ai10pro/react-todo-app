import { twMerge } from "tailwind-merge";
import { Todo } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  todo: Todo;

  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  edit: (id: string) => void;
};

const numToStar = (num: number) => {
  return "★".repeat(num);
  // if (num === 1) {
  //   return "低";
  // } else if (num === 2) {
  //   return "中";
  // } else if (num === 3) {
  //   return "高";
  // }
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div
      key={todo.id}
      className={twMerge(
        "rounded-md border border-slate-400 bg-white px-3 py-2 drop-shadow-sm ",
        todo.isDone && "bg-blue-50 opacity-50",
        todo.deadline && todo.deadline < new Date() && "bg-red-100"
      )}
    >
      <div className="flex items-baseline text-slate-700">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        />
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
        <div className="ml-auto justify-between text-center ">
          <button
            onClick={() => props.remove(todo.id)}
            className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
          >
            削除
          </button>
          <button
            onClick={() => props.edit(todo.id)}
            className="ml-3 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-blue-400"
          >
            編集
          </button>
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
  );
};

export default TodoItem;
