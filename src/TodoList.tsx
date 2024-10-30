import React from "react";
import { Todo } from "./types";

type Props = {
    todos: Todo[];
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
        return (
            <div className="text-red-500">
                やることがありません！
            </div>
        )
    }

    return (
        <div className="space-y-1">
            {todos.map((todo) => (
                <div key={todo.id}>
                    {todo.name} 優先度: {todo.priority}
                </div>
            ))}
        </div>
    );
};

export default TodoList;