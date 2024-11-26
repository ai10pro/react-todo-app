import React from "react";
import AddTodoModal from "./addTodoModal";
import EditTodoModal from "./editTodoModal";
import { Todo } from "../types";

// Propsの型定義にsetTodosを追加
type Props = {
  showFlag: boolean;
  modalType: number; // 1: Add, 2: Edit
  todos: Todo[];
  setShowModal: (flag: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedTodo?: Todo; // Editの場合に必要
};

const InputTodoModal = (props: Props) => {
  const closeModal = () => {
    props.setShowModal(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {props.showFlag && (
        <div onClick={handleOverlayClick}>
          {props.modalType === 1 ? (
            <AddTodoModal
              todos={props.todos}
              setShowModal={props.setShowModal}
              setTodos={props.setTodos}
              closeModal={closeModal}
              handleOverlayClick={handleOverlayClick}
            />
          ) : props.modalType === 2 && props.selectedTodo ? (
            <EditTodoModal
              todo={props.selectedTodo}
              todos={props.todos}
              setShowModal={props.setShowModal}
              setTodos={props.setTodos}
              closeModal={closeModal}
              handleOverlayClick={handleOverlayClick}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default InputTodoModal;
