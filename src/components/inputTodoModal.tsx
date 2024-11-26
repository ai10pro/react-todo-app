import React from "react";

// InputTodoModalコンポーネントのPropsの型定義
type Props = {
  showFlag: boolean;
  setShowModal: (flag: boolean) => void;
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
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div
          className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/50"
          onClick={handleOverlayClick}
        >
          <div className="rounded-sm bg-white p-10">
            <p>This is ModalContent</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default InputTodoModal;
