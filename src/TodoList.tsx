import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  edit: (id: string) => void;
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
        <TodoItem
          todo={todo}
          updateIsDone={props.updateIsDone}
          remove={props.remove}
          edit={props.edit}
          // updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;
