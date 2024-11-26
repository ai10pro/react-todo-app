"use client";
import React from "react";

import { Todo } from "../types";
import AddTodoModal from "./addTodoModal";

// Propsの型定義にsetTodosを追加
type Props = {
  showFlag: boolean;
  todos: Todo[];
  setShowModal: (flag: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
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
      {props.showFlag ? (
        <AddTodoModal
          todos={props.todos}
          setShowModal={props.setShowModal}
          setTodos={props.setTodos}
          closeModal={closeModal}
          handleOverlayClick={handleOverlayClick}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default InputTodoModal;
