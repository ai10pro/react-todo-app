import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp1 = () => {
    // 追加
    const newCount = count + 1;
    setCount(newCount);
  };
  const countUp10 = () => {
    // 追加
    const newCount = count + 10;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-6 text-2xl font-bold">TodoApp</h1>
      <div className="mb-2">
        <p>
          現在のカウント値は
          <span className="text-xl font-bold text-blue-500"> {count} </span>です
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={countUp1}
        >
          1 Up
        </button>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={countUp10}
        >
          10 Up
        </button>
      </div>
    </div>
  );
};

export default App;
