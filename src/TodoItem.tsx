import { twMerge } from "tailwind-merge";
import { Todo } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

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
        "text-white gap-5 backdrop-blur-[14px] bg-white bg-opacity-[0.188] shadow-[2px_5px_5px_rgba(0,0,0,0.3)] border border-transparent border-b-[0px_rgba(40,40,40,0.35)_solid] border-r-[0px_rgba(40,40,40,0.35)_solid]",
        "rounded-md px-4 py-2",
        // "relative p-8 bg-white bg-opacity-10 border border-white border-opacity-20",
        todo.isDone && "bg-blue-50 opacity-50",
        todo.deadline &&
          todo.deadline < new Date() &&
          "bg-red-500 shadow-[2px_3px_3px_rgba(255,100,100,1)]"
      )}
    >
      <div className="flex items-center text-white">
        {/* checkBoxContent */}
        <div className="flex h-full items-center">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-1.5 cursor-pointer"
          />
        </div>
        {/* todoContent */}
        <div className="">
          <div className="flex-row md:flex">
            <div
              className={twMerge(
                "text-lg font-bold mx-2",
                todo.isDone && "line-through decoration-2"
              )}
            >
              {todo.name}
            </div>
            <div className="ml-2">
              優先度:
              <span className={twMerge("ml-2 text-orange-400")}>
                {numToStar(todo.priority)}
              </span>
            </div>
          </div>

          {todo.deadline ? (
            <div
              className={twMerge(
                "mx-2 text-base text-slate-500",
                todo.deadline < new Date() &&
                  "text-white underline underline-offset-4 decoration-red-500"
              )}
            >
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

        {/* buttonContent */}
        <div className="ml-auto flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <button
            onClick={() => props.edit(todo.id)}
            className="ml-0 rounded-md bg-blue-400  px-2 py-1 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:px-3 hover:py-2" // hover:p-3 はhover時にpaddingを増やす
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className="hidden md:inline-block">編集</span>
          </button>
          <button
            onClick={() => props.remove(todo.id)}
            className="rounded-md bg-slate-400 px-2 py-1 text-sm font-bold text-white hover:bg-red-500 md:ml-3"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="hidden md:inline-block">削除</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
