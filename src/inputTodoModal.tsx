import React from "react";

// InputTodoModalコンポーネントのPropsの型定義
type Props = {
  showFlag: boolean;
};

const InputTodoModal = (props: Props) => {
  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay">
          <div id="modalContent">
            <p>This is ModalContent</p>
            <button>Close</button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default InputTodoModal;
